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
import randomStudent from '../../actions/batches/random-student'
import './Batch.css'


import DatePicker from 'material-ui/DatePicker'

export class Batch extends PureComponent {
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

  randomStudent(){
    this.props.randomStudent(this.props.students, this.props._id, this.props.batchNumber)
  }

  render(){
    if (!this.props._id) return null

    const {
      batchNumber,
      students,
    } = this.props

    return (
      <div className="students wrapper">
      <Dialog
        title="Student Evaluation"
        modal={false}
        open={(this.props.openStudent != null)}
        onRequestClose={this.handleClose}
      >
      <Student />
      </Dialog>
        <header>
          <h1>{`Batch #${batchNumber}`}</h1>
          <RaisedButton
          label="Random Student"
          onClick={this.randomStudent.bind(this)}
          />
        </header>
        <main>
          { students.map(this.renderStudent.bind(this))}
        </main>
        <DatePicker />
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
