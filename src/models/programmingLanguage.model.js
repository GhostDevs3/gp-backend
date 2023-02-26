const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    snipped: {
        type: Types.ObjectId,
        ref: "Snipped",
        required: true,
    },
    question: {
        type: Types.ObjectId,
        ref: "Question",
        required: true,
    },
    guide: {
        type: Types.ObjectId,
        ref: "Guide",
        required: true,
    },
    name: {
        type: Types.String,
        trim: true,
    },
    tecnicName: {
        type: Types.String,
        trim: true,
    },
    icon: [
        {
            Python: { type: Types.String },
            C: { type: Types.String },
            Java: { type: Types.String },
            JavaScript: { type: Types.String },
            SQL: { type: Types.String },
        },
    ],
    link: { type: Types.String },
});

module.exports = mongoose.model("ProgrammingLanguage", schema);
