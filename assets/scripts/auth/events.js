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

const onGetDeletePCButtons = function (event) {
  event.preventDefault()
  ui.getDeletePCButtons()
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
    .then(() => api.showPlantCollections()
      .then(ui.showPlantCollectionsSuccess)
      .catch(ui.showPlantCollectionsFailure)
    )
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
  const data = getFormFields(form)

  api.addPlantCollection(data)
    .then(ui.addPCSuccess)
    .catch(ui.addPCFailure)
}

const onShowPlantCollections = function (event) {
  event.preventDefault()
  api.showPlantCollections()
    .then(ui.showPlantCollectionsSuccess)
    .catch(ui.showPlantCollectionsFailure)
}

const onEditPCName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.editCollectionName(data)
    .then(ui.editPCNameSuccess)
    .catch(ui.editPCNameFailure)
}

const onDeletePlantCollection = function (event) {
  event.preventDefault()
  const id = event.target.dataset.id

  api.deletePlantCollection(id)
    .then(() => ui.deletePlantCollectionSuccess(id))
    .catch(ui.deletePlantCollectionFailure)
}

const onGetPCPage = function (event) {
  event.preventDefault()
  const id = event.target.dataset.id
  console.log(id)

  api.getPCPage(id)
    .then(ui.getPCPageSuccess)
    .catch(ui.getPCPageFailure)
}

module.exports = {
  onGetSignUpPage,
  onGetSignInPage,
  onGetChangePasswordPage,
  onGetAddPCPage,
  onGetEditPCNamePage,
  onGetDeletePCButtons,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onAddPC,
  onShowPlantCollections,
  onEditPCName,
  onDeletePlantCollection,
  onGetPCPage
}
