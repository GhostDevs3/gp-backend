const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    },
    programmingLanguage: {
        type: Types.ObjectId,
        ref: 'programmingLanguage',
        required: true,
    },
    answer: {
        type: Types.ObjectId,
        ref: 'programmingLanguage',
    },
    watch: {
        type: Types.ObjectId,
        ref: 'watch',
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
    tag: [{ type: Types.String }],
});

module.exports = mongoose.model('Question', schema);
