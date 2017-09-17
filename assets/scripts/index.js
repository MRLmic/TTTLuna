'use strict'

const setAPIOrigin = require('../../spec/lib/set-api-origin')
const config = require('../../config')
const getFormFields = require('../../spec/lib/get-form-fields')
const userApi = require('./api.js')
const userUi = require('./ui.js')
const store = require('./store')

let currentGameArray = [null, null, null, null, null, null, null, null, null]
let accumulator = 2
let character = 'X'
let indexID
let currentID
let currentArray
let xArray = []
let oArray = []
let turn = 'X'
let gameOver = false
let gameActive = false

// Resetting all arrays, character to X, called on
const resetAll = function () {
  accumulator = 2
  character = 'X'
  currentGameArray = [null, null, null, null, null, null, null, null, null]
  xArray = []
  oArray = []
  currentArray = []
  gameActive = true
  $('#wrapper').children().off()
  gameOver = false
  startOrNah()
}

// Filling in X or O to square depending on modulo result
const turnChange = function () {
  if (accumulator % 2 === 0) {
    character = 'O'
    turn = 'X'
    $('.turn').text('O is up!')
    updateGame(indexID, turn, gameOver)
  } else {
    character = 'X'
    turn = 'O'
    $('.turn').text('X is up!')
    updateGame(indexID, turn, gameOver)
  }
  accumulator += 1
}

const fillArray = function (currentID) {
  if (currentGameArray[currentID] === null) {
    currentGameArray[currentID] = character
    $(event.target).text(character)
    turnChange()
  } else {
    $('.turn').text('Square taken. Please choose another square.')
  }
}
const startOrNah = function () {
if (gameActive === true) {
$('#wrapper').children().on('click', function (event) {
  currentID = $(event.target).attr('id')
  indexID = $(event.target).attr('id')
  fillArray(currentID)

if (character === 'O') {
  xArray.push(currentID)
  currentArray = xArray
  xArray.sort()
} else {
  oArray.push(currentID)
  currentArray = oArray
  oArray.sort()
}
// Check to see if currentArray contains winning combination of indeces
const solSet = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['2', '5', '8'], ['1', '4', '7'],
  ['0', '3', '6'], ['0', '4', '8'], ['2', '4', '6']]
solSet.forEach(function (winningCombination) {
  const thisVar = winningCombination.every(function (i) {
    return currentArray.includes(i)
  })
  // Depending on modulo declare correct winner when above function results true
  if (thisVar === true && accumulator % 2 === 0) {
    $('.turn').text('O is the winner!')
    gameOver = true
    gameActive = false
    store.game.over = true
    currentArray = []
    $('#wrapper').children().off()
    updateGame(indexID, turn, gameOver)
  } else if (thisVar === true && accumulator % 2 === 1) {
    $('.turn').text('X is the winner!')
    gameOver = true
    gameActive = false
    store.game.over = true
    $('#wrapper').children().off()
    updateGame(indexID, turn, gameOver)
  } else if (thisVar === false && accumulator === 11) {
    $('.turn').text('draw!')
    $('#wrapper').children().off()
    store.game.over = true
    currentArray = []
    gameOver = true
    gameActive = false
    updateGame(indexID, turn, gameOver)
    return
  }
})})
}}
// API calls
const changePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.changePassword(data)
    .then(userUi.changeSuccess)
    .then($(this).trigger('reset'))
    .catch(userUi.changeFailure)

}
const signUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.create(data)
    .then(userUi.onSignUpSuccess)
    .catch(userUi.onSignUpFailure)
}
const signIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.logIn(data)
    .then(userUi.onSignInSuccess)
    .catch(userUi.onSignInFailure)
}
const signOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.signOut(data)
    .then(userUi.signOutSuccess)
    .catch(userUi.signOutFailure)
}
const createNewGame = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.newGame(data)
    .then(userUi.newGameSuccess)
}
const updateGame = function (indexID, turn, gameOver) {
  const data = {
    'game': {
      'cell': {
        'index': indexID,
        'value': turn
      },
      'over': gameOver
    }
  }
  userApi.update(data)
}
const getGames = function (event) {
  event.preventDefault()
  userApi.get()
    .then(userUi.onGetSuccess)
}
const resetForms = function () {
  document.getElementById('#sign-in').reset()
}
const resetFormsSignUp = function () {
  document.getElementById('#sign-up').reset()
}
// const changePWFunction = function() {
//   event.preventDefault()
//   $('#change-password').hide()
//   $('#changepassword').show()
// }
$(() => {
  setAPIOrigin(location, config)
  $('#sign-up').on('submit', signUp)
  $('#sign-in').on('submit', signIn)
  $('#sign-out').on('submit', resetForms)
  $('#sign-out').on('submit', resetFormsSignUp)
  $('#changepassword').on('submit', changePassword)
  $('#changepassword').hide()
  $('#sign-out').on('submit', signOut)
  $('#sign-out').hide()
  $('#new').hide()
  $('#new').on('submit', createNewGame)
  $('#new').on('submit', resetAll)
  $('#fetch').on('submit', getGames)
  $('#fetch').hide()
  $('.stats').hide()
  $('.turn').text('Please log in or sign up.')
  // $('#change-password').on('submit', changePWFunction)
}
)
module.exports = {
}
