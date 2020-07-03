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

const signUpSuccess = function (response) {
  $('form').trigger('reset')
  // $('#message').text('Sign-up Success!').show()
  // $('#message').removeClass().addClass('success')
  // $('#message').delay(600).fadeOut(1500)
  $('.signin').show()
  $('.signup').hide()
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
  $('form').trigger('reset')
  $('.add-pc').hide()
}

const addPCFailure = function () {
  $('#message').text('Add Collection Failed')
  $('#message').removeClass().addClass('failure')
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
  const showPlantCollectionsHtml = showPlantCollectionsTemplate({ plantCollections: store.plantCollections })
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
}

const editPCNameSuccess = function (data) {
  console.log(data)
  store.plantCollection = data.plantCollection

  $('form').trigger('reset')
  $('.edit-pc-name').hide()
  $('.plant-collection').show()
  const pcName = (`
    <h3>${store.plantCollection.name}</h3>
    `)
  $('.plant-collection-name').html(pcName).show()
}

const editPCNameFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
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
}

const showPCSuccess = function (response) {
  console.log(response)
  store.plantCollection = response.plantCollection
  $('.plant-collections').hide()
  $('.edit-pc-name').hide()
  $('.plant-collection').show()

  const pcName = (`
    <h3>${store.plantCollection.name}</h3>
    `)
  $('.plant-collection-name').html(pcName).show()
}

const showPCFailure = function () {
  $('#message').text('Unable to get Plant Collection')
  $('#message').removeClass().addClass('failure')
}

module.exports = {
  getSignUpPage,
  getSignInPage,
  getChangePasswordPage,
  getAddPCPage,
  getEditPCNamePage,
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
  onShowPCsSuccess,
  onShowPCsFailure,
  editPCNameSuccess,
  editPCNameFailure,
  deletePCSuccess,
  deletePCFailure,
  showPCSuccess,
  showPCFailure
}
