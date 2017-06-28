//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import closeStudent from '../../actions/batches/close-student'
import './Student.css'

export class Student extends PureComponent {
  constructor(props) {
    super()

    const { batchId, studentId, date, color, remarks } = props

    this.state = {
      batchId,
      studentId,
      date: new Date,
      color,
      remarks,
      errors: {}
    }
  }
  static propTypes = {
  }

  renderPastEvaluations(evaluation){
    return(
      <div className={`evaluationBox color-${evaluation.color}`} key={evaluation.date} />
    )
  }

  updateColor(event){
    this.setState({
      color: this.refs.color.value
    })
  }

  updateDate(event, newDate){
    this.setState({
      date: newDate
    })
  }

  updateRemarks(event){
    this.setState({
     remarks: event.target.value
    })
  }

  validate(evaluation) {
    const { date, color, remark } = evaluation

    let errors = {}

    if (color <= 1 && ( evaluation === null || evaluation === "" )) errors.evaluation = "When the evaluation is orange or red remarks must be provided."

    this.setState({
      errors,
    })
  }

  saveEvaluation() {
    const {
      date,
      color,
      remarks,
    } = this.state

    const {
      batchId,
      _id
    } = this.props.openStudent

    const evaluation = {
      batchId,
      _id,
      date,
      color,
      remarks,
    }

    console.log(evaluation)

    if (this.validate(evaluation)) {
      //this.props.saveEvaluation(evaluation)
    }
  }

  handleClose= () => {
    this.props.closeStudent()
  }

  handleSave= () => {
    this.saveEvaluation()
    this.handleClose()
  }

  handleSaveAndNext= () => {
    this.handleClose()
  }

  render(){
    if (this.props.openStudent === null) return (null)


    const {
      _id,
      name,
      profilePicture,
      evaluations,
      batchNumber
    } = this.props.openStudent


    const { errors } = this.state
    return (
      <article className="evaluation wrapper">
        <header>
          <img src={profilePicture} className="profilePicture" />
          <div className="studentDetails">
            <h1> {name} </h1>
            <h2>{`Batch #${batchNumber}`}</h2>
          </div>
        </header>
        <div className="pastEvaluations">
          {evaluations.map(this.renderPastEvaluations.bind(this))}
        </div>
        <div className="currentEvaluation">
          <div className="colorSelect">
          </div>
          <div className="inputfields">
            <div className="dateSelect">
              <p>Daily evaluation for </p>
              <DatePicker
                className="datePicker"
                hintText="Today"
                onChange={this.updateDate.bind(this)}
              />
            </ div>
            <TextField
            className="remarks"
            value={this.state.remarks}
            hintText="Enter remark here..."
            multiLine={true}
            rows={4}
            onChange={this.updateRemarks.bind(this)}
             />
          </div>
        </div>
         <div className="actionButtons">
           <RaisedButton
            className="saveButton"
             label="Save"
             primary={true}
             onTouchTap={this.handleSave}
           />
           <RaisedButton
             className="saveButton"
             label="Save and Next"
             primary={true}
             onTouchTap={this.handleSaveAndNext}
           />
         </div>
      </ article>
    )
  }
}

const mapStateToProps= ({ openStudent } )=> ({ openStudent })

export default connect(mapStateToProps, {closeStudent})(Student)
