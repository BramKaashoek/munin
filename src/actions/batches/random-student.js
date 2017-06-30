export const RANDOM_STUDENT = 'RANDOM_STUDENT'

export default (students, batchId, batchNumber) => {
  return (dispatch) => {

  function getStudent(){
    const category = Math.floor(Math.random() * 6)
    if (category < 3){
      const selected = selectFromColor(0)
      if (selected.length === 0){
        return getStudent()
      }
      return buildStudent(selected)
    } else if (category < 5) {
      const selected = selectFromColor(1)
      if (selected.length === 0){
        return getStudent()
      }
      return buildStudent(selected)
    } else {
      const selected = selectFromColor(2)
      if (selected.length === 0){
        return getStudent()
      }
      return buildStudent(selected)
    }
  }

  function selectFromColor(color){
    return students.filter((s) => { return s.evaluations[s.evaluations.length - 1].color === color })
  }

  function buildStudent(selected){
    const student = selected[Math.floor(Math.random() * selected.length)]
    student.batchId = batchId
    student.batchNumber = batchNumber
    return student
  }

  const AnyEvaluated = students.find((s) => {
    const lastEvalCol = s.evaluations[s.evaluations.length-1].color
    if (lastEvalCol === 0 || lastEvalCol === 1 || lastEvalCol === 2){
      return true
    }
  })

console.log(AnyEvaluated)
  const student = AnyEvaluated === undefined ? null : getStudent()

    dispatch({
      type: RANDOM_STUDENT,
      payload: student
    })
  }
}
