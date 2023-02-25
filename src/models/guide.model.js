const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const guideSchema = new Schema({
    name: { type: st.String },
    logo: { type: st.String },
    refPath: { type: st.String },
});

module.exports = mongoose.model('Guide', guideSchema);
