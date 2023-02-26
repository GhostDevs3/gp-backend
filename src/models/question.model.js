const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    programmingLanguage: {
        type: Types.ObjectId,
        ref: 'ProgrammingLanguage',
        required: true,
    },
    answer: {
        type: Types.ObjectId,
        ref: 'Answer',
        required: true,
    },
    title: {
        type: Types.String,
        required: true,
        trim: true,
    },
    body: {
        type: Types.String,
        required: true,
        trim: true,
    },
    date: { type: Types.Date },
    tag: [{ type: Types.String, trim: true }],
});

module.exports = mongoose.model('Question', schema);
