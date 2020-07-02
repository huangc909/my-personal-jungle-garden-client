'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')

const onGetSignUpPage = function (event) {
  event.preventDefault()
  ui.getSignUpPage()
}

const onGetSignInPage = function (event) {
  event.preventDefault()
  ui.getSignInPage()
}

const onGetChangePasswordPage = function (event) {
  event.preventDefault()
  ui.getChangePasswordPage()
}

const onGetAddPCPage = function (event) {
  event.preventDefault()
  ui.getAddPCPage()
}

const onGetEditPCNamePage = function (event) {
  event.preventDefault()
  ui.getEditPCNamePage()
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

const onAddPC = function (event) {
  event.preventDefault()

  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  console.log(data)

  api.addPlantCollection(data)
    .then(ui.addPCSuccess)
    .catch(ui.addPCFailure)
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

const onEditPCName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  console.log(data)

  api.editCollectionName(data)
    .then(ui.editPCNameSuccess)
    .catch(ui.editPCNameFailure)
}

const onDeletePlantCollection = function (event) {
  event.preventDefault()
  console.log(event)
  const id = event.target.dataset.id

  api.deletePlantCollection(id)
    .then(() => ui.deletePlantCollectionSuccess(id))
    .catch(ui.deletePlantCollectionFailure)
}

module.exports = {
  onGetSignUpPage,
  onGetSignInPage,
  onGetChangePasswordPage,
  onGetAddPCPage,
  onGetEditPCNamePage,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onAddPC,
  onShowPlantCollections,
  onEditPCName,
  onDeletePlantCollection
}
