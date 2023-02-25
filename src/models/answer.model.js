const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const answerSchema = new Schema({
    user_id: {
        type: st.ObjectId,
        ref: 'users',
        required: true,
    },
    question_id: {
        type: st.ObjectId,
        ref: 'questions',
        required: true,
    },
    createdDate: { type: st.Date },
    content: { type: st.String },
});

module.exports = mongoose.model('answer', answerSchema);
