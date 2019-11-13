const send = require('gmail-send')
const EMAIL_CONFIG = require('../emailConfig.json')

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

function sendPasswordResetEmail(resetLink, recipent) {
  const body = `An admin triggered a password reset for you.\nGo to ${resetLink} to reset your password`
  return sendEmail('Mangonificent Password Reset', body, recipent)
}

function orderStatusChangeEmail(order, recipent) {
  switch (order.status) {
    case 'CANCELED': {
      return orderCanceled(order, recipent)
    }
    case 'PROCESSING': {
      return orderProceessing(order,recipent)
    }
    case 'COMPLETED': {
      return orderDelivered(order, recipent)
    }
    default: {
      return null
    }
  }
}

function orderCanceled(order, recipent) {
  const body = `Your order ${order.id} was canceled.\nRIP`
  return sendEmail('Mangonificent Order Canceled', body, recipent)
}

function orderProceessing(order, recipent) {
  const body = `Your order ${order.id} has begun processing!`
  return sendEmail('Mangonificent Order Processing!', body, recipent)
}

function orderDelivered(order, recipent) {
  const body = `Your order ${order.id} was delivered!`
  return sendEmail('Mangonificent Order Delivered!', body, recipent)
}

module.exports = {sendEmail, sendPasswordResetEmail, orderStatusChangeEmail}
