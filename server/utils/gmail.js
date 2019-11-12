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
function sendEmail(subject, body, recipent) {
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
      if (error) console.error(error)
      // console.log("Success!\n",result);
    }
  )
}

async function sendPasswordResetEmail(resetLink, recipent) {
  const body = `An admin triggered a password reset for you.\nGo to ${resetLink} to reset your password`
  return sendEmail('Mangonificent Password Reset', body, recipent)
}

async function sendOrderDeliveredEmail(order, recipent){
  const body = `Your order ${order.id} was delivered!`
  return sendEmail("Mangonificent ")
}

module.exports = {sendEmail, sendPasswordResetEmail}
