const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    },
    question: {
        type: Types.ObjectId,
        ref: 'questions',
        required: true,
    },
    createdDate: { type: Types.Date },
    body: {
        type: Types.String,
        trim: true,
    },
});

module.exports = mongoose.model('Answer', schema);
