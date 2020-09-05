require("dotenv").config();
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("process");

const host = process.env.HOST || "http://localhost:3005";
const user = process.env.NM_USER;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: process.env.NM_PASS,
  },
});

module.exports.sendValidationEmail = (email, activationToken, name) => {
  transport.sendMail({
    to: email,
    from: `Mappet team <${user}>`,
    subject: "Activate your mappet user here!",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>mappet activation email</title>
        <style
          type="text/css"
          style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%"
        >
          .border {
            width: 50%;
            border-radius: 24px;
            border: solid 1px #ea7676;
          }
    
          table {
            color: #fff;
          }
    
          @media (max-width: 570px) {
            .border,
            table {
              width: 95%;
            }
          }
        </style>
      </head>
      <body
        width="100%"
        style="
          margin: 0 !important;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          padding: 100px 0 !important;
          width: 100% !important;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
          height: 50vh;
          background: url('https://res.cloudinary.com/dutvbml2i/image/upload/v1598613317/mappet/email-bg_x87jqi.jpg')
            no-repeat top center/cover;
        "
      >
        <table cellpading="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td align="center">
              <div class="border">
                <table
                  cellpadding="60"
                  cellspacing="0"
                  border="0"
                  width="100%"
                  align="center"
                >
                  <tr>
                    <td align="center">
                      <img
                        src="https://res.cloudinary.com/dutvbml2i/image/upload/v1598610505/mappet/mappet-logo_gxfb9c.png"
                        alt="mappet logo"
                        width="100"
                      />
                      <h1>confirmation email</h1>
                      <h4>Hello ${name}!</h4>
                      <p>
                        Thanks to join our community! Please confirm your account
                        clicking on the following link:
                      </p>
                      <a href="${host}/activate/${activationToken}" style="color: #ea7676;"
                        >${host}/activate/${activationToken}</a
                      >
                      <h4>Great to see you enjoying our awesome team!</h4>
                      <p style="padding-top: 60px">You are doing awesome!</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
    
		`,
  });
};
