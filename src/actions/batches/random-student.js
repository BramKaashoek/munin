export const RANDOM_STUDENT = 'RANDOM_STUDENT'

export default (students, batchId, batchNumber) => {
  return (dispatch) => {

  function getStudent(category){
    if (category < 3){
      const selected = selectFromColor(0)
      if (selected.length === 0){
        const newCat = Math.floor(Math.random() * 3) + 3
        return getStudent(newCat)
      }
      return buildStudent(selected)
    } else if (category < 5) {
      const selected = selectFromColor(1)
      if (selected.length === 0){
        const newCat = 5
        return getStudent(newCat)
      }
      return buildStudent(selected)
    } else {
      const selected = selectFromColor(2)
      if (selected.length === 0){
        return null
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

  const firstCategory = Math.floor(Math.random() * 6)
  const student = getStudent(firstCategory)

    dispatch({
      type: RANDOM_STUDENT,
      payload: student
    })
  }
}
