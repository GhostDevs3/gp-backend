const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    name: {
        type: Types.String,
        trim: true,
    },
    ISOCode: {
        type: Types.String,
        trim: true,
    },
    phonePrefix: {
        type: Types.String,
        trim: true,
    },
    location: {
        latitude: {
            type: Types.Number,
            minLength: 6,
            maxLength: 7,
        },
        longitude: {
            type: Types.Number,
            minLength: 6,
            maxLength: 8,
        },
    },
});

module.exports = mongoose.model('Country', schema);
