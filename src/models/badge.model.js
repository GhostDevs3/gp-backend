const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const badgeSchema = new Schema({
    name: { type: st.String },
    logo: { type: st.String },
    description: { type: st.String },
});

module.exports = mongoose.model('Badge', badgeSchema);
