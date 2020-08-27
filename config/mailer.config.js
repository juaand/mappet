require('dotenv').config()
const nodemailer = require('nodemailer')
const { getMaxListeners } = require('process')

const host = process.env.HOST || 'http://localhost:3005'
const user = process.env.NM_USER

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: user,
    pass: process.env.NM_PASS
  }
})

module.exports.sendValidationEmail = (email, activationToken, name) => {
  transport.sendMail({
    to: email,
    from: `Mappet team <${user}>`,
    subject: 'Activate your mappet user here!',
    html: `
      <table cellpadding="60" cellspacing="0" border="0" width="100%">
      <tr bgcolor="#f3f3f3">
        <td align="center">
        <p style="padding-bottom:60px">Welcome to Mappet</p>
          <table cellpadding="60" cellspacing="0" border="0" width="50%" align="center">
            <tr bgcolor="#fff">
              <td align="center">
              <img src="https://res.cloudinary.com/dtai2zdvy/image/upload/v1597302695/summer-project/logo_ucwqt7.png" alt="mappet logo" width="200">
              <h1>Mappet Confirmation Email</h1>
              <h4>Hello ${name}!</h4>
              <p>Thanks to join our community! Please confirm your account clicking on the following link:</p>
              <a href="${host}/activate/${activationToken}">${host}/activate/${activationToken}</a>
              <h4>Great to see you enjoying our awesome team!</h4>
              </td>
            </tr>
          </table>
          <p style="padding-top:60px">You are doing awesome!</p>
        </td>
      </tr>
    </table>
		`
  })
}
