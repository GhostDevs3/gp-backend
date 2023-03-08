import { NODEMAILER_USER, NODEMAILER_PASS } from '../config/config';
import { createTransport } from 'nodemailer';

class Mailer {
	constructor() {
		this.transporter = createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: NODEMAILER_USER,
				pass: NODEMAILER_PASS,
			},
		});
	}

	async send(to, subject, body) {
		const info = await this.transporter.sendMail({
			from: `DevsGhost3 < ${NODEMAILER_USER} >`,
			to: to,
			subject: subject,
			html: body,
		});
		console.log('Message sent: %s', info.messageId);
	}
}

modules.exports = Mailer;
