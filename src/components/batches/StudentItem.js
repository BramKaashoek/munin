import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import openStudent from '../../actions/batches/open-student'
import deleteStudent from '../../actions/batches/delete-student'
import AddStudent from './AddStudent'
import Dialog from 'material-ui/Dialog'
import './StudentItem.css'

export class StudentItem extends PureComponent {
  constructor(props) {
    super()

    this.state = {
      editStudent: false
    }

    this.handleAddStudentClose = this.handleEditStudentClose.bind(this)
  }

  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired
  }

  handleOpen = () => {
  this.props.openStudent(this.props)
}

  deleteThisStudent(){
    this.props.deleteStudent(this.props.batchId, this.props._id)
  }

  handleEditStudentClose(){
    this.setState({
     editStudent: false
    })
  }

  handleEditStudentOpen(){
    this.setState({
      editStudent: true
    })
  }

  render(){
    const {
      name,
      profilePicture,
      evaluations,
      _id,
    } = this.props

    const existingStudent = {name: name, profilePicture: profilePicture, evaluations: evaluations, _id: _id }

    const color = evaluations.length > 0 ? evaluations[evaluations.length-1].color : 99

    return(
        <article className="student" >
        <Dialog
          title="Edit Student"
          modal={false}
          open={this.state.editStudent}
          onRequestClose={this.handleEditStudentClose.bind(this)}
        >
          <AddStudent batchId={this.props.batchId} existingStudent={existingStudent} handleAddStudentClose={this.handleAddStudentClose}/>
        </ Dialog>
          <header onClick={this.handleOpen.bind(this)}>
            <img className="studentPicture" src={profilePicture} alt="students profile"/>
            <h1 className="studentName">  {`${name}`}  </h1>
           <div className={`evaluationBox color-${color}`}  />
          </header>
          <main>
            <RaisedButton
              className="actionButton"
              label="Edit Student"
              primary={true}
              onTouchTap={this.handleEditStudentOpen.bind(this)}
            />
            <RaisedButton
              className="actionButton"
              label="Delete Student"
              primary={true}
              onTouchTap={this.deleteThisStudent.bind(this)}
            />
          </main>
        </article>
    )
  }
}

export default connect(null, {openStudent, deleteStudent })(StudentItem)
