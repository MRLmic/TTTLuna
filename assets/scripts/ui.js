'use strict'
const store = require('./store')
const index = require('./index')

const onSignUpSuccess = function (data) {
  $('.sign-up-success').text('user created!')
  console.log('success!')
  console.log(data)
}
const onSignUpFailure = function (data) {
  $('.sign-up-success').text('user name taken, please choose another')
  console.log('nope')
}
const onSignInSuccess = function (data) {
  $('.sign-up-success').text('signed in')
  console.log('sign in success')
  console.log(data)
  $('#sign-out').show()
  $('#new').show()
  $('#change-password').show()
  $('#fetch').show()
  $('.turn').text('Please click new game to start.')
  $('#wrapper').children().show()
  $('.stats').show()
  store.user = data.user
  store.token = data.user.token
  store.id = data.user.id
  console.log(store)
}
const onSignInFailure = function (data) {
  $('.sign-up-success').text('oops, something went wrong. please try again')
}
const changeSuccess = function (data) {
  $('.sign-up-success').text('pw changed')
}
const changeFailure = function (data) {
  $('.sign-up-success').text('fail. try again')
}
const signOutSuccess = function (data) {
  $('.sign-up-success').text('signed out')
  $('#wrapper').children().hide()
  $('#change-password').hide()
  $('#new').hide()
  $('#fetch').hide()
  $('.stats').hide()
}
const signOutFailure = function (data) {
  $('.sign-up-success').text('something went wrong')
}
const newGameSuccess = function (data) {
  store.gameActive = true
  console.log(store.gameActive)
  console.log('new game created')
  console.log(data)
  // index.resetAll()
  // while (index.xArray.length > 0) {
  //
  //   index.xArray.pop()
  // }
  // while (index.oArray.length > 0) {
  //   index.oArray.pop()
  // }
  // while (index.currentArray.length > 0) {
  //   index.currentArray.pop()
  // }
  // index.xArray = []
  // index.oArray = []
  // index.currentArray = []
//console.log(index.currentArray)
  //store.game.id = data.game.id
  store.game = data.game
  //index.currentGameArray = [null, null, null, null, null, null, null, null, null]
  //console.log(index.currentGameArray)
  //index.accumulator = 2
  $('#wrapper').children().text('')
  $('.turn').text('New game! X is up!')
}
const onGetSuccess = function (data) {
  console.log(data.games)
  const myStats = data.games
  console.log(data.games.length)
  $('.stats').text('You have played ' + data.games.length + ' games!')
  //let stats = JSON.stringify(data.games)
//$('.stats info here').myStats.toString()
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
