import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import './CreateBatchButton.css'

class CreateBatchButton extends PureComponent {
  render() {
    return (
      <div className="CreateBatchButton">
        <Link to="/create-batch">
          <RaisedButton
            label="Create Batch"
            primary={true} />
        </Link>
      </div>
    )
  }
}

export default connect(null, {})(CreateBatchButton)
