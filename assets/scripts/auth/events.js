'use strict'

const api = require('./api')
const ui = require('./ui')
const uiAuth = require('./uiAuth')
const uiPlantCollections = require('./uiPlantCollections')
const getFormFields = require('./../../../lib/get-form-fields')
const store = require('./../store')

// Authorization Events
const onGetSignUpPage = function (event) {
  event.preventDefault()
  uiAuth.getSignUpPage()
}

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signUp(data)
    .then(uiAuth.signUpSuccess)
    .then(() => api.signIn(data)
      .then(uiAuth.signInSuccess)
      .then(() => api.showPlantCollections()
        .then(uiPlantCollections.showPCsSuccess)
        .catch(uiPlantCollections.showPCsFailure)
      )
      .catch(uiAuth.signInFailure)
    )
    .catch(uiAuth.signUpFailure)
}

const onGetSignInPage = function (event) {
  event.preventDefault()
  uiAuth.getSignInPage()
}

const onGetDemoSignInPage = function (event) {
  event.preventDefault()
  uiAuth.getDemoSignInPage()
}

const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(uiAuth.signInSuccess)
    .then(() => api.showPlantCollections()
      .then(uiPlantCollections.showPCsSuccess)
      .catch(uiPlantCollections.showPCsFailure)
    )
    .catch(uiAuth.signInFailure)
}

const onDemoSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signIn(data)
    .then(uiAuth.signInSuccess)
    .then(() => api.showPlantCollections()
      .then(uiPlantCollections.showDemoPCsSuccess)
      .catch(uiPlantCollections.showDemoPCsFailure)
    )
    .catch(uiAuth.signInFailure)
}

const onGetChangePasswordPage = function (event) {
  event.preventDefault()
  uiAuth.getChangePasswordPage()
}

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.changePassword(data)
    .then(uiAuth.changePasswordSuccess)
    .catch(uiAuth.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.signOut(data)
    .then(uiAuth.signOutSuccess)
    .catch(uiAuth.signOutFailure)
}

const onDemoSignOut = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  // gets the id of the plant collection and sends it to the api for delete request then signout; otherwise, signout
  if (store.plantCollections.length > 0) {
    let pcId = '0'

    store.plantCollections.map(pcItem => {
      pcId = pcItem._id
      api.deletePlantCollection(pcId)
    })
    api.signOut(data)
      .then(uiAuth.signOutSuccess)
      .catch(uiAuth.signOutFailure)
  } else {
    api.signOut(data)
      .then(uiAuth.signOutSuccess)
      .catch(uiAuth.signOutFailure)
  }
}

// Plant Collections Events
const onGetAddPCPage = function (event) {
  event.preventDefault()
  uiPlantCollections.getAddPCPage()
}

const onAddPC = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  // Sends the form data to the api
  api.addPlantCollection(data)
    // After going to ui,
    .then(uiPlantCollections.addPCSuccess)
    // sends api response to request for index of all plant collections
    .then(() => api.showPlantCollections()
      .then(uiPlantCollections.showPCsSuccess)
      .catch(uiPlantCollections.showPCsFailure)
    )
    .catch(uiPlantCollections.addPCFailure)
}

const onGoBackShowPC = function (event) {
  event.preventDefault()
  // get the id from the current plant collection
  const pcId = store.plantCollection._id
  // send pcId to api
  api.getPCPage(pcId)
    .then(uiPlantCollections.showPCSuccess)
    .catch(uiPlantCollections.showPCFailure)
}

const onShowPCs = function (event) {
  event.preventDefault()
  const infoPCs = store.plantCollections
  // gets all of the plant collections information and sends it to the api GET index request
  api.showPlantCollections(infoPCs)
    .then(uiPlantCollections.showPCsSuccess)
    .catch(uiPlantCollections.showPCsFailure)
}

const onShowPC = function (event) {
  event.preventDefault()
  // event is the click event of the plant collection
  const pcId = event.target.dataset.id
  // send the plant collection's id to the api
  api.getPCPage(pcId)
    .then(uiPlantCollections.showPCSuccess)
    .catch(uiPlantCollections.showPCFailure)
}

const onGetEditPCNamePage = function (event) {
  event.preventDefault()
  const pcName = store.plantCollection.name
  uiPlantCollections.getEditPCNamePage(pcName)
}

const onEditPCName = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  // gets the pc name from the form field and sends it to the api
  api.editCollectionName(data)
    .then(() => uiPlantCollections.editPCNameSuccess(data))
    .catch(uiPlantCollections.editPCNameFailure)
}

const onGetDeletePCButtons = function (event) {
  event.preventDefault()
  uiPlantCollections.getDeletePCButtons()
}

const onDeletePC = function (event) {
  event.preventDefault()
  const pcId = event.target.dataset.id
  // gets the id of the plant collection and sends it to the api
  api.deletePlantCollection(pcId)
    .then(() => uiPlantCollections.deletePCSuccess(pcId))
    .then(() => api.showPlantCollections()
      .then(uiPlantCollections.showPCsSuccess)
      .catch(uiPlantCollections.showPCsFailure)
    )
    .catch(uiPlantCollections.deletePCFailure)
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
      .then(uiPlantCollections.showPCSuccess)
      .catch(uiPlantCollections.showPCFailure)
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
    .catch(ui.editLogFailure)
}

const onDeleteLog = function (event) {
  event.preventDefault()
  // get the id of the targeted log
  const logId = event.target.dataset.id
  const plantId = store.plant._id
  // send the log id to the api
  api.deleteLog(logId)
    .then(ui.deleteLogSuccess)
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
  onGetDemoSignInPage,
  onSignIn,
  onDemoSignIn,
  onGetChangePasswordPage,
  onChangePassword,
  onSignOut,
  onDemoSignOut,

  // Plant Collections Events
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
