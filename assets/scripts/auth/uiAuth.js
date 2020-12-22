'use strict'

const store = require('./../store')

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

const getSignInPage = () => {
  $('.signup').hide()
  $('.signin').show()
  $('.demosignin').hide()
}

const getDemoSignInPage = () => {
  $('.signup').hide()
  $('.signin').hide()
  $('.demosignin').show()
}

const signInSuccess = function (response) {
  store.user = response.user
  $('form').trigger('reset')
  $('.signin').hide()
  $('.demosignin').hide()
  $('.menu-dropdown').show()
  $('.plant-collections').show()

  if (store.user.email === 'demo@email.com') {
    $('.demo-account').hide()
    $('.demo-account-indicator').show()
    $('#sign-out').hide()
    $('#demo-sign-out').show()
  } else {
    $('.demo-account').hide()
    $('#demo-sign-out').hide()
    $('#sign-out').show()
  }
}

const signInFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-in Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getChangePasswordPage = () => {
  $('.plant-collections').hide()
  $('.add-pc').hide()
  $('.plant-collection').hide()
  $('.edit-pc-name').hide()
  $('.add-plant').hide()
  $('.plant-information').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
  $('.edit-log').hide()
  $('.demosignin').hide()

  if (store.user.email === 'demo@email.com') {
    $('.changepw').hide()
    $('.demochangepw').show()
  } else {
    $('.changepw').show()
  }
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Change Password success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const changePasswordFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Change Password failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const signOutSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign Out success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
  $('.demo-account').show()
  $('.menu-dropdown').hide()
  $('.changepw').hide()
  $('.plant-collections').hide()
  $('.add-pc').hide()
  $('.plant-collection').hide()
  $('.edit-pc-name').hide()
  $('.add-plant').hide()
  $('.plant-information').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
  $('.edit-log').hide()
  $('.demosignin').hide()
  $('.demochangepw').hide()
  $('.demo-account-indicator').hide()
}

const signOutFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign Out failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

module.exports = {
  getSignUpPage,
  signUpSuccess,
  signUpFailure,
  getSignInPage,
  getDemoSignInPage,
  signInSuccess,
  signInFailure,
  getChangePasswordPage,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
