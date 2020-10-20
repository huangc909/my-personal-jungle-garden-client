'use strict'

const store = require('./../store')
const showTemplate = require('../templates/plant-collection-listings.handlebars')

const showPCTemplate = require('../templates/plant-collection.handlebars')

const showPlantInfoTemplate = require('../templates/plant-info.handlebars')

// Authorization
const getSignUpPage = () => {
  $('.signin').hide()
  $('.signup').show()
}

const signUpSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign-up Success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
  $('.signup').hide()
}

const signUpFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-up Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getSignInPage = () => {
  $('.signup').hide()
  $('.signin').show()
}

const signInSuccess = function (response) {
  store.user = response.user
  $('form').trigger('reset')
  // $('#message').text('Sign-in Success').show()
  // $('#message').removeClass().addClass('success')
  // $('#message').delay(600).fadeOut(1500)
  $('.signin').hide()
  $('.menu-dropdown').show()
  $('.plant-collections').show()
}

const signInFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-in Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getChangePasswordPage = () => {
  $('.changepw').show()
  $('.plant-collections').hide()
  $('.add-pc').hide()
  $('.plant-collection').hide()
  $('.edit-pc-name').hide()
  $('.add-plant').hide()
  $('.plant-information').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
  $('.edit-log').hide()
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Change Password success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const changePasswordFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Change Password failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const signOutSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign Out success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
  $('.menu-dropdown').hide()
  $('.changepw').hide()
  $('.plant-collections').hide()
  $('.add-pc').hide()
  $('.plant-collection').hide()
  $('.edit-pc-name').hide()
  $('.add-plant').hide()
  $('.plant-information').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
  $('.edit-log').hide()
}

const signOutFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign Out failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

// Plant Collections
const getAddPCPage = () => {
  $('.add-pc').show()
  $('.plant-collections').hide()
  $('.edit-log').hide()
}

const addPCSuccess = function (data) {
  $('form').trigger('reset')
  $('.add-pc').hide()
}

