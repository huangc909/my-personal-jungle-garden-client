'use strict'

const store = require('./../store')

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
