import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import openStudent from '../../actions/batches/open-student'
import './StudentItem.css'

export class StudentItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired
  }

  handleOpen = () => {
  const student = this.props
  this.props.openStudent(this.props)
}

  render(){
    const {
      _id,
      name,
      profilePicture,
      evaluations,
      batchId,
      batchNumber,
    } = this.props

    return(
        <article className="student" onClick={this.handleOpen.bind(this)}>
          <header>
            <img className="studentPicture" src={profilePicture} />
            <h1 className="studentName">  {`${name}`}  </h1>
            <div className={`evaluationBox color-${evaluations[evaluations.length-1].color}`}  />
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
              primary={true}
            />
          </main>
        </article>
    )
  }
}



export default connect(null, {openStudent})(StudentItem)
