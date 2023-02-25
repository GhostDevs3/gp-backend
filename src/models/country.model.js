const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    name: {
        type: Types.String,
        trim: true,
    },
    ISO_code: {
        type: Types.String,
        trim: true,
    },
    phone_prefix: {
        type: Types.String,
        trim: true,
    },
    location: {
        latitude: {
            type: Types.String,
            trim: true,
        },
        longitude: {
            type: Types.String,
            trim: true,
        },
    },
});

module.exports = mongoose.model('country', schema);
