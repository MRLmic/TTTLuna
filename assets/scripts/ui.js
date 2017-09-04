'use strict'
const store = require('./store')

const onSignUpSuccess = function (data) {
  $(".sign-up-success").text('user created!')
  console.log('success!')
  console.log(data)
}
const onSignUpFailure = function (data) {
  $(".sign-up-success").text('user name taken, please choose another')
  console.log('nope')
}
const onSignInSuccess = function (data) {
  $(".sign-in-success").text('signed in')
  console.log('sign in success')
  console.log(data)
  store.token = data.user.token
  store.id = data.user.id
  console.log(store)
}
const onSignInFailure = function (data) {
  $(".sign-in-success").text('oops, something went wrong. please try again')
}
const changeSuccess = function (data) {
  $(".change-password-message").text('pw changed')
}
const changeFailure = function (data) {
  $(".change-password-message").text('fail. try again')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  changeSuccess,
  changeFailure
}
