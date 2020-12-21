'use strict'

const getSignUpPage = () => {
  $('.signin').hide()
  $('.signup').show()
  $('.demosignin').hide()
}

const signUpSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign-up Success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
  $('.signup').hide()
  $('.demosignin').hide()
}

const signUpFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-up Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

module.exports = {
  getSignUpPage,
  signUpSuccess,
  signUpFailure
}
