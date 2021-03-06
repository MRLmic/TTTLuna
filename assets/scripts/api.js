const config = require('../../config')
const store = require('./store')

const create = function (data) {
  console.log('reached create function')
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data
  })
}
const logIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}
const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}
const signOut = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}
const newGame = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}
const update = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}
const get = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}
module.exports = {
  create,
  logIn,
  changePassword,
  signOut,
  newGame,
  update,
  get
}
