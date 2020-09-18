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

const onGetEditPlantPage = function (event) {
  event.preventDefault()
  ui.getEditPlantPage()
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

const onGetAddNewLog = function (event) {
  event.preventDefault()
  ui.getAddNewLog()
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
      .then(ui.showPCsSuccess)
      .catch(ui.showPCsFailure)
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

const onShowPCs = function (event) {
  event.preventDefault()
  const infoPCs = store.plantCollections
  // gets all of the plant collections information and sends it to the api GET index request
  api.showPlantCollections(infoPCs)
    .then(ui.showPCsSuccess)
    .catch(ui.showPCsFailure)
}

const onAddPC = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  // Sends the form data to the api
  api.addPlantCollection(data)
    // After going to ui,
    .then(ui.addPCSuccess)
    // sends api response to request for index of all plant collections
    .then(() => api.showPlantCollections()
      .then(ui.showPCsSuccess)
      .catch(ui.showPCsFailure)
    )
    .catch(ui.addPCFailure)
}

const onEditPCName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  // gets the pc name from the form field and sends it to the api
  api.editCollectionName(data)
    .then(() => ui.editPCNameSuccess(data))
    .catch(ui.editPCNameFailure)
}

const onEditPlant = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  api.editPlant(data)
    .then(() => ui.editPlantSuccess(data))
    .catch(ui.editPlantFailure)
}

const onDeletePC = function (event) {
  event.preventDefault()
  // console.log(event)
  const id = event.target.dataset.id
  // gets the id of the plant collection and sends it to the api
  api.deletePlantCollection(id)
    .then(() => ui.deletePCSuccess(id))
    .then(() => api.showPlantCollections()
      .then(ui.showPCsSuccess)
      .catch(ui.showPCsFailure)
    )
    .catch(ui.deletePCFailure)
}

const onDeletePlant = function (event) {
  event.preventDefault()
  // console.log(event)
  const id = event.target.dataset.id
  // gets the ide of the plant and sends it to the api
  api.deletePlant(id)
    .then(() => ui.deletePlantSuccess(id))
    .then(() => api.getPCPage(store.plantCollection._id)
      .then(ui.showPCSuccess)
      .catch(ui.showPCFailure)
    )
    .catch(ui.deletePlantFailure)
}

const onShowPC = function (event) {
  event.preventDefault()
  // event is the click event of the plant collection
  // console.log(event)
  const id = event.target.dataset.id
  // id is the plant collection's id
  // console.log(id)
  // send the plant collection's id to the api
  api.getPCPage(id)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onShowPlant = function (event) {
  event.preventDefault()
  // sets the plant id to a id
  const id = event.target.dataset.id
  // sends the plant id to the api
  api.getPlantPage(id)
    .then(ui.showPlantSuccess)
    .catch(ui.showPlantFailure)
}

const onGoBackShowPC = function (event) {
  event.preventDefault()
  // sets the current plant collection id to infoPC
  const infoPC = store.plantCollection._id
  // sends infoPC to api
  api.getPCPage(infoPC)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onGoBackShowPlant = function (event) {
  event.preventDefault()
  // sets current plant id to id
  const id = store.plant._id
  // sends id to api
  api.getPlantPage(id)
    .then(ui.showPlantSuccess)
    .catch(ui.showPlantFailure)
}

const onAddPlant = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  // sends plant information to api
  api.addPlant(data)
    .then(ui.addPlantSuccess)
    // send plant id to the API GET request
    .then((id) => api.getPlantPage(id)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.addPlantFailure)
}

const onAddLog = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  // console.log(data)
  // console.log(store.plant._id)
  const plantId = store.plant._id
  const pcId = store.plantCollection._id
  api.addLog(data, pcId, plantId)
    .then((id) => api.getPlantPage(plantId)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.addLogFailure)
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
  onGetAddNewLog,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onAddPC,
  onShowPCs,
  onEditPCName,
  onDeletePC,
  onDeletePlant,
  onShowPC,
  onGoBackShowPC,
  onAddPlant,
  onShowPlant,
  onGetEditPlantPage,
  onEditPlant,
  onAddLog,
  onGoBackShowPlant
}
