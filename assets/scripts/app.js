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
  $('.getChangePasswordPage').on('click', authEvents.onGetChangePasswordPage)
  $('.get-add-pc-page').on('click', authEvents.onGetAddPCPage)
  $('.get-edit-pc-name-page').on('click', authEvents.onGetEditPCNamePage)
  $('.get-delete-pc-buttons').on('click', authEvents.onGetDeletePCButtons)
  $('.get-delete-plant-buttons').on('click', authEvents.onGetDeletePlantButtons)
  $('.get-edit-log-buttons').on('click', authEvents.onGetEditLogButtons)
  $('.get-add-new-plant').on('click', authEvents.onGetAddNewPlant)
  $('.get-edit-plant-page').on('click', authEvents.onGetEditPlantPage)
  $('.get-add-log-page').on('click', authEvents.onGetAddNewLog)
  $('#add-pc').on('submit', authEvents.onAddPC)
  $('#show-pcs').on('click', authEvents.onShowPCs)
  $('#edit-pc-name').on('submit', authEvents.onEditPCName)
  $('#add-plant').on('submit', authEvents.onAddPlant)
  $('#edit-plant').on('submit', authEvents.onEditPlant)
  $('#add-log').on('submit', authEvents.onAddLog)
  $('#edit-log').on('submit', authEvents.onEditLog)
  $('.back-to-pcs').on('click', authEvents.onShowPCs)
  $('.back-to-pc').on('click', authEvents.onGoBackShowPC)
  $('.back-to-plant-info').on('click', authEvents.onGoBackShowPlant)
  $('.content-plant-collections').on('click', '.btn-pc-delete', authEvents.onDeletePC)
  $('.content-plant-collections').on('click', '.pc', authEvents.onShowPC)
  $('.content-plants').on('click', '.btn-plant-delete', authEvents.onDeletePlant)
  $('.content-plants').on('click', '.plant', authEvents.onShowPlant)
  $('.plant-info').on('click', '.btn-log-delete', authEvents.onDeleteLog)
  $('.plant-info').on('click', '.btn-log-edit', authEvents.onGetEditLogPage)
})
