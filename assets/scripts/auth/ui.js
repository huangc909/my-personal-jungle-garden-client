'use strict'

const store = require('./../store')
const showTemplate = require('../templates/plant-collection-listing.handlebars')

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
}

const getAddPCPage = () => {
  $('.add-pc').show()
  $('.plant-collections').hide()
}

const getEditPCNamePage = (pcName) => {
  $('.edit-pc-name').show()
  $('.plant-collection').hide()
  const placeholder = (`${pcName}`)
  $('.pc-name').html(placeholder).show()
}

const getDeletePCButtons = () => {
  $('.delete-pc-button').show()
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
  console.log(store)
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
  // $('#message').text('Change Password success!').show()
  // $('#message').removeClass().addClass('success')
  // $('#message').delay(600).fadeOut(1500)
  // $('.signin').show()
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

const onShowPCsSuccess = function (data) {
  store.plantCollections = data.plantCollections
  console.log(store.plantCollections)
  $('form').trigger('reset')
  // $('#message').text('Show Plant Collection success!').show()
  // $('#message').removeClass().addClass('success')
  // $('#message').delay(600).fadeOut(1500)
  $('.changepw').hide()
  $('.plant-collections').show()
  $('.plant-collection').hide()
  $('.add-pc').hide()
  $('.edit-pc-name').hide()
  $('.plants').hide()
  const showPlantCollectionsHtml = showTemplate({ plantCollections: store.plantCollections })

  $('.content-plant-collections').html(showPlantCollectionsHtml)

  if (store.plantCollections.length === 0) {
    $('.getDeletePCButtons').hide()
    const myPlantCollections = (`
      <h2>My Plant Collections</h2>
      `)
    $('.my-pc-collections').html(myPlantCollections).show()
  } else {
    $('.getDeletePCButtons').show()
    const myPlantCollections = (`
      <h2>My Plant Collections</h2>
      `)
    $('.my-pc-collections').html(myPlantCollections).hide()
  }
}

const onShowPCsFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const editPCNameFailure = function () {
  $('#message').text('Get Collections Failed')
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

const showPCSuccess = function (response) {
  console.log(response)
  $('form').trigger('reset')
  store.plantCollection = response.plantCollection
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  $('.add-plant').hide()

  const pcName = (`
    <h3>${store.plantCollection.name}</h3>
    `)
  $('.plant-collection-name').html(pcName).show()

  const plants = store.plantCollection.plants

  const plantsList = function () {
    const plantArray = []
    for (let i = 0; i < store.plantCollection.plants.length; i++) {
      const plant = store.plantCollection.plants[i].name
      plantArray.push(plant)
    }
    const plantNames = (`
      <h4>${plantArray}</h4>
      `)
    $('.content-plants').html(plantNames).show()
  }
  plantsList(plants)
}
const showPCFailure = function () {
  $('#message').text('Unable to get Plant Collection')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const addPlantSuccess = function (response) {
  console.log(response)
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
  onShowPCsSuccess,
  onShowPCsFailure,
  editPCNameFailure,
  deletePCSuccess,
  deletePCFailure,
  showPCSuccess,
  showPCFailure,
  addPlantSuccess,
  addPlantFailure
}
