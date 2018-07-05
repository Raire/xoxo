import { Map } from 'immutable'

//Empty Initial Board
const board = Map()

const winstates = {
  top: ['tl', 'tm', 'tr'],
  mid: ['ml', 'mm', 'mr'],
  bot: ['bl', 'bm', 'br'],
  left: ['ll', 'lm', 'lr'],
  center: ['cl', 'cm', 'cr'],
  right: ['rl', 'rm', 'rr'],
  tb: ['tt', 'cc', 'bb'],
  bt: ['bb', 'cc', 'tt'],
}

const checkHoz = function (move, player) {
  switch (move[0]) {
    case 0:
      winstates.top[move[1]] = player
      return winstates.top.every(elem => { return elem === player })
    case 1:
      winstates.mid[move[1]] = player
      return winstates.mid.every(elem => { return elem === player })
    case 2:
      winstates.bot[move[1]] = player
      return winstates.bot.every(elem => { return elem === player })
    default:
      return false
  }
}

const checkVer = function (move, player) {
  switch (move[1]) {
    case 0:
      winstates.left[move[0]] = player
      return winstates.left.every(elem => { return elem === player })
    case 1:
      winstates.center[move[0]] = player
      return winstates.center.every(elem => { return elem === player })
    case 2:
      winstates.right[move[0]] = player
      return winstates.right.every(elem => { return elem === player })
    default:
      return false
  }
}

const checkDaiTB = function (move, player) {
  switch (move[0]) {
    case 0:
      if (move[1] === 0) winstates.tb[0] = player
      return winstates.tb.every(elem => { return elem === player })
    case 1:
      if (move[1] === 1) winstates.tb[1] = player
      return winstates.tb.every(elem => { return elem === player })
    case 2:
      if (move[1] === 2) winstates.tb[2] = player
      return winstates.tb.every(elem => { return elem === player })
    default:
      return false
  }
}

const checkDaiBT = function (move, player) {
  switch (move[0]) {
    case 0:
      if (move[1] === 2) winstates.bt[0] = player
      return winstates.bt.every(elem => { return elem === player })
    case 1:
      if (move[1] === 1) winstates.bt[1] = player
      return winstates.bt.every(elem => { return elem === player })
    case 2:
      if (move[1] === 0) winstates.bt[2] = player
      return winstates.bt.every(elem => { return elem === player })
    default:
      return false
  }
}

const move = function (aTurn, coor) {
  //Makes Move Action Object
  const action = {
    type: 'move', //Type
    turn: aTurn, //Player
    name: coor, //Position
    message: `${aTurn} Move: ${coor}` //Message Of Move
  }
  return action
}

const errorCheck = function (action) {
  //Checks Action For Legit Inputs, Between 0 & 2
  let isBad = false
  action.name.forEach(element => {
    if (element < 0 || element > 2) {
      isBad = true
    }
  })
  return isBad
}

//Exporting Reducer for Redux
function reducer(state = { board, turn: 'X', winner: null }, action) {
  switch (action.type) {
    case 'move':
      if (errorCheck(action)) {
        console.log(action.message + ' Is Invalid')
        return state
      }

      if (!state.board.getIn(action.name)) {
        state.board = state.board.setIn(action.name, action.turn)
      } else {
        console.log(action.message + ' Is Invalid, Position Is Filled')
        return state
      }

      //Check Conditions
      if (checkHoz(action.name, state.turn) || checkVer(action.name, state.turn) || checkDaiTB(action.name, state.turn) || checkDaiBT(action.name, state.turn)) {
        state.winner = action.turn
      }
      //Swap Players
      if (state.turn === 'X') {
        state.turn = 'O'
      } else {
        state.turn = 'X'
      }
      console.log(action.message)
      return state

    default:
      return state
  }
}

export { reducer, move }
