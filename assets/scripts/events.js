let currentGameArray = ['', '', '', '', '', '', '', '', '']
let accumulator = 2
let character = 'X'
const fillArray = function (i) {
  if (currentGameArray[i] === '') {
    accumulator += 1
    currentGameArray[i] = character
  } else {
    console.log('Please choose another square.')
  }
  turnChange()
}
const turnChange = function () {
  if (accumulator % 2 === 0) {
    character = 'X'
    console.log('X is up!')
  } else {
    character = 'O'
    console.log('O is up!')
  }
}
