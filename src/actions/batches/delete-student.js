//src/actions/batches/delete-student.js

import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading/loading'

export const DELETED_STUDENT = 'DELETED_STUDENT'

const api = new API()

export default (batchId, studentId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    const backend = api.service('batches')

    api.app.authenticate()
    .then(() => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({ type: APP_LOADING })
      backend.patch(batchId, { studentId: studentId, removeStudent: true })
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: DELETED_STUDENT,
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
