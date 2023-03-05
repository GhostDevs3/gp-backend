const { Model } = require('mongoose');

const QUERY_PARAMS = ['sort', 'fields', 'populate', 'size', 'page', 'logic'];

const OPERATORS = {
    $gt: (value) => {
        return { $gt: value };
    },
    $lt: (value) => {
        return { $lt: value };
    },
    $gte: (value) => {
        return { $gte: value };
    },
    $lte: (value) => {
        return { $lte: value };
    },
    $eq: (value) => {
        return { $eq: value };
    },
    $ne: (value) => {
        return { $ne: value };
    },
    $in: (value) => {
        return { $in: value };
    },
    $nin: (value) => {
        return { $nin: value };
    },
    $exists: (value) => {
        return { $exists: value };
    },
    $bt: (min, max) => {
        return { $gt: min, $lt: max };
    },
    $bte: (min, max) => {
        return { $gt: min, $lt: max };
    },
};

class MongoConnector {
    static async find(model, query) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.find(queryConditions);

            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async findOne(model, query) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.findOne(queryConditions);

            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async findById(model, id) {
        try {
            const queryObject = model.findById(id);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {}
    }

    static async create(model, data) {
        try {
            const objectToCreate = new model(data);
            const docs = await objectToCreate.save();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async update(model, query, data) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.updateMany(queryConditions, data);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async updateOne(model, query, data) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.findOneAndUpdate(queryConditions, data);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async updateById(model, id, data) {
        try {
            const queryObject = model.findByIdAndUpdate(id, data);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async delete(model, query) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.deleteMany(queryConditions);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async deleteOne(model, query) {
        try {
            const queryConditions = getQueryConditions(model, query);
            const queryObject = model.deleteOne(queryConditions);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }

    static async deleteById(model, id) {
        try {
            const queryObject = model.deleteById(id);
            buildQuery(queryObject, query);

            const docs = await queryObject.exec();
            if (!docs) {
                return undefined;
            }
            return docs;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MongoConnector;

function buildQuery(mongoQuery, query) {
    if (query && Object.keys(query).length > 0) {
        for (const paramKey in query) {
            const paramValue = query[paramKey];
            if (!QUERY_PARAMS.includes(paramKey)) {
                continue;
            }
            switch (paramKey) {
                case 'sort':
                    mongoQuery.sort(paramValue);
                    break;
                case 'fields':
                    const fieldsSplits = paramValue.split(',');
                    const fields = [];
                    for (const split in fieldsSplits) {
                        fields.push(split.trim());
                    }
                    mongoQuery.select(fields);
                    break;

                case 'populate':
                    const populateSplits = paramValue.split(',');
                    for (const split of populateSplits) {
                        mongoQuery.populate(split.trim());
                    }
                    break;
                case 'size':
                    mongoQuery.limit(Number(paramValue));
                    break;
                default:
                    console.log('Wrong query parameter');
                    break;
            }
        }

        if (query['size'] && query['page']) {
            let page = Number(query['page']);
            const size = Number(query['size']);
            if (page <= 0) {
                page = 1;
            }
            query.skip(size * (page - 1));
        }
    }
}

function getQueryConditions(model, query) {
    const queryConditions = {};
    if (query && Object.keys(query).length > 0) {
        const logic = query['OR'] ? '$or' : '$and';
        queryConditions[logic] = [];
        const modelFields = model.schema.paths;
        for (const paramKey in query) {
            const paramValue = query[paramKey];
            if (modelFields[paramKey]) {
                let operator;
                for (const operatorTmp in OPERATORS) {
                    if (paramValue.startsWith(operatorTmp)) {
                        operator = operatorTmp;
                        break;
                    }
                }
                if (operator) {
                    let processedValue = paramValue.substring(operator.length);
                    const operatorFunction = OPERATORS[operator];
                    if (operator !== '$in' && operator !== '$nin') {
                        const splits = processedValue.split(',');
                        const firstValue = splits[0];
                        const secondValue =
                            splits.length > 1 ? splits[1] : firstValue;
                        processedValue = operatorFunction(
                            firstValue,
                            secondValue,
                        );
                    } else {
                        const splits = processedValue.split(',');
                        const values = [];
                        for (const split of splits) {
                            values.push(split.trim());
                        }
                        processedValue = operatorFunction(values);
                    }
                    const condition = {};
                    condition[paramKey] = processedValue;
                    queryConditions[logic].push(condition);
                } else {
                    const condition = {};
                    condition[paramKey] = paramValue;
                    queryConditions[logic].push(condition);
                }
            }
        }
    }
    return queryConditions;
}
