//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import './Student.css'
import fetchBatches from '../../actions/batches/fetch'

export class Student extends PureComponent {
  static propTypes = {
  }

  componentWillMount(){
    this.props.fetchBatches()
  }

  renderPastEvaluations(evaluation){
    return(
      <div className={`evaluationBox color-${evaluation.color}`}  />
    )
  }

  render(){
    const {
      _id,
      name,
      profilePicture,
      evaluations,
    } = this.props.student
    console.log(this.props)

    if (!_id) return (null)

    return (
      <div>
        <img src={profilePicture} />
        <h1> {name} </h1>
        <h2>{`Batch #${this.props.batchNumber}`}</h2>
        <div className="pastEvaluations">
          {evaluations.map(this.renderPastEvaluations.bind(this))}
        </div>
        <div className="dateSelect">
          <p>Daily evaluation for </p>
          <DatePicker
            hintText="Select Date"
          />
        </ div>
        <TextField
        hintText="Enter remark here..."
         />
         <div className="saveButtons">
          <RaisedButton
            label="Save"
          />
          <RaisedButton
            label="Save and Next"
          />
        </div>
      </ div>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
  const student = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next.students.reduce(
        (prev, next) => {
          if (next._id === params.studentId) {
            return next
          }
          return prev
        },{}
      )
    }
    return prev
  },{})


  return { student }
}


export default connect(mapStateToProps, { fetchBatches })(Student)
