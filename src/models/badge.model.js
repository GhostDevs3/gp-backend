const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    name: {
        type: Types.String,
        trim: true,
    },
    logo: {
        type: Types.String,
        trim: true,
    },
    description: {
        type: Types.String,
        trim: true,
    },
});

module.exports = mongoose.model('Badge', schema);
