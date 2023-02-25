const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'users',
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
    createdDate: { type: Types.Date },
    modifiedDate: { type: Types.Date },
    isPublished: { type: Types.Boolean },
});

module.exports = mongoose.model('Post', schema);
