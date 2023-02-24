const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const watchSchema = new Schema({
    user_id: {
        type: st.ObjectId(),
        ref: 'users',
        require: true,
    },
    question_id: {
        type: st.ObjectId(),
        ref: 'questions',
        require: true,
    },
    createdDate: { type: st.Date },
    modifiedDate: { type: st.Date },
    isActive: { type: st.Boolean },
});

module.exports = mongoose.model('Watch.model', watchSchema);
