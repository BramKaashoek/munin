export const RANDOM_STUDENT = 'RANDOM_STUDENT'

export default (students, batchId, batchNumber) => {
  return (dispatch) => {
  const evalArray = students.map((s) => s.evaluations[s.evaluations.length - 1].color)
  let weightedStudents = []
  for ( var t = 0; t < (students.length); t++ ){
    for ( var i = evalArray[t]; i >= 0; i-- ){
      weightedStudents = weightedStudents.concat(students[t])
    }
  }
  const student = weightedStudents[Math.floor(Math.random() * (weightedStudents.length))]
  student.batchId = batchId
  student.batchNumber = batchNumber

    dispatch({
      type: RANDOM_STUDENT,
      payload: student
    })
  }
}
