const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    name: {
        type: Types.ObjectId,
        ref: 'users',
        require: true,
    },
    badge: {
        type: Types.ObjectId,
        ref: 'users',
        require: true,
    },
    isAwarded: {
        type: Types.Boolean,
        default: false,
        require: true,
    },
});

module.exports = mongoose.model('OwnBadge', schema);
