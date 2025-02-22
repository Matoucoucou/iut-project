'use strict';

const { Service } = require('@hapipal/schmervice');
// eslint-disable-next-line @hapi/hapi/capitalize-modules
const nodemailer = require('nodemailer');

module.exports = class EmailService extends Service {
    constructor(...args) {
        super(...args);

        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async sendWelcomeEmail(user) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Welcome to our service!',
            text: `Hello ${user.firstName},\n\nWelcome to our service! We are glad to have you with us.\n\nBest regards,\nThe Team`
        };

        await this.transporter.sendMail(mailOptions);
    }
};