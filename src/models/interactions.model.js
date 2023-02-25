const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    reaction: {
        type: Types.String,
        enum: ['like', 'love',
            'funny', 'wow'],
        trim: true,
    },
    comment: {
        type: Types.String,
        trim: true,
    }
});

module.exports = mongoose.model('Interaction', schema);
