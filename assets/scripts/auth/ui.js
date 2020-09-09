'use strict'

const store = require('./../store')
const showTemplate = require('../templates/plant-collection-listings.handlebars')

const showPCTemplate = require('../templates/plant-collection.handlebars')

const showPlantInfoTemplate = require('../templates/plant-info.handlebars')

const getSignUpPage = () => {
  $('.signin').hide()
  $('.signup').show()
}

const getSignInPage = () => {
  $('.signup').hide()
  $('.signin').show()
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
}

const getAddPCPage = () => {
  $('.add-pc').show()
  $('.plant-collections').hide()
}

const getEditPCNamePage = (pcName) => {
  $('.edit-pc-name').show()
  $('.plant-collection').hide()
  const editPCName = (`
    <h2>Edit Collection Name</h2>
    <input name="plantCollection[name]" type="text" placeholder="${pcName}" required>
    <br>
    `)
  $('.edit-pc-info').html(editPCName).show()
}

const getEditPlantPage = () => {
  $('.edit-plant').show()
  $('.plant-information').hide()

  const editPlantInfo = (`
    <p>Plant Name</p>
    <input name="plant[name]" value="${store.plant.name}" type="text" required>
    <br>
    <br>
    <p>Plant Nickname</p>
    <input name="plant[nickName]" value="${store.plant.nickName}" type="text">
    <br>
    <br>
    <p>Date Acquired</p>
    <input name="plant[dateAcquired]" value="${store.plant.dateAcquired}" type="text" required>
    <br>
    <br>
    <p>Additional Notes</p>
    <input name="plant[additionalNotes]" value="${store.plant.additionalNotes}" type="text">
    <br>
    <br>
    `)

  $('.edit-plant-info').html(editPlantInfo).show()
}

const getDeletePCButtons = () => {
  $('.delete-pc-button').show()
}

const getDeletePlantButtons = () => {
  $('.delete-plant-button').show()
}

const getAddNewPlant = () => {
  $('.plant-collection').hide()
  $('.add-plant').show()
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

const signInSuccess = function (response) {
  store.user = response.user
  // console.log(store)
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
}

const signOutFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign Out failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
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
  console.log('This is the data for the plant collections' + data)
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

  // assign handlebar template for plant collections to variable
  const showPlantCollectionsHtml = showTemplate({ plantCollections: store.plantCollections })

  // show handlebar template for plant collection
  $('.content-plant-collections').html(showPlantCollectionsHtml)

  // If there are existing plant collections,
  if (store.plantCollections.length === 0) {
    $('.getDeletePCButtons').hide()
    // display existing plant collection names
    const myPlantCollections = (`
      <h2>My Plant Collections</h2>
      `)
    $('.my-pc-collections').html(myPlantCollections).show()
  } else {
    // otherwise, display "My Plant Collections"
    $('.getDeletePCButtons').show()
    const myPlantCollections = (`
      <h2>My Plant Collections</h2>
      `)
    $('.my-pc-collections').html(myPlantCollections).hide()
  }
}

const showPCsFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
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

  store.plantCollection.name = data.plantCollection.name

  const showPlantsHtml = showPCTemplate({ plantCollection: store.plantCollection })

  $('.content-plants').html(showPlantsHtml).show()
}

const editPCNameFailure = function () {
  $('#message').text('Edit Plant Collection Name Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const editPlantSuccess = function (data) {
  $('form').trigger('reset')
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').hide()
  $('.add-plant').hide()
  $('.plant-collection-name').hide()
  $('.edit-plant').hide()
  $('.plant-information').show()
  $('.add-log').hide()

  console.log(data.plant.name)
  store.plant = data.plant

  const plantInfo = (`
    <h2>${store.plant.nickName}</h2>
    <br>
    <div class="plant-specs">
      <h4>Name: ${store.plant.name}</h4>
      <h4>Date Acquired: ${store.plant.dateAcquired}</h4>
      <h4>Notes: ${store.plant.additionalNotes}</h4>
    <div>
    `)

  $('.plant-info').html(plantInfo).show()
}

const editPlantFailure = function () {
  $('#message').text('Edit Plant Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
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

const showPlantSuccess = function (response) {
  $('form').trigger('reset')
  store.plant = response.plant
  console.log(store)
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').hide()
  $('.add-plant').hide()
  $('.edit-plant').hide()
  $('.add-log').hide()
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

const showPCSuccess = function (response) {
  // response is the plant collection object
  $('form').trigger('reset')
  store.plantCollection = response.plantCollection
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  $('.add-plant').hide()
  $('.plant-collection-name').hide()
  $('.plant-information').hide()
  $('.add-log').hide()

  const showPlantsHtml = showPCTemplate({ plantCollection: store.plantCollection })

  $('.content-plants').html(showPlantsHtml).show()

  // // assigning plants info to variable plants
  // const plants = store.plantCollection.plants
  //
  // // Have the plant names appear on the page
  // const plantsList = function () {
  //   // empty array for the plant names
  //   const plantArray = []
  //   // for each plant
  //   for (let i = 0; i < store.plantCollection.plants.length; i++) {
  //     // store the name as plant variable
  //     const plant = store.plantCollection.plants[i]
  //     // format the plant variable
  //     const plantName = (`
  //       <div>
  //         <h4 class="plant-name pointer">${plant.name}</h4>
  //       </div>
  //       `)
  //     // add formatted plant variable to plant array
  //     plantArray.push(plantName)
  //   }
  //   // show plant array
  //   $('.content-plants').html(plantArray).show()
  // }
  // // invoke the plantsList function by putting in plants variable
  // plantsList(plants)
}

const showPCFailure = function () {
  $('#message').text('Unable to get Plant Collection')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const addPlantSuccess = function (response) {
  // console.log(response)
  return response
}

const addPlantFailure = function () {
  $('#message').text('Unable to add new plant')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

module.exports = {
  getSignUpPage,
  getSignInPage,
  getChangePasswordPage,
  getAddPCPage,
  getEditPCNamePage,
  getDeletePCButtons,
  getDeletePlantButtons,
  getAddNewPlant,
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  addPCSuccess,
  addPCFailure,
  showPCsSuccess,
  showPCsFailure,
  editPCNameSuccess,
  editPCNameFailure,
  deletePCSuccess,
  deletePCFailure,
  showPCSuccess,
  showPCFailure,
  addPlantSuccess,
  addPlantFailure,
  deletePlantSuccess,
  deletePlantFailure,
  showPlantSuccess,
  showPlantFailure,
  getEditPlantPage,
  editPlantSuccess,
  editPlantFailure
}
