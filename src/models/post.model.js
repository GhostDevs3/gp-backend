const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const postSchema = new Schema({
    user_id: {
        type: st.ObjectId(),
        ref: 'users',
        required: true,
    },
    content: {
        title: { type: st.String },
        body: { type: st.String },
    },
    createdDate: { type: st.Date },
    modifiedDate: { type: st.Date },
    isPublished: { type: st.Boolean },
});

module.exports = mongoose.model('Post', postSchema);
