const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: Schema.Types.String, unique: true, required: true },
    role: {
        type: Schema.Types.String,
        required: true,
        enum: ["user", "admin"],
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
        minlength: 6,
        maxlength: 255,
        trim: true,
        uniqueCaseInsensitive: true,
        lowercase: true,
    },
    phone: { type: Schema.Types.String, minlength: 9, maxlength: 9 },
    website: { type: Schema.Types.String },
    about: { type: Schema.Types.String },
    avatar: { type: Schema.Types.String },
    coverImg: { type: Schema.Types.String },
    personalInfo: {
        name: { type: Schema.Types.String },
        birthDate: { type: Schema.Types.Date },
        country: { type: Schema.Types.ObjectId, ref: "country" },
    },
    links: {
        GitHub:{type: Schema.Types.String},
        Twitter:{type: Schema.Types.String},
        Linkedin:{type: Schema.Types.String},
        Youtube:{type: Schema.Types.String}
    },
});
module.exports = mongoose.model('users', schema);
