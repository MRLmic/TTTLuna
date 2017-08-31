'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
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
$(() => {
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
      console.log(currentID)
      currentGameArray[currentID] = character
    } else {
      console.log('Please choose another square.')
    }
  }

  let currentID
  $("#wrapper").children().on("click", function (event) {
    console.log($(event.target).attr('id'))
    currentID = $(event.target).attr('id')
    $(event.target).text(character)
    fillArray(currentID)
    console.log(character)
  })
})
