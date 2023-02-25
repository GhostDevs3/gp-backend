const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const ownBadgeSchema = new Schema({
    user_id: {
        type: st.ObjectId,
        ref: 'users',
        require: true,
    },
    badge_id: {
        type: st.ObjectId,
        ref: 'users',
        require: true,
    },
    isAwarded: {
        type: st.Boolean,
        default: false,
    },
});

module.exports = mongoose.model('OwnBadge', ownBadgeSchema);
