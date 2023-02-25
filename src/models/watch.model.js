const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId(),
        ref: 'users',
        require: true,
    },
    question: {
        type: Types.ObjectId(),
        ref: 'questions',
        require: true,
    },
    createdDate: { type: Types.Date },
    modifiedDate: { type: Types.Date },
    isActive: { type: Types.Boolean },
});

module.exports = mongoose.model('Watch', schema);
