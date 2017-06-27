import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router'
import { Link } from 'react-router'
import './StudentItem.css'
import RaisedButton from 'material-ui/RaisedButton'

export class StudentItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired
  }

  linkToStudent(){
    //this.push({})
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
      <Link to={`/batches/${batchId}/students/${_id}`} batchNumber={batchNumber}>
        <article className="student" onClick={this.linkToStudent.bind(this)}>
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
       </Link>

    )
  }
}



export default connect(null, {})(StudentItem)
