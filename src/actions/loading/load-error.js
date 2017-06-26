//src/actions/loading/load-error.js

export const LOAD_ERROR = "LOAD_ERROR"

export default(error)  => ({
  type: LOAD_ERROR,
  payload: error
})
