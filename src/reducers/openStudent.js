//src/reducers/openStudent.js
import { OPEN_STUDENT } from '../actions/batches/open-student'
import { CLOSE_STUDENT } from '../actions/batches/close-student'
import { RANDOM_STUDENT } from '../actions/batches/random-student'

export default (state = null, { type, payload } = {}) => {
  switch(type){

    case OPEN_STUDENT :
      return payload

    case RANDOM_STUDENT :
      return payload

    case CLOSE_STUDENT :
      return null

    default :
      return state
  }
}
