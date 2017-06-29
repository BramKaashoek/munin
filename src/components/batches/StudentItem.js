import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import openStudent from '../../actions/batches/open-student'
import deleteStudent from '../../actions/batches/delete-student'
import './StudentItem.css'

export class StudentItem extends PureComponent {
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

  render(){
    const {
      name,
      profilePicture,
      evaluations,
    } = this.props

    const color = evaluations.length > 0 ? evaluations[evaluations.length-1].color : 99

    return(
        <article className="student" >
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
            />
            <RaisedButton
              className="actionButton"
              label="Delete Student"
              onTouchTap={this.deleteThisStudent.bind(this)}
              primary={true}
            />
          </main>
        </article>
    )
  }
}

export default connect(null, {openStudent, deleteStudent })(StudentItem)
