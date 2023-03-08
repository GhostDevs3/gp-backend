const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Types = Schema.Types;

const schema = new Schema({
    username: { type: Types.String, unique: true, required: true },
    role: {
        type: Schema.Types.String,
        required: true,
        enum: ['user', 'admin'],
    },
    email: {
        type: Types.String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 255,
        trim: true,
        uniqueCaseInsensitive: true,
        lowercase: true,
    },
    phone: { type: Types.String, minlength: 9, maxlength: 9 },
    website: { type: Types.String },
    about: { type: Types.String },
    avatar: { type: Types.String },
    coverImg: { type: Types.String },
    personalInfo: {
        name: { type: Types.String },
        birthDate: { type: Types.Date },
        country: { type: Schema.Types.ObjectId, ref: 'country' },
    },
    links: {
        GitHub: { type: Types.String },
        Twitter: { type: Types.String },
        Linkedin: { type: Types.String },
        Youtube: { type: Types.String },
    },
    active: { type: Types.Boolean, default: false, required: true },
    activationDate: { type: Types.Date },
    blocked: { type: Types.Boolean, default: false, required: true },
    languages: [
        {
            required: false,
            ref: 'programmingLanguaje',
        },
    ],
});
schema.methods.isAdmin = function () {
    return this.role === 'admin';
};
module.exports = mongoose.model('User', schema);
