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
  $('.getDeletePlantButtons').on('click', authEvents.onGetDeletePlantButtons)
  $('.get-add-new-plant').on('click', authEvents.onGetAddNewPlant)
  $('#add-pc').on('submit', authEvents.onAddPC)
  $('#show-pcs').on('click', authEvents.onShowPCs)
  $('#edit-pc-name').on('submit', authEvents.onEditPCName)
  $('#back-to-pcs').on('click', authEvents.onShowPCs)
  $('.back-to-pc').on('click', authEvents.onGoBackShowPC)
  $('.content-plant-collections').on('click', '.btn-pc-delete', authEvents.onDeletePC)
  $('.content-plant-collections').on('click', '.pc', authEvents.onShowPC)
  $('.content-plants').on('click', '.btn-plant-delete', authEvents.onDeletePlant)
  $('.content-plants').on('click', '.plant', authEvents.onShowPlant)
  $('#add-plant').on('submit', authEvents.onAddPlant)
  $('.getEditPlantPage').on('click', authEvents.onGetEditPlantPage)
  $('#edit-plant').on('submit', authEvents.onEditPlant)
  // $('.back-to-plant-info').on('click', authEvents.onGoBackShowPlant)
})
