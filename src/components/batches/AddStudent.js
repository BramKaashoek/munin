//src/components/batches/AddStudent.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import createStudent from '../../actions/batches/create-student'

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
    } = this.state

    const batchId = this.props.batchId

    let errors = {}
    const newStudent= {
      name,
      profilePicture,
      batchId
    }

    if ( name === ""  ) errors.name = "Please provide a name."
    if ( profilePicture === ""  ) errors.profilePicture = "Please provide a profile picture."

    this.setState({
      errors,
    })

    if (Object.keys(errors).length === 0){
      this.props.createStudent(newStudent)
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

export default connect(null, { createStudent })(AddStudent)
