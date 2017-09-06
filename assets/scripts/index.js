'use strict'

const setAPIOrigin = require('../../spec/lib/set-api-origin')
const config = require('../../config')
const getFormFields = require('../../spec/lib/get-form-fields')
const userApi = require('./api.js')
const userUi = require('./ui.js')
const store = require('./store')

$(() => {
  setAPIOrigin(location, config)
  const resetAll = function () {
    accumulator = 2
    character = 'X'
    currentGameArray = [null, null, null, null, null, null, null, null, null]
    xArray = []
    oArray = []
    $("#wrapper").children().on("click")
  }
  let currentGameArray = [null, null, null, null, null, null, null, null, null]
  let accumulator = 2
  let character = 'X'
  const turnChange = function () {
    if (accumulator % 2 === 0) {
      character = 'X'
      $('.turn').text('X is up!')
    } else {
      character = 'O'
      $('.turn').text('O is up!')
    }
  }

  const fillArray = function (currentID) {
    if (currentGameArray[currentID] === null) {
      accumulator += 1
      turnChange()
      currentGameArray[currentID] = character
      updateGame(currentID)
    } else {
      console.log('Please choose another square.')
    }
  }
  let indexID
  let currentID
  let xArray = []
  let oArray = []
  $("#wrapper").children().hide()
  $("#wrapper").children().on("click", function (event) {
    //console.log($(event.target).attr('id'))
    currentID = $(event.target).attr('id')
    indexID = $(event.target).attr('id')
    $(event.target).text(character)
    fillArray(currentID)
    //console.log(character)

    // $(event.target).
    let currentArray
    let notNull = function (element) {
      return element !== null
    }
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
    const solSet = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"], ["2", "5", "8"], ["1", "4", "7"],
      ["0", "3", "6"], ["0", "4", "8"], ["2", "4", "6"]]
    solSet.forEach(function (winningCombination) {
      let thisVar = winningCombination.every(function (i) {
        //console.log(xArray.includes(i))
        //console.log(currentArray)
        return currentArray.includes(i)
      })
      if (thisVar === true && accumulator % 2 === 0)
      {console.log('O is the winner!')
        $(".turn").text('O is the winner!')
        $("#wrapper").children().off("click")
      } else if (thisVar === true && accumulator % 2 === 1) {
        console.log('X is the winner!')
        $(".turn").text('X is the winner!')
        $("#wrapper").children().off("click")
        //store.game = nowGame
        console.log(store.game)
      } else if (currentGameArray.every(notNull) && accumulator === 11) {
        console.log('draw!')
      }
    })
  })

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
  const changePassword = function (event) {
    event.preventDefault()
    const data = getFormFields(this)
    console.log('index.js' + data)
    userApi.changePassword(data)
      .then(userUi.changeSuccess)
      .catch(userUi.changeFailure)
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
      "game": {
        "cell": {
          "index": indexID,
          "value": $("#wrapper").children().html()
        },
        "over": false
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
  $('#sign-up').on('submit', signUp)
  $('#sign-in').on('submit', signIn)
  $('#change-password').on('submit', changePassword)
  $('#sign-out').on('submit', signOut)
  $('#sign-out').hide()
  $('#new').hide()
  $('#new').on('submit', createNewGame)
  $('#new').on('submit', resetAll)
  $('#fetch').on('submit', getGames)
  module.exports = {
    //resetAll
  }
}
)
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
