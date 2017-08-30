let currentGameArray = ['', '', '', '', '', '', '', '', '']
let accumulator = 0
const character = 'X'
const fillArray = function (i) {
  if (currentGameArray[i] !== 'X' && 'O') {
    currentGameArray[i] = character
    accumulator += 1
  } else {
    console.log('Please choose another square.')
  }
}
