const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: Types.String,
        trim: true,
    },
    body: {
        type: Types.String,
        trim: true,
    },
    date: { type: Types.Date },
    opened: { type: Types.Boolean },
});

module.exports = mongoose.model('Message', schema);
