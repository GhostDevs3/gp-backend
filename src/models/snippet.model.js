const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId(),
        ref: 'Users',
        required: true,
    },
    programmingLanguage: {
        type: Types.ObjectId(),
        ref: 'ProgrammingLanguages',
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