const addPCFailure = function () {
  $('#message').text('Add Collection Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const showPCsSuccess = function (data) {
  // stores the incoming data on all the plant collections
  store.plantCollections = data.plantCollections
  $('form').trigger('reset')
  $('.plant-collections').show()
  $('.changepw').hide()
  $('.plant-collection').hide()
  $('.add-pc').hide()
  $('.edit-pc-name').hide()
  $('.add-plant').hide()
  $('.plant-info').hide()
  $('.edit-plant').hide()
  $('.plant-information').hide()
  $('.add-log').hide()
  $('.edit-log').hide()

  // assign handlebar template for plant collections to variable
  const showPlantCollectionsHtml = showTemplate({ plantCollections: store.plantCollections })

  // show handlebar template for plant collection
  $('.content-plant-collections').html(showPlantCollectionsHtml)

  // If there are existing plant collections,
  if (store.plantCollections.length === 0) {
    $('.getDeletePCButtons').hide()
    // display existing plant collection names
    const myPlantCollections = (`
      <p>You currently have no plant collections. Add one!</p>
      `)
    $('.my-pc-collections').html(myPlantCollections).show()
    $('.get-delete-pc-buttons').hide()
  } else {
    // otherwise, display "My Plant Collections"
    $('.getDeletePCButtons').show()
    const myPlantCollections = (`
      <h2>My Plant Collections</h2>
      `)
    $('.my-pc-collections').html(myPlantCollections).hide()
    $('.get-delete-pc-buttons').show()
  }
}

const showPCsFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const showPCSuccess = function (response) {
  // 'response' is the plant collection object
  $('form').trigger('reset')
  store.plantCollection = response.plantCollection
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  $('.add-plant').hide()
  $('.plant-collection-name').hide()
  $('.plant-information').hide()
  $('.add-log').hide()
  $('.edit-log').hide()

  const showPlantsHtml = showPCTemplate({ plantCollection: store.plantCollection })

  $('.content-plants').html(showPlantsHtml).show()

  if (store.plantCollection.plants.length === 0) {
    $('.get-delete-plant-buttons').hide()
    const myPlants = (`
      <h2 class="pc pc-name-header">${store.plantCollection.name}</h2>
      <p>You currently have no plants. Add one!
      `)
    $('.content-plants').html(myPlants).show()
  } else {
    $('.get-delete-plant-buttons').show()
    // $('.content-plants').html(showPlantInfoHtml).show()
  }
}

const showPCFailure = function () {
  $('#message').text('Unable to get Plant Collection')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getEditPCNamePage = (pcName) => {
  $('.edit-pc-name').show()
  $('.plant-collection').hide()
  $('.edit-log').hide()
  const editPCName = (`
    <h2>Edit Collection Name</h2>
    <input name="plantCollection[name]" type="text" value="${pcName}" required>
    <br>
    `)
  $('.edit-pc-info').html(editPCName).show()
}

const editPCNameSuccess = function (data) {
  $('form').trigger('reset')
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  $('.add-plant').hide()
  $('.plant-collection-name').show()
  $('.edit-plant').hide()
  $('.plant-information').hide()
  $('.add-log').hide()
  $('.edit-log').hide()

  store.plantCollection.name = data.plantCollection.name

  const showPlantsHtml = showPCTemplate({ plantCollection: store.plantCollection })

  $('.content-plants').html(showPlantsHtml).show()
}

const editPCNameFailure = function () {
  $('#message').text('Edit Plant Collection Name Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getDeletePCButtons = () => {
  $('.delete-pc-button').show()
}

const getDeletePlantButtons = () => {
  $('.delete-plant-button').show()
}

const deletePCSuccess = function (id) {
  $(`[data-id='${id}']`).remove()
  $('form').trigger('reset')
  $('#message').text('Plant Collection Deleted!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const deletePCFailure = function () {
  $('#message').text('Delete Plant Collection Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

// Plants
const getAddNewPlant = () => {
  $('.plant-collection').hide()
  $('.edit-log').hide()
  $('.add-plant').show()
}

const addPlantSuccess = function (response) {
  // length of new plant array
  const newPlantArray = response.plantCollection.plants.length
  // Subtract array length by 1 to get the new plant array index number
  const newPlantIndex = newPlantArray - 1
  // Get the id of the newPlant
  const newPlantId = response.plantCollection.plants[newPlantIndex]._id
  return newPlantId
}

const addPlantFailure = function () {
  $('#message').text('Unable to add new plant')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const showPlantSuccess = function (response) {
  $('form').trigger('reset')
  // 'response' shows plant's info
  store.plant = response.plant
  // only console.log(store) will show plant collection info
  // console.log('this is the store ' + store) does not work
  // 'store.plant' shows plant's info
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').hide()
  $('.add-plant').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
  $('.edit-log').hide()
  $('.plant-information').show()
  // After getting the plant resource, its info is displayed
  const showPlantInfoHtml = showPlantInfoTemplate({ plant: store.plant })

  $('.plant-info').html(showPlantInfoHtml).show()
}

const showPlantFailure = function () {
  $('#message').text('Unable to get Plant Info')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getEditPlantPage = () => {
  $('.edit-plant').show()
  $('.plant-information').hide()
  $('.edit-log').hide()

  const editPlantInfo = (`
    <p>Plant Name</p>
    <select name="plant[name]" class="plant-name" required>
        <option>${store.plant.name}</option>
        <option>Hoya australis</option>
        <option>Hoya bilobata</option>
        <option>Hoya carnosa (hindu rope - green)</option>
        <option>Hoya carnosa (hindu rope - variegated)</option>
        <option>Hoya carnosa (jade)</option>
        <option>Hoya carnosa (queen)</option>
        <option>Hoya carnosa (princess)</option>
        <option>Hoya imbricata</option>
        <option>Hoya kerrii (green)</option>
        <option>Hoya kerrii (variegated)</option>
        <option>Hoya obscura</option>
        <option>Monstera adansonii (wide)</option>
        <option>Monstera adansonii (narrow)</option>
        <option>Monstera deliciosa</option>
        <option>Monstera dubia</option>
        <option>Monstera lechleriana</option>
        <option>Monstera obliqua</option>
        <option>Monstera peru</option>
        <option>Monstera siltepecana</option>
        <option>Monstera standleyana (green)</option>
        <option>Monstera standleyana (variegated - cream)</option>
        <option>Monstera standleyana (variegated - yellow)</option>
        <option>Monstera subpinnata</option>
        <option>Philodendron bipennifolium</option>
        <option>Philodendron brasil</option>
        <option>Philodendron cordatum</option>
        <option>Philodendron crassinervium</option>
        <option>Philodendron erubescens</option>
        <option>Philodendron giganteum</option>
        <option>Philodendron gloriosum</option>
        <option>Philodendron hastatum (silver)</option>
        <option>Philodendron hederaceum (heartleaf)</option>
        <option>Philodendron hederaceum (micans)</option>
        <option>Philodendron mayoii</option>
        <option>Philodendron melanochrysum</option>
        <option>Philodendron micans</option>
        <option>Philodendron pedatum</option>
        <option>Philodendron radiatum</option>
        <option>Philodendron rugosum</option>
        <option>Philodendron squamiferum</option>
        <option>Philodendron tripartitum</option>
        <option>Philodendron verrucosum</option>
        <option>Scindapsus pictus</option>
        <option>Syngonium angustatum</option>
        <option>Syngonium auritum</option>
        <option>Syngonium chiapense</option>
        <option>Syngonium erythrophyllum</option>
        <option>Syngonium macrophyllum</option>
        <option>Syngonium podophyllum</option>
        <option>Syngonium rayi</option>
        <option>Syngonium sagittatum</option>
        <option>Syngonium wendlandii</option>
    </select>
    <br>
    <br>
    <p>Plant Nickname</p>
    <input name="plant[nickName]" value="${store.plant.nickName}" type="text" class="edit-input-field">
    <br>
    <br>
    <p>Date Acquired</p>
    <input name="plant[dateAcquired]" value="${store.plant.dateAcquired}" type="date" required class="edit-input-field">
    <br>
    <br>
    <p>Additional Notes</p>
    <input name="plant[additionalNotes]" value="${store.plant.additionalNotes}" type="text" class="edit-input-field">
    <br>
    <br>
    `)
  $('.edit-plant-info').html(editPlantInfo).show()
}

const editPlantFailure = function () {
  $('#message').text('Edit Plant Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const deletePlantSuccess = function (id) {
  $(`[data-id='${id}']`).remove()
  $('form').trigger('reset')
  $('#message').text('Plant Deleted!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const deletePlantFailure = function () {
  $('#message').text('Delete Plant Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

// Logs

const addLogFailure = function () {
  $('#message').text('Unable to add new log')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getAddNewLog = () => {
  $('.plant-information').hide()
  $('.edit-log').hide()
  $('.add-log').show()
}

const getEditLogButtons = () => {
  $('.delete-log-button').show()
  $('.edit-log-button').show()
}

const getEditLogPage = (response) => {
  $('.edit-log').show()
  $('.plant-information').hide()

  store.log = response.log

  const editLogInfo = (`
    <p>Date</p>
    <input name="log[date]" value="${store.log.date}" type="date" min="2000-01-01" required>
    <br>
    <br>
    <p>Entry</p>
    <textarea name="log[entry]" rows="10" cols="30">${store.log.entry}</textarea>
    <br>
    <br>
    `)

  $('.edit-log-info').html(editLogInfo).show()
}

const getEditLogPageFailure = () => {
  $('#message').text('Get Log Edit Page Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const editLogFailure = function () {
  $('#message').text('Failed to Update Log')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const deleteLogSuccess = function () {
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  $('.add-plant').hide()
  $('.plant-collection-name').show()
  $('.edit-plant').hide()
  $('.plant-information').hide()
  $('.add-log').hide()
  $('.edit-log').hide()

  $('#message').text('Deleted Log Success!')
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const deleteLogFailure = function () {
  $('#message').text('Failed to Delete Log')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

module.exports = {
  // Authorization
  getSignUpPage,
  signUpSuccess,
  signUpFailure,
  getSignInPage,
  signInSuccess,
  signInFailure,
  getChangePasswordPage,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,

  // Plant Collections
  getAddPCPage,
  addPCSuccess,
  addPCFailure,
  showPCsSuccess,
  showPCsFailure,
  showPCSuccess,
  showPCFailure,
  getEditPCNamePage,
  editPCNameSuccess,
  editPCNameFailure,
  getDeletePCButtons,
  deletePCSuccess,
  deletePCFailure,

  // Plants
  getAddNewPlant,
  addPlantSuccess,
  addPlantFailure,
  showPlantSuccess,
  showPlantFailure,
  getEditPlantPage,
  editPlantFailure,
  getDeletePlantButtons,
  deletePlantSuccess,
  deletePlantFailure,

  // Logs
  addLogFailure,
  getEditLogButtons,
  getAddNewLog,
  getEditLogPage,
  getEditLogPageFailure,
  editLogFailure,
  deleteLogSuccess,
  deleteLogFailure

}
