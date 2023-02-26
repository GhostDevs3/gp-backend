const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    post: {
        type: Types.ObjectId,
        ref: 'post',
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    },
    body: {
        type: Types.String,
        trim: true,
    },
    createdDate: { type: Types.Date },
});

module.exports = mongoose.model('Comment', schema);
