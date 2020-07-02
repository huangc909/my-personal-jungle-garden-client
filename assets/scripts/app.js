'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('.getSignUpPage').on('click', authEvents.onGetSignUpPage)
  $('.getSignInPage').on('click', authEvents.onGetSignInPage)
  $('.getAddPCPage').on('click', authEvents.onGetAddPCPage)
  $('.getChangePasswordPage').on('click', authEvents.onGetChangePasswordPage)
  $('.getEditPCNamePage').on('click', authEvents.onGetEditPCNamePage)
  $('.getDeletePCButtons').on('click', authEvents.onGetDeletePCButtons)
  $('#add-pc').on('submit', authEvents.onAddPC)
  $('#show-pcs').on('click', authEvents.onShowPlantCollections)
  $('#edit-pc-name').on('submit', authEvents.onEditPCName)
  $('.content-plant-collections').on('click', '.btn-pc-delete', authEvents.onDeletePlantCollection)
  $('.content-plant-collections').on('click', '.pc', authEvents.onGetPCPage)
})
