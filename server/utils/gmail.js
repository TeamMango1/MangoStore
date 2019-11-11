const send = require("gmail-send");
const EMAIL_CONFIG = require("../../emailConfig.json")

/**
 *
 * asynchronous function that will send an email
 *
 * @param {String} subject    the subject ...
 * @param {String} body       the body of the email
 * @param {String} recipent   the recipent
 */
function sendEmail(subject, body, recipent){
  send({
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
    to: recipent,
    subject
  })(
    {
      text: body
    },
    (error, result, fullResult) => {
      if (error) console.error(error);
      // console.log("Success!\n",result);
    }
  );
}

module.exports = sendEmail