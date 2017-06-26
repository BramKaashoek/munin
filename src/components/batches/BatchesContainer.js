//src/components/batches/BatchesContainer.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../../actions/batches/fetch'



export class BatchesContainer extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  render(){
    return (
      null
    )
  }
}

export default connect(null, { fetchBatches })(BatchesContainer)
