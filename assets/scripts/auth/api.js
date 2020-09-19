'use strict'

const config = require('./../config')
const store = require('./../store')

const signUp = function (formData) {
  const credentials = formData.credentials
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data: {credentials}
  })
}

const signIn = function (formData) {
  // console.log(formData)
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

const addPlantCollection = function (formData) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/plantCollections',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plantCollection: {
        name: formData.plantCollection.name,
        owner: store.user._id
      }
    }
  })
}

const showPlantCollections = function (formData) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/plantCollections',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plantCollection: {
        owner: store.user._id
      }
    }
  })
}

const editCollectionName = function (formData) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plantCollection: {
        name: formData.plantCollection.name,
        owner: store.user._id
      }
    }
  })
}

const editPlant = function (formData) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + store.plant._id,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plant: {
        name: formData.plant.name,
        nickName: formData.plant.nickName,
        dateAcquired: formData.plant.dateAcquired,
        additionalNotes: formData.plant.additionalNotes,
        log: formData.plant.log,
        owner: store.user._id
      }
    }
  })
}

const deletePlantCollection = function (pcId) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/plantCollections/' + pcId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const deletePlant = function (plantId) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/plants/' + plantId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plant: {
        plantCollectionId: store.plantCollection._id
      }
    }
  })
}

const getPCPage = function (pcId) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/plantCollections/' + pcId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plantCollection: {
        owner: store.user._id
      }
    }
  })
}

const getPlantPage = function (plantId) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + plantId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plantCollection: {
        owner: store.user._id
      }
    }
  })
}

const addPlant = function (formData) {
  // console.log(formData)
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/plants',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      plant: {
        name: formData.plant.name,
        nickName: formData.plant.nickName,
        dateAcquired: formData.plant.dateAcquired,
        additionalNotes: formData.plant.additionalNotes,
        plantCollectionId: store.plantCollection._id,
        owner: store.user._id
      }
    }
  })
}

const addLog = function (formData) {
  // console.log(formData)
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + store.plant._id + '/logs',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      log: {
        date: formData.log.date,
        entry: formData.log.entry
        // plantCollectionId: pcId,
        // plantId: plantId
      }
    }
  })
}

const getLog = function (logId) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + store.plant._id + '/logs/' + logId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const editLog = function (formData) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + store.plant._id + '/logs/' + store.log._id,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      log: {
        date: formData.log.date,
        entry: formData.log.entry
      }
    }
  })
}

const deleteLog = function (logId) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/plantCollections/' + store.plantCollection._id + '/plants/' + store.plant._id + '/logs/' + logId,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  addPlantCollection,
  showPlantCollections,
  editCollectionName,
  deletePlantCollection,
  getPCPage,
  addPlant,
  deletePlant,
  getPlantPage,
  editPlant,
  addLog,
  getLog,
  editLog,
  deleteLog
}
