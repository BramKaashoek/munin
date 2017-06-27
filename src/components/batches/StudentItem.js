import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './StudentItem.css'

export class StudentItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired
  }
  render(){
    const {
  _id,
  name,
  profilePicture,
  evaluations,
} = this.props

    return(
      <Link to={`/batches/${_id}/students${_id}`}>
        <article className="student">
          <header>
            <h1>  {`${name}`}  </h1>
          </header>
          <main>

          </main>
        </article>
       </Link>

    )
  }
}



export default connect(null, {})(StudentItem)
