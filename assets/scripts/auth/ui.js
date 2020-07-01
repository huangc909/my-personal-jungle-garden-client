'use strict'

const store = require('./../store')

const signUpSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign Up success!').show()
  $('#message').removeClass().addClass('success')
}

const signUpFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign Up failed')
  $('#message').removeClass().addClass('failure')
}

const signInSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign In success!').show()
  $('#message').removeClass().addClass('success')
  store.user = response.user
}

const signInFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign In failed')
  $('#message').removeClass().addClass('failure')
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Change Password success!').show()
  $('#message').removeClass().addClass('success')
  // $('.signin').show()
}

const changePasswordFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Change Password failed')
  $('#message').removeClass().addClass('failure')
}

const signOutSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign Out success!').show()
  $('#message').removeClass().addClass('success')
  // $('.signin').show()
}

const signOutFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign Out failed')
  $('#message').removeClass().addClass('failure')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
