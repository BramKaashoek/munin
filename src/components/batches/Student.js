//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import moment from 'moment'
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

  componentWillMount(){
    const today = new Date
    const evaluation = this.getEvaluation(today)
    this.setEvaluation(evaluation)
  }

  getEvaluation(searchDate){
    const evaluations = this.props.openStudent.evaluations
    return evaluations.find((e) => moment(e.date).format('DD/MM/YYYY') === moment(searchDate).format('DD/MM/YYYY')   )
  }

  setEvaluation(evaluation){
    if (!!evaluation){
      this.setState({
        color: `${evaluation.color}`,
        remarks: evaluation.remarks
      })
    } else {
      this.setState({
        color: null,
        remarks: "",
      })
    }
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
    const evaluation = this.getEvaluation(newDate)
    this.setEvaluation(evaluation)
  }

  formatDate(date){
  return moment(date).format('DD/MM/YYYY')
}

  updateRemarks(event){
    this.setState({
     remarks: event.target.value
    })
  }

  validate(evaluation, evaluations) {
    const { color, remarks, date } = evaluation

    let errors = {}

    const evaluationDates = evaluations.map((e) => {
      const date = new Date(e.date)
      return moment(date).format('DD/MM/YYYY')
    })
    const formattedDate = this.formatDate(date)

    //if (evaluationDates.includes(formattedDate)) errors.date = "An evaluation has already been added for this date."
    if ( color <= 1 && ( remarks === undefined || remarks === ""  )) errors.remarks = "When the evaluation is orange or red remarks must be provided."
    if ( color === undefined || color === null ) errors.color = "A color must be selected."
    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveEvaluation(nextStudent) {
    const {
      date,
      color,
      remarks,
    } = this.state

    const {
      batchId,
      _id,
      evaluations,
    } = this.props.openStudent

    const evaluation = {
      batchId,
      _id,
      date,
      color,
      remarks,
    }

    if (this.validate(evaluation, evaluations)) {
      this.props.evaluationSave(evaluation)
      if (nextStudent === true){
        this.setState({
          date: new Date,
          color: null,
          remarks: "",
        })
        this.props.randomStudent()
      } else {
        this.handleClose()
      }
    }
  }

  handleClose= () => {
    this.props.closeStudent()
  }

  handleSave= () => {
    const nextStudent = false
    this.saveEvaluation(nextStudent)
  }

  handleSaveAndNext= () => {
    const nextStudent = true
    this.saveEvaluation(nextStudent)
  }

  render(){
    if (this.props.openStudent === null) return (null)

    const {
      name,
      profilePicture,
      evaluations,
      batchNumber
    } = this.props.openStudent

    const { errors, color } = this.state
     return (
      <article className="evaluation wrapper">
        <header>
          <img src={profilePicture} className="profilePicture" alt="students profile" />
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
                  value={this.state.date}
                  onChange={this.updateDate.bind(this)}
                />
                { errors.date && <p className="error"> { errors.date } </p> }
              </ div>
              <TextField
              className="remarks"
              name="remarks"
              value={this.state.remarks}
              hintText="Enter remarks here..."
              multiLine={true}
              rows={4}
              fullWidth={true}
              onChange={this.updateRemarks.bind(this)}
               />
               { errors.remarks && <p className="error"> { errors.remarks } </p> }
               { errors.color && <p className="error">  { errors.color } </p> }
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
