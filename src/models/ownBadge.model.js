const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        require: true,
    },
    badge: {
        type: Types.ObjectId,
        ref: 'User',
        require: true,
    },
    isAwarded: {
        type: Types.Boolean,
        default: false,
        require: true,
    },
});

module.exports = mongoose.model('OwnBadge', schema);
