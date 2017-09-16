'use strict'

const setAPIOrigin = require('../../spec/lib/set-api-origin')
const config = require('../../config')
const getFormFields = require('../../spec/lib/get-form-fields')
const userApi = require('./api.js')
const userUi = require('./ui.js')
const store = require('./store')
// const gameActive = false
// store.gameActive = gameActive

let currentGameArray = [null, null, null, null, null, null, null, null, null]
let accumulator = 2
let character = 'X'
let indexID
let currentID
let currentArray
let xArray = []
let oArray = []
// let winner = false
// let gameOver = false
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
  // gameOver = false
  startOrNah()
}

// Filling in X or O to square depending on modulo result
const turnChange = function () {
  if (accumulator % 2 === 0) {
    character = 'O'
    $('.turn').text('O is up!')
    updateGame(currentID)
  } else {
    character = 'X'
    $('.turn').text('X is up!')
    updateGame(currentID)
  }
  accumulator += 1
  console.log(accumulator)
  // console.log('this' + accumulator)
}

const fillArray = function (currentID) {
  if (currentGameArray[currentID] === null) {
    // console.log(currentGameArray)
    currentGameArray[currentID] = character
    $(event.target).text(character)
    turnChange()
    console.log(currentGameArray)
    //updateGame(currentID) //-------------------------------
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
  console.log(currentArray)
  xArray.sort()
  // console.log(xArray)
} else {
  oArray.push(currentID)
  currentArray = oArray
  // console.log(oArray)
  console.log(currentArray)
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
    console.log('O is the winner!')
    $('.turn').text('O is the winner!')
    // gameOver = true
    gameActive = false
    store.game.over = true
    updateGame()
    currentArray = []
    $('#wrapper').children().off()
    // startOrNah()
    // $('#wrapper').children().off('click')
  } else if (thisVar === true && accumulator % 2 === 1) {
    console.log('X is the winner!')
    $('.turn').text('X is the winner!')
    // gameOver = true
    gameActive = false
    store.game.over = true
    updateGame()
    $('#wrapper').children().off()
    // startOrNah()
  } else if (thisVar === false && accumulator === 11) {
    $('.turn').text('draw!')
    $('#wrapper').children().off()
    store.game.over = true
    updateGame()
    currentArray = []
    // gameOver = true
    gameActive = false
    return
  }
})})
}}
// API calls
const changePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('index.js' + data)
  userApi.changePassword(data)
    .then(userUi.changeSuccess)
    .catch(userUi.changeFailure)
}
const signUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  userApi.create(data)
    .then(userUi.onSignUpSuccess)
    .catch(userUi.onSignUpFailure)
}
const signIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
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
    .catch(console.log('no'))
}
const updateGame = function (currentID) {
  const data = {
    'game': {
      'cell': {
        'index': currentID,
        'value': $('#wrapper').children().html()
      },
      'over': store.game.over
    }
  }
  userApi.update(data)
    .then(console.log('update game just worked'))
}
const getGames = function (event) {
  event.preventDefault()
  userApi.get()
    .then(userUi.onGetSuccess)
    .catch(console.log('api get function not working'))
}
const resetForms = function () {
  document.getElementById('#sign-in').reset()
}
const resetFormsSignUp = function () {
  document.getElementById('#sign-up').reset()
}

$(() => {
  setAPIOrigin(location, config)
  $('#sign-up').on('submit', signUp)
  $('#sign-in').on('submit', signIn)
  $('#sign-out').on('submit', resetForms)
  $('#sign-out').on('submit', resetFormsSignUp)
  $('#change-password').on('submit', changePassword)
  $('#sign-out').on('submit', signOut)
  $('#sign-out').hide()
  $('#new').hide()
  $('#new').on('submit', createNewGame)
  $('#new').on('submit', resetAll)
  $('#fetch').on('submit', getGames)
  $('#change-password').hide()
  $('#fetch').hide()
  $('.stats').hide()
  $('.turn').text('Please log in or sign up.')
}
)
module.exports = {
  resetAll
}
// const needFunctions = require('./events')
// $(() => {
//   setAPIOrigin(location, config)
// })
//
// // use require with a reference to bundle the file and use it in this file
// // const example = require('./example')
//
// // use require without a reference to ensure a file is bundled
// // require('./example')
// let currentID
// $("#wrapper").children().on("click", function (event) {
//   console.log($(event.target).attr('id'))
//   currentID = $(event.target).attr('id')
//   needFunctions.fillArray(currentID)
//   console.log(needFunctions.character)
//   $(event.target).text(needFunctions.character)
// })
//
// module.exports = {
//   currentID
// }
// $(() => {
//   setAPIOrigin(location, config)
// })
// wrap it all in an onPageLoad
