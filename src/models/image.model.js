const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Types = Schema.Types;

const schema = new Schema({
    name: {
        type: Types.String,
        required: true,
        trim: true,
    },
    originalName: {
        type: Types.String,
        required: true,
        trim: true,
    },
    fileName: {
        type: Types.String,
        required: true,
        trim: true,
    },
    extension: {
        type: Types.String,
        required: true,
        trim: true,
    },
    mimeType: {
        type: Types.String,
        required: true,
        trim: true,
    },
    route: {
        type: Types.String,
        required: true,
        trim: true,
    },
    url: {
        type: Types.String,
        required: true,
        trim: true,
    },
    keywords: [
        {
            type: Types.String,
            trim: true,
        },
    ],
    size: {
        type: Types.Number,
        required: true,
    },
    height: {
        type: Types.Number,
        required: true,
    },
    width: {
        type: Types.Number,
        required: true,
    },
    description: {
        type: Types.String,
        trim: true,
    },
});

module.exports = mongoose.model('Image', schema);
