'use strict'

const store = require('./../store')
const showPlantCollectionsTemplate = require('../templates/plant-collection-listing.handlebars')

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

const addPlantCollectionSuccess = function (data) {
// Upon CREATE success, the collection name will be updated if a new name is entered; otherwise the default name will be shown
// the page that shows up is the newly created plant collection page
// and has the updated name or default Name
  $('form').trigger('reset')
  $('#message').text('Add Plant Collection success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  $('.plant-collection').show()

  const newPlantCollection = (`
    <h3>${data.plantCollection.name}</h3>
    `)
  $('.collection-name').append(newPlantCollection)
}

const addPlantCollectionFailure = function () {
  $('#message').text('Add Collection Failed')
  $('#message').removeClass().addClass('failure')
}

const showPlantCollectionsSuccess = function (data) {
  console.log(data)
  $('form').trigger('reset')
  $('#message').text('Show Plant Collection success!').show()
  $('#message').removeClass().addClass('success')
  $('#message').delay(600).fadeOut(1500)
  const showPlantCollectionsHtml = showPlantCollectionsTemplate({ plantCollections: data.plantCollections })
  $('.content-plant-collections').append(showPlantCollectionsHtml)
}

const showPlantCollectionsFailure = function () {
  $('#message').text('Get Collections Failed')
  $('#message').removeClass().addClass('failure')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  addPlantCollectionSuccess,
  addPlantCollectionFailure,
  showPlantCollectionsSuccess,
  showPlantCollectionsFailure
}