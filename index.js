import inquirer from 'inquirer'

import { reducer, move } from './game'
import { createStore } from 'redux'


// Create the store
const game = createStore(reducer)

const printBoard = () => {
  const { board } = game.getState()
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], '_'))
    }
    process.stdout.write('\n')
  }
}

const printWinner = () => {
  const { winner } = game.getState()
  if (winner) {
    console.log(winner + ' Wins!')
    process.exit()
  }
}

const getInput = player => async () => {
  const { turn } = game.getState()
  if (turn !== player) return
  const ans = await inquirer.prompt([{
    type: 'input',
    name: 'coord',
    message: `${turn}'s move (row,col):`
  }])
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x)
  game.dispatch(move(turn, [row, col]))
}

// Debug: Print the state
// game.subscribe(() => console.log(game.getState()))

game.subscribe(printBoard)
game.subscribe(printWinner)
game.subscribe(getInput('X'))
game.subscribe(getInput('O'))

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: 'START' })
