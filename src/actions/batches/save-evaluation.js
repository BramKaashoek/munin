import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading/loading'

export const SAVED_EVALUATION = 'SAVED_EVALUATION'

const api = new API()

export default (evaluation) => {
  return (dispatch) => {
    const backend = api.service('batches')

    dispatch({ type: APP_LOADING })

    api.app.authenticate()
    .then(() => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({ type: APP_LOADING })
      backend.patch(evaluation.batchId, { evaluation })
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: SAVED_EVALUATION,
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
    })
    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
