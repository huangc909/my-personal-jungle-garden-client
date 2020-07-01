'use strict'

const config = require('./../config')
const store = require('./../store')

const signUp = function (formData) {
  console.log(formData)
  const credentials = formData.credentials
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: {credentials}
  })
}

const signIn = function (formData) {
  console.log(formData)
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data: {
      credentials: {
        email: formData.credentials.email,
        password: formData.credentials.password
      }
    }
  })
}

const changePassword = function (formData) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      passwords: {
        old: formData.passwords.old,
        new: formData.passwords.new
      }
    }
  })
}

const signOut = function (formData) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
