'use strict'
const store = require('./store')
const index = require('./index')

const onSignUpSuccess = function (data) {
  $('.turn').text('user created! please sign in to play')
}
const onSignUpFailure = function (data) {
  $('.sign-up-success').text('something went wrong, please try again')
}
const onSignInSuccess = function (data) {
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#new').show()
  $('#changepassword').show()
  $('#fetch').show()
  $('.turn').text('Please click new game to start.')
  $('#wrapper').children().show()
  $('.stats').show()
  store.user = data.user
  store.token = data.user.token
  store.id = data.user.id
  store.game = data.game // this
}
const onSignInFailure = function (data) {
  $('.sign-up-success').text('oops, something went wrong. please try again')
}
const changeSuccess = function (data) {
  $('.turn').text('pw changed')
}
const changeFailure = function (data) {
  $('.turn').text('fail. try again')
}
const signOutSuccess = function (data) {
  $('.turn').text('signed out, please sign in to play')
  $('#wrapper').children().hide().off()
  $('#wrapper').children().text('')
  $('#change-password').hide()
  $('#sign-in').show()
  $('#sign-up').show()
  $('#new').hide()
  $('#fetch').hide()
  $('.stats').hide()
  $('.stats').text('')
  $('#sign-out').hide()
}
const signOutFailure = function (data) {
  $('.turn').text('something went wrong')
}
const newGameSuccess = function (data) {
  store.game = data.game
  store.gameActive = true
  store.game.over = false//-------------------aa
  //index.currentGameArray = [null, null, null, null, null, null, null, null, null]
  //console.log(index.currentGameArray)
  //index.accumulator = 2
  $('#wrapper').children().text('')
  $('.turn').text('New game! X is up!')
}
const onGetSuccess = function (data) {
  const myStats = data.games
  $('.stats').text('You have played ' + data.games.length + ' games!')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  changeSuccess,
  changeFailure,
  signOutSuccess,
  signOutFailure,
  newGameSuccess,
  onGetSuccess
}
