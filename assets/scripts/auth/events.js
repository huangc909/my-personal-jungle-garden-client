'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')

const onGetSignUp = function (event) {
  $('.signin').hide()
  $('.signup').show()
}

const onGetSignIn = function (event) {
  $('.signup').hide()
  $('.signin').show()
}

const onGetChangePassword = function (event) {
  $('.changepw').show()
  $('.plant-collections').hide()
}

const onGetAddPlantCollection = function (event) {
  $('.add-pc').show()
}

const onGetEditCollectionName = function (event) {
  $('.edit-collection-name').show()
  $('.plant-collection').hide()
}

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onAddPlantCollection = function (event) {
  event.preventDefault()

  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  console.log(data)

  api.addPlantCollection(data)
    .then(ui.addPlantCollectionSuccess)
    .catch(ui.addPlantCollectionFailure)
}

const onShowPlantCollections = function (event) {
  // $('.menu-dropdown').show()
  // $('.plant-collections').show()
  // $('.changepw').hide()
  event.preventDefault()
  api.showPlantCollections()
    .then(ui.showPlantCollectionsSuccess)
    .catch(ui.showPlantCollectionsFailure)
}

const onEditCollectionName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.editCollectionName(data)
    .then(ui.editCollectionNameSuccess)
    .catch(ui.editCollectionNameFailure)
}

module.exports = {
  onGetSignUp,
  onGetSignIn,
  onGetChangePassword,
  onGetAddPlantCollection,
  onGetEditCollectionName,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onAddPlantCollection,
  onShowPlantCollections,
  onEditCollectionName
}
