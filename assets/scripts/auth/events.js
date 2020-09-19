'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')
const store = require('./../store')

// Authorization Events
const onGetSignUpPage = function (event) {
  event.preventDefault()
  ui.getSignUpPage()
}

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onGetSignInPage = function (event) {
  event.preventDefault()
  ui.getSignInPage()
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

const onGetChangePasswordPage = function (event) {
  event.preventDefault()
  ui.getChangePasswordPage()
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

// Plant Collection Events
const onGetAddPCPage = function (event) {
  event.preventDefault()
  ui.getAddPCPage()
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

const onGoBackShowPC = function (event) {
  event.preventDefault()
  // get the id from the current plant collection
  const pcId = store.plantCollection._id
  // send pcId to api
  api.getPCPage(pcId)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onShowPCs = function (event) {
  event.preventDefault()
  const infoPCs = store.plantCollections
  // gets all of the plant collections information and sends it to the api GET index request
  api.showPlantCollections(infoPCs)
    .then(ui.showPCsSuccess)
    .catch(ui.showPCsFailure)
}

const onShowPC = function (event) {
  event.preventDefault()
  // event is the click event of the plant collection
  const pcId = event.target.dataset.id
  // send the plant collection's id to the api
  api.getPCPage(pcId)
    .then(ui.showPCSuccess)
    .catch(ui.showPCFailure)
}

const onGetEditPCNamePage = function (event) {
  event.preventDefault()
  const pcName = store.plantCollection.name
  ui.getEditPCNamePage(pcName)
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

const onGetDeletePCButtons = function (event) {
  event.preventDefault()
  ui.getDeletePCButtons()
}

const onDeletePC = function (event) {
  event.preventDefault()
  const pcId = event.target.dataset.id
  // gets the id of the plant collection and sends it to the api
  api.deletePlantCollection(pcId)
    .then(() => ui.deletePCSuccess(pcId))
    .then(() => api.showPlantCollections()
      .then(ui.showPCsSuccess)
      .catch(ui.showPCsFailure)
    )
    .catch(ui.deletePCFailure)
}

// Plant Events
const onGetAddNewPlant = function (event) {
  event.preventDefault()
  ui.getAddNewPlant()
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

const onShowPlant = function (event) {
  event.preventDefault()
  // sets the plant id to a id
  const plantId = event.target.dataset.id
  // sends the plant id to the api
  api.getPlantPage(plantId)
    .then(ui.showPlantSuccess)
    .catch(ui.showPlantFailure)
}

const onGoBackShowPlant = function (event) {
  event.preventDefault()
  // sets current plant id to id
  const plantId = store.plant._id
  // sends id to api
  api.getPlantPage(plantId)
    .then(ui.showPlantSuccess)
    .catch(ui.showPlantFailure)
}

const onGetEditPlantPage = function (event) {
  event.preventDefault()
  ui.getEditPlantPage()
}

const onEditPlant = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  const plantId = store.plant._id
  api.editPlant(data)
    // .then(() => ui.editPlantSuccess(data))
    .then(() => api.getPlantPage(plantId)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.editPlantFailure)
}

const onGetDeletePlantButtons = function (event) {
  event.preventDefault()
  ui.getDeletePlantButtons()
}

const onDeletePlant = function (event) {
  event.preventDefault()
  const pcId = store.plantCollection._id
  const plantId = event.target.dataset.id
  // gets the id of the plant and sends it to the api
  api.deletePlant(plantId)
    .then(() => ui.deletePlantSuccess(plantId))
    .then(() => api.getPCPage(pcId)
      .then(ui.showPCSuccess)
      .catch(ui.showPCFailure)
    )
    .catch(ui.deletePlantFailure)
}

// Log Events
const onGetAddNewLog = function (event) {
  event.preventDefault()
  ui.getAddNewLog()
}

const onAddLog = function (event) {
  event.preventDefault()
  const form = event.target
  // get the input data from the add log form
  const data = getFormFields(form)
  const plantId = store.plant._id
  api.addLog(data)
    .then(() => api.getPlantPage(plantId)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.addLogFailure)
}

const onGetEditLogButtons = function (event) {
  event.preventDefault()
  ui.getEditLogButtons()
}

const onGetEditLogPage = function (event) {
  event.preventDefault()
  // get the id from the targeted log that was clicked on
  const logId = event.target.dataset.id
  // send id info to api in order to show one log info
  api.getLog(logId)
  // send api response to get the edit log page
    .then(ui.getEditLogPage)
    .catch(ui.getEditLogPageFailure)
}

const onEditLog = function (event) {
  event.preventDefault()
  const form = event.target
  // get the input data from the edit log form
  const data = getFormFields(form)
  const plantId = store.plant._id
  api.editLog(data)
    .then(() => api.getPlantPage(plantId)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.editPlantFailure)
}

const onDeleteLog = function (event) {
  event.preventDefault()
  // get the id of the targeted log
  const logId = event.target.dataset.id
  const plantId = store.plant._id
  // send the log id to the api
  api.deleteLog(logId)
    .then(() => api.getPlantPage(plantId)
      .then(ui.showPlantSuccess)
      .catch(ui.showPlantFailure))
    .catch(ui.deletePlantFailure)
}

module.exports = {
  // Authorization Events
  onGetSignUpPage,
  onSignUp,
  onGetSignInPage,
  onSignIn,
  onGetChangePasswordPage,
  onChangePassword,
  onSignOut,

  // Plant Collection Events
  onGetAddPCPage,
  onAddPC,
  onShowPCs,
  onShowPC,
  onGoBackShowPC,
  onGetEditPCNamePage,
  onGetDeletePCButtons,
  onEditPCName,
  onDeletePC,

  // Plant Events
  onGetAddNewPlant,
  onAddPlant,
  onShowPlant,
  onGoBackShowPlant,
  onGetEditPlantPage,
  onEditPlant,
  onGetDeletePlantButtons,
  onDeletePlant,

  // Log Events
  onGetEditLogButtons,
  onAddLog,
  onGetAddNewLog,
  onGetEditLogPage,
  onEditLog,
  onDeleteLog
}
