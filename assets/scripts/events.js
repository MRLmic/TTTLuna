let currentGameArray = ['', '', '', '', '', '', '', '', '']
let accumulator = 0
let character
const fillArray = function (i) {
  if (currentGameArray[i] === '') {
    currentGameArray[i] = character
    accumulator += 1
  } else {
    console.log('Please choose another square.')
  }
  turnChange()
}
const turnChange = function () {
  if (accumulator % 2 === 0) {
    character = 'X'
  } else { character = 'O' }
}
