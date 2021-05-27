const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()
const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'zaychik8902@meta.ua',
    pass: process.env.PASSWORD,
  },
}

class EmailService {
  #transporter = nodemailer.createTransport(config)
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'link for production'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplateVerifyEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'System contacts',
        link: this.link,
      },
    })
    const email = {
      body: {
        name,
        intro:
          "Welcome to System contacts! We're very excited to have you on board.",
        action: {
          instructions:
            'To get started with System contacts, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }

    const emailBody = mailGenerator.generate(email)
    return emailBody
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const msg = {
      to: email, // Change to your recipient
      from: 'zaychik8902@meta.ua', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken, name),
    }

    this.#transporter.sendMail(msg)
  }
}

module.exports = EmailService
