//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../../actions/batches/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import StudentItem from './StudentItem'
import closeStudent from '../../actions/batches/close-student'
import Student from './Student'
import './Batch.css'

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

  handleSave= () => {
    this.handleClose()
  }

  handleSaveAndNext= () => {
    this.handleClose()
  }

  render(){
    if (!this.props._id) return null

    const {
      _id,
      batchNumber,
      students,
      startDate,
      endDate,
    } = this.props


    const actions = [
      <RaisedButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSave}
      />,
      <RaisedButton
        label="Save and Next"
        primary={true}
        onTouchTap={this.handleSaveAndNext}
      />
    ]

    return (
      <div className="students wrapper">
      <Dialog
        title="Student Evaluation"
        actions={actions}
        modal={false}
        open={(this.props.openStudent != null)}
        onRequestClose={this.handleClose}
      >
      <Student />
      </Dialog>
        <header>
          <h1>{`Batch ${batchNumber}`}</h1>
        </header>
        <main>
          { this.props.students.map(this.renderStudent.bind(this))}
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

export default connect(mapStateToProps, {fetchBatches, closeStudent})(Batch)
