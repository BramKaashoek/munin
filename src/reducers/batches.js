// src/reducers/batches.js
import { FETCHED_BATCHES } from '../actions/batches/fetch'
import {
  BATCH_CREATED,
  BATCH_UPDATED,
  BATCH_REMOVED
} from '../actions/batches/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [ ...payload ]

    case BATCH_CREATED :
      const newRecipe = { ...payload }
      return [newRecipe].concat(state)

    case BATCH_UPDATED :
      return state.map((recipe) => {
        if (recipe._id === payload._id) {
          return { ...payload }
        }
        return recipe
      })

    case BATCH_REMOVED :
        return state.filter((recipe) => (recipe._id !== payload._id))

    default :
      return state

  }
}
