const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId(),
        ref: 'User',
        require: true,
    },
    question: {
        type: Types.ObjectId(),
        ref: 'Question',
        require: true,
    },
    createdDate: { type: Types.Date },
    modifiedDate: { type: Types.Date },
    isActive: { type: Types.Boolean },
});

module.exports = mongoose.model('Watch', schema);
