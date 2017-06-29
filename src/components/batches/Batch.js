//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../../actions/batches/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import StudentItem from './StudentItem'
import closeStudent from '../../actions/batches/close-student'
import Student from './Student'
import AddStudent from './AddStudent'
import randomStudent from '../../actions/batches/random-student'
import './Batch.css'


import DatePicker from 'material-ui/DatePicker'

export class Batch extends PureComponent {
  constructor(props) {
    super()

    this.state = {
      addStudent: false
    }

    this.handleAddStudentClose = this.handleAddStudentClose.bind(this)
  }

  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    students: PropTypes.array.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }

  componentWillMount(){
    this.props.fetchBatches()
  }

  renderStudent(student, index){
    return ( <StudentItem batchId={this.props._id} batchNumber={this.props.batchNumber} key={index} { ...student } /> )
  }

  handleClose= () => {
    this.props.closeStudent()
  }

  randomNextStudent(){
    this.props.randomStudent(this.props.students, this.props._id, this.props.batchNumber)
  }

  addNewStudent(){
    this.props.addStudent()
  }

  handleAddStudentClose(){
    this.setState({
     addStudent: false
    })
  }

  handleAddStudentOpen(){
    this.setState({
      addStudent: true
    })
  }

  render(){
    if (!this.props._id) return null

    const {
      batchNumber,
      students,
    } = this.props

    const redTotal = students.reduce((prev, next) => { if (next.evaluations.length > 0 && next.evaluations[next.evaluations.length -1 ].color === 0){ return prev + 1 } return prev }, 0)
    const orangeTotal = students.reduce((prev, next) => { if (next.evaluations.length > 0 && next.evaluations[next.evaluations.length -1 ].color === 1 ){ return prev + 1 } return prev }, 0)
    const greenTotal = students.reduce((prev, next) => { if (next.evaluations.length > 0 && next.evaluations[next.evaluations.length -1 ].color === 2 ){ return prev + 1 } return prev }, 0)

    const redPercent = Math.floor(redTotal / (redTotal + orangeTotal + greenTotal) * 100)
    const orangePercent = Math.floor(orangeTotal / (redTotal + orangeTotal + greenTotal) * 100)
    const greenPercent = Math.floor(greenTotal / (redTotal + orangeTotal + greenTotal) * 100)

    return (
      <div className="students wrapper">
      <Dialog
        title="Student Evaluation"
        modal={false}
        open={(this.props.openStudent != null)}
        onRequestClose={this.handleClose}
      >
      <Student randomStudent={this.randomNextStudent.bind(this)} />
      </Dialog>
        <header>
          <h1>{`Batch #${batchNumber}`}</h1>
          <RaisedButton
          label="Random Student"
          onClick={this.randomNextStudent.bind(this)}
          />
          <div className="percentageBar">
            <div className="red percentBox" style={{width: `${redPercent}%`}}>{redPercent}%</div>
            <div className="orange percentBox" style={{width: `${orangePercent}%`}}>{orangePercent}%</div>
            <div className="green percentBox" style={{width: `${greenPercent}%`}}>{greenPercent}%</div>
          </div>
        </header>
        <main>
          { students.map(this.renderStudent.bind(this))}
          <div className="addStudent">
            <RaisedButton
            className="addStudentButton"
            label="Add Student"
            onTouchTap={this.handleAddStudentOpen.bind(this)}
            />
            <Dialog
              title="Add Student"
              modal={false}
              open={this.state.addStudent}
              onRequestClose={this.handleAddStudentClose.bind(this)}
            >
              <AddStudent batchId={this.props._id} handleAddStudentClose={this.handleAddStudentClose}/>
            </ Dialog>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, openStudent }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  },{})
  return { ...batch, openStudent }
}

export default connect(mapStateToProps, {fetchBatches, closeStudent, randomStudent})(Batch)
