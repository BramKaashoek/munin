//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import closeStudent from '../../actions/batches/close-student'
import evaluationSave from '../../actions/batches/save-evaluation'
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
      color: event.target.id
    })
  }

  updateDate(event, newDate){
    this.setState({
      date: newDate
    })
  }

  formatDate(date){
  return date.getDate()  + "/" + (date.getMonth() + 1)  +  "/" + date.getFullYear();
}

  updateRemarks(event){
    this.setState({
     remarks: event.target.value
    })
  }

  validate(evaluation) {
    const { date, color, remarks } = evaluation

    let errors = {}

    if (color <= 1 && ( remarks === undefined || remarks === ""  )) errors.remarks = "When the evaluation is orange or red remarks must be provided."

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
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


    if (this.validate(evaluation)) {
      this.props.evaluationSave(evaluation)
      this.handleClose()
    }
  }

  handleClose= () => {
    this.props.closeStudent()
  }

  handleSave= () => {
    this.saveEvaluation()

  }

  handleSaveAndNext= () => {
    this.saveEvaluation()

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

    const { errors, color } = this.state
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
        <div className="evaluationForm">
          <div className="currentEvaluation">
            <div className="colorSelect">
            <div id="2" className={"colorSelectBox greenBox " + (color==="2" ? "color-2" : "") } onClick={this.updateColor.bind(this)}/>
            <div id="1" className={"colorSelectBox orangeBox " + (color==="1" ? "color-1" : "")} onClick={this.updateColor.bind(this)}/>
            <div id="0" className={"colorSelectBox redBox " + (color==="0" ? "color-0" : "")} onClick={this.updateColor.bind(this)}/>
            </div>
            <div className="inputfields">
              <div className="dateSelect">
                <p>Daily evaluation for </p>
                <DatePicker
                  className="datePicker"
                  formatDate={this.formatDate}
                  hintText="Today"
                  onChange={this.updateDate.bind(this)}
                />
              </ div>
              <TextField
              className="remarks"
              value={this.state.remarks}
              hintText="Enter remarks here..."
              multiLine={true}
              rows={4}
              fullWidth={true}
              onChange={this.updateRemarks.bind(this)}
               />
               { errors.remarks && <p className="error"> { errors.remarks } </p> }
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
         </div>
      </ article>
    )
  }
}

const mapStateToProps= ({ openStudent } )=> ({ openStudent })

export default connect(mapStateToProps, { closeStudent, evaluationSave })(Student)
