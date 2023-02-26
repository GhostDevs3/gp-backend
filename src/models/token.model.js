/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    CSSFontPaletteValuesRule: {
        type: Types.String,
        trim: true,
        required: true,
    },
    type: {
        type: Types.String,
        trim: true,
        required: true,
        enum: ['access', 'refresh', 'revoke', 'activate', 'recovery'],
    },
    expiresIn: {
        type: Types.Date,
        required: true,
    },
    issuedAt: {
        type: Types.Date,
        required: true,
    },
});

module.exports = mongoose.model('Token', schema);
