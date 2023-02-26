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
            type: Types.Number,
            minLength: 1,
            maxLength: 100,
        },
        longitude: { type: Types.Number },
    },
});

module.exports = mongoose.model('country', schema);
