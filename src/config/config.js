const dotenv = require('dotenv');
dotenv.config();

const CONFIG = {
	PORT: process.env.PORT,
	JWT_LOGIN_SECRET: process.env.JWT_LOGIN_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_REVOKE_SECRET: process.env.JWT_REVOKE_SECRET,
	JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET,
	JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,
};
module.exports = CONFIG;
