//src/actions/batches/save-batch.js
import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading/loading'

export const CREATED_BATCH = 'CREATED_BATCH'

const api = new API()

export default (newBatch, createNewBatch) => {
  return (dispatch) => {
    const backend = api.service('batches')

    dispatch({ type: APP_LOADING })

    api.app.authenticate()
    .then(()=>{
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({ type: APP_LOADING })
      backend.create(newBatch)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: CREATED_BATCH })
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
