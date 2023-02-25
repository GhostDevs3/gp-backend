const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId(),
        ref: 'users',
        required: true,
    },
    programming_language: {
        type: Types.ObjectId(),
        ref: 'programming_languages',
        required: true,
    },
    title: {
        type: Types.String,
        trim: true,
    },
    body: {
        type: Types.String,
        trim: true,
    },
    views: { type: Types.Number },
});

module.exports = mongoose.model('Snippet', schema);
