//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import './Student.css'

export class Student extends PureComponent {
  static propTypes = {
  }

  renderPastEvaluations(evaluation){
    return(
      <div className={`evaluationBox color-${evaluation.color}`} key={evaluation.date} />
    )
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



    return (
      <article className="evaluation wrapper">
      <header>
          <img src={profilePicture} classname="profilePicture" />
          <div className="studentDetails">
            <h1> {name} </h1>
            <h2>{`Batch #${batchNumber}`}</h2>
          </div>
        </header>
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
      </ article>
    )
  }
}

const mapStateToProps= ({ openStudent } )=> ({ openStudent })

export default connect(mapStateToProps, {})(Student)
