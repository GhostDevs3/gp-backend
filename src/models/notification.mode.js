/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: Types.String,
        maxLength: 255,
        trim: true,
        required: true,
    },
    body: {
        type: Types.String,
        maxLength: 2000,
        trim: true,
        required: true,
    },
    link: { type: Types.String },
    viewed: {
        type: Types.Boolean,
        default: false,
        required: true,
    },
    viewedAt: {
        type: Types.Date,
        immutable: true,
        required: true,
        default: () => new Date.now(),
    },
    createdAt: {
        type: Types.Date,
        immutable: true,
        required: true,
        default: () => new Date.now(),
    },
});

module.exports = mongoose.model('Notification', schema);
