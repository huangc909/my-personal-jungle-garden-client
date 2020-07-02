'use strict'

const store = require('./../store')
const showPlantCollectionsTemplate = require('../templates/plant-collection-listing.handlebars')

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
}

const getAddPCPage = () => {
  $('.add-pc').show()
}

const getEditPCNamePage = () => {
  $('.edit-collection-name').show()
  $('.plant-collection').hide()
}

const getPCButtons = () => {
  $('.pc-button').show()
}

const getDeletePCButtons = () => {
  $('.delete-pc-button').show()
}

const signUpSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Sign-up Success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
}

const signUpFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-up Failed')
  $('#message').removeClass().addClass('failure')
}

const signInSuccess = function (response) {
  store.user = response.user
  console.log(store)
  $('form').trigger('reset')
  $('#message').text('Sign-in Success').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.signin').hide()
  $('.menu-dropdown').show()
  $('.plant-collections').show()
}

const signInFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Sign-in Failed')
  $('#message').removeClass().addClass('failure')
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#message').text('Change Password success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  // $('.signin').show()
}

const changePasswordFailure = function () {
  $('form').trigger('reset')
  $('#message').text('Change Password failed')
  $('#message').removeClass().addClass('failure')
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
}

const addPCSuccess = function (data) {
  store.plantCollection = data.plantCollection
  $('form').trigger('reset')
  $('#message').text('Add Plant Collection success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.plant-collection').show()
  // const newPlantCollection = (`<h3>${store.plantCollection.name}</h3>`)
  // $('.collection-name').html(newPlantCollection)
}

const addPCFailure = function () {
  $('#message').text('Add Collection Failed')
  $('#message').removeClass().addClass('failure')
}

const showPlantCollectionsSuccess = function (data) {
  store.plantCollections = data.plantCollections
  $('form').trigger('reset')
  $('#message').text('Show Plant Collection success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.changepw').hide()
  $('.plant-collections').show()
  const showPlantCollectionsHtml = showPlantCollectionsTemplate({ plantCollections: store.plantCollections })
  $('.content-plant-collections').html(showPlantCollectionsHtml)
}

const showPlantCollectionsFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
}

const editPCNameSuccess = function (data) {
  console.log(data)
  store.plantCollection = data.plantCollection
  $('form').trigger('reset')
  $('#message').text('Edit Plant Collection success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  const showPlantCollectionsHtml = showPlantCollectionsTemplate({ plantCollection: store.plantCollection })
  $('.content-plant-collections').append(showPlantCollectionsHtml)

  const editedCollectionName = (`
    <h3>${store.plantCollection.name}</h3>
    `)
  $('.collection-name').append(editedCollectionName)
  $('.plant-collection').show()
}

const editPCNameFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
}

const deletePlantCollectionSuccess = function (id) {
  $(`[data-id='${id}']`).remove()
  $('form').trigger('reset')
  $('#message').text('Plant Collection Deleted!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
}

const deletePlantCollectionFailure = function () {
  $('#message').text('Delete Plant Collection Failed')
  $('#message').removeClass().addClass('failure')
}

const getPCPageSuccess = function (response) {
  store.plantCollection = response.plantCollection
  $('.plant-collection').show()
  const pcName = (`
    <h3>${store.plantCollection.name}</h3>
    `)
  $('.plant-collection-name').html(pcName).show()
}

module.exports = {
  getSignUpPage,
  getSignInPage,
  getChangePasswordPage,
  getAddPCPage,
  getEditPCNamePage,
  getPCButtons,
  getDeletePCButtons,
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
  showPlantCollectionsSuccess,
  showPlantCollectionsFailure,
  editPCNameSuccess,
  editPCNameFailure,
  deletePlantCollectionSuccess,
  deletePlantCollectionFailure,
  getPCPageSuccess
}
