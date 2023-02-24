const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const snippetSchema = new Schema({
    user_id: {
        type: st.ObjectId(),
        ref: 'users',
        required: true,
    },
    programming_language_id: {
        type: st.ObjectId(),
        ref: 'programming_languages',
        required: true,
    },
    content: {
        title: { type: st.String },
        body: { type: st.String },
    },
    views: { type: st.Number },
});

module.exports = mongoose.model('snippet', snippetSchema);
