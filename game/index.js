import { Map } from 'immutable'

//Empty Initial Board
const board = Map()

const move = function (aTurn, coor) {
  //Makes Move Action Object
  const action = {
    type: 'move', //Type
    turn: aTurn, //Player
    name: coor, //Position
    message: `${aTurn}'s move (row,col):` //Message Of Move
  }
  return action
}

//Exporting Reducer for Redux
function reducer(state = { board, turn: 'X' }, action) {
  switch (action.type) {
    case 'move':
      state.board = state.board.setIn(action.name, action.turn)
      if (state.turn === 'X') {
        state.turn = 'O'
      } else {
        state.turn = 'X'
      }
      return state
    default:
      return state
  }
}

export { reducer, move }
