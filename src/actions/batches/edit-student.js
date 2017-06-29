//src/actions/batches/delete-student.js

import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading/loading'

export const EDITED_STUDENT = 'EDITED_STUDENT'

const api = new API()

export default (newStudent) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    const backend = api.service('batches')

    api.app.authenticate().then(() => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({ type: APP_LOADING })
      backend.patch(newStudent.batchId, {editStudent: true, newStudent })
      .then(() => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: EDITED_STUDENT,
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
    ).catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
