'use strict'

const api = require('./api')
const store = require('./../store')
const showTemplate = require('../templates/plant-collection-listings.handlebars')
const showPCTemplate = require('../templates/plant-collection.handlebars')

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

const showDemoPCsSuccess = function (data) {
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
  $('.demochangepw').hide()

  if (store.plantCollections.length > 0) {
    let pcId = '0'

    store.plantCollections.map(pcItem => {
      pcId = pcItem._id
      api.deletePlantCollection(pcId)
    })

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
        <h2 class="header-title">My Plant Collections</h2>
        `)
      $('.my-pc-collections').html(myPlantCollections).hide()
      $('.get-delete-pc-buttons').show()
    }
  } else {
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
        <h2 class="header-title">My Plant Collections</h2>
        `)
      $('.my-pc-collections').html(myPlantCollections).hide()
      $('.get-delete-pc-buttons').show()
    }
  }
}

const showDemoPCsFailure = function () {
  $('#message').text('Get Collections Failed')
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
  $('.demochangepw').hide()

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
      <h2 class="header-title">My Plant Collections</h2>
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
      <h2 class="pc header-title">${store.plantCollection.name}</h2>
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

  if (store.plantCollection.plants.length === 0) {
    $('.get-delete-plant-buttons').hide()
    const myPlants = (`
      <h2 class="pc header-title">${store.plantCollection.name}</h2>
      <p>You currently have no plants. Add one!
      `)
    $('.content-plants').html(myPlants).show()
  } else {
    $('.get-delete-plant-buttons').show()
  }
}

const editPCNameFailure = function () {
  $('#message').text('Edit Plant Collection Name Failed')
  $('#message').removeClass().addClass('failure')
  $('#message').delay(600).fadeOut(1500)
}

const getDeletePCButtons = () => {
  $('.delete-pc-button').show()
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

module.exports = {
  getAddPCPage,
  addPCSuccess,
  addPCFailure,
  showDemoPCsSuccess,
  showDemoPCsFailure,
  showPCsSuccess,
  showPCsFailure,
  showPCSuccess,
  showPCFailure,
  getEditPCNamePage,
  editPCNameSuccess,
  editPCNameFailure,
  getDeletePCButtons,
  deletePCSuccess,
  deletePCFailure
}
