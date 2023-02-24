const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const st = Schema.Types;

const countrySchema = new Schema({
    name: { type: st.String },
    ISO_code: { type: st.String },
    phone_prefix: { type: st.String },
    location: {
        latitude: { type: st.String },
        longitude: { type: st.String },
    },
});

module.exports = mongoose.model('country', countrySchema);
