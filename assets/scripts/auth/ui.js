'use strict'

const store = require('./../store')

const showPlantInfoTemplate = require('../templates/plant-info.handlebars')

// Plant Collections

const getDeletePlantButtons = () => {
  $('.delete-plant-button').show()
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

  store.plant = response.plant

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

  if (store.plant.logs.length === 0) {
    $('.get-edit-log-buttons').hide()
  } else {
    $('.get-edit-log-buttons').show()
  }
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
