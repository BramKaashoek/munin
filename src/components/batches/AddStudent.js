//src/components/batches/AddStudent.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import createStudent from '../../actions/batches/create-student'
import editStudent from '../../actions/batches/edit-student'

export class AddStudent extends PureComponent {
  constructor(props) {
    super()

    const { batchId} = props

    this.state = {
      batchId,
      name: "",
      profilePicture: "",
      errors: {},
    }
  }

  componentWillMount(){
    if (!!this.props.existingStudent){
      this.setState({
        name: this.props.existingStudent.name,
        profilePicture: this.props.existingStudent.profilePicture,
        evaluations: this.props.existingStudent.evaluations,
        studentId: this.props.existingStudent._id
      })
    } else {
      this.setState({
        evaluations: [],
        studentId: ""
      })
    }
  }

  updateName(event, newName){
    this.setState({
      name: newName
    })
  }

  updateProfilePicture(event, newProfilePicture){
    this.setState({
      profilePicture: newProfilePicture
    })
  }

  handleSave= () => {
    this.validateStudent()
  }

  validateStudent(){
    const {
      name,
      profilePicture,
      evaluations,
      studentId,
    } = this.state

    const batchId = this.props.batchId

    let errors = {}

    const newStudent= {
      name,
      profilePicture,
      evaluations,
      studentId,
      batchId,
    }

    if ( name === ""  ) errors.name = "Please provide a name."
    if ( profilePicture === ""  ) errors.profilePicture = "Please provide a profile picture."

    this.setState({
      errors,
    })

    if (Object.keys(errors).length === 0){
      if (newStudent.studentId != ""){
        this.props.editStudent(newStudent)
      } else {
        this.props.createStudent(newStudent)
      }
      this.props.handleAddStudentClose()
    }
  }

  render(){
    const { errors } = this.state
    return(
      <article className="addStudent">
        <TextField
          name="studentName"
          hintText="Student's Name"
          fullWidth={true}
          value={this.state.name}
          onChange={this.updateName.bind(this)}
         />
         <TextField
           name="studentProfilePicture"
           hintText="URL to student's profile picture"
           fullWidth={true}
           value={this.state.profilePicture}
           onChange={this.updateProfilePicture.bind(this)}
          />
          { errors.name && <p className="error"> { errors.name } </p> }
          { errors.profilePicture && <p className="error"> { errors.profilePicture } </p> }
          <RaisedButton
            className="saveButton"
            label="Save Student"
            primary={true}
            onTouchTap={this.handleSave}
          />
      </article>
    )}
}

export default connect(null, { createStudent, editStudent })(AddStudent)
