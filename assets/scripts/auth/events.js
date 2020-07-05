'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')
const store = require('./../store')

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
  const pcName = store.plantCollection.name
  ui.getEditPCNamePage(pcName)
}

const onGetDeletePCButtons = function (event) {
  event.preventDefault()
  ui.getDeletePCButtons()
}

const onGetDeletePlantButtons = function (event) {
  event.preventDefault()
  ui.getDeletePlantButtons()
}

const onGetAddNewPlant = function (event) {
  event.preventDefault()
  ui.getAddNewPlant()
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
      .then(ui.onShowPCsSuccess)
      .catch(ui.onShowPCsFailure)
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
  console.log(event)
  const form = event.target
  console.log(form)
  const data = getFormFields(form)
  console.log(data)
  api.addPlantCollection(data)
    .then(ui.addPCSuccess)
    .then(() => api.showPlantCollections()
      .then(ui.onShowPCsSuccess)
      .catch(ui.onShowPCsFailure)
    )
    .catch(ui.addPCFailure)
}

const onShowPCs = function (event) {
  event.preventDefault()
  const infoPCs = store.plantCollections
  console.log('This is the onShowPCS ' + infoPCs)
  api.showPlantCollections(infoPCs)
    .then(ui.onShowPCsSuccess)
    .catch(ui.onShowPCsFailure)
}

const onEditPCName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.editCollectionName(data)
    .then(() => ui.editPCNameSuccess(data))
    .catch(ui.editPCNameFailure)
}

const onDeletePC = function (event) {
  event.preventDefault()
  console.log(event)
  const id = event.target.dataset.id

  api.deletePlantCollection(id)
    .then(() => ui.deletePCSuccess(id))
    .then(() => api.showPlantCollections()
      .then(ui.onShowPCsSuccess)
      .catch(ui.onShowPCsFailure)
    )
    .catch(ui.deletePCFailure)
}

const onShowPC = function (event) {
  event.preventDefault()
  // event is the click event
  console.log(event)
  const id = event.target.dataset.id
  // id is the plant collection's id
  console.log(id)

  api.getPCPage(id)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onGoBackShowPC = function (event) {
  event.preventDefault()
  const infoPC = store.plantCollection._id
  api.getPCPage(infoPC)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onAddPlant = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.addPlant(data)
    .then(ui.addPlantSuccess)
    .then((response) => ui.showPCSuccess(response))
    .catch(ui.addPlantFailure)
}

const onShowPlant = function (event) {
  event.preventDefault()
  console.log(event)
}

module.exports = {
  onGetSignUpPage,
  onGetSignInPage,
  onGetChangePasswordPage,
  onGetAddPCPage,
  onGetEditPCNamePage,
  onGetDeletePCButtons,
  onGetDeletePlantButtons,
  onGetAddNewPlant,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onAddPC,
  onShowPCs,
  onEditPCName,
  onDeletePC,
  onShowPC,
  onGoBackShowPC,
  onAddPlant,
  onShowPlant
}
