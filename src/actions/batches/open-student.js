//src/actions/batches/open-student.js
export const OPEN_STUDENT = 'OPEN_STUDENT'

export default (studentId) => ({
  type: OPEN_STUDENT,
  payload: studentId
})
