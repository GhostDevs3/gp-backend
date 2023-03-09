const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Types = Schema.Types;

const schema = new Schema({
	username: {
		type: Types.String,
		unique: true,
		required: true,
		trim: true,
	},
	role: {
		type: Schema.Types.String,
		required: true,
		enum: ['user', 'admin'],
		trim: true,
	},
	email: {
		type: Types.String,
		unique: true,
		required: true,
		minlength: 6,
		maxlength: 255,
		trim: true,
		uniqueCaseInsensitive: true,
		lowercase: true,
	},
	password: {
		type: Types.String,
		trim: true,
	},
	phone: {
		type: Types.String,
		minlength: 9,
		maxlength: 9,
	},
	website: {
		type: Types.String,
		trim: true,
	},
	about: {
		type: Types.String,
		trim: true,
	},
	avatar: {
		type: Types.ObjectId,
		ref: 'Image',
	},
	coverImg: {
		type: Types.ObjectId,
		ref: 'Image',
	},
	personalInfo: {
		name: {
			type: Types.String,
			trim: true,
		},
		birthDate: {
			type: Types.Date,
		},
		country: {
			type: Schema.Types.ObjectId,
			ref: 'Country',
		},
	},
	links: {
		GitHub: {
			type: Types.String,
			trim: true,
		},
		Twitter: {
			type: Types.String,
			trim: true,
		},
		Linkedin: {
			type: Types.String,
			trim: true,
		},
		Youtube: {
			type: Types.String,
			trim: true,
		},
	},
	active: {
		type: Types.Boolean,
		default: false,
		required: true,
	},
	activationDate: { type: Types.Date },
	blocked: {
		type: Types.Boolean,
		default: false,
		required: true,
	},
	languages: [
		{
			type: Types.ObjectId,
			ref: 'ProgrammingLanguage',
		},
	],
});

schema.methods.isActive = function () {
	return this.active;
};
schema.methods.isBlocked = function () {
	return this.blocked;
};

module.exports = mongoose.model('User', schema);
