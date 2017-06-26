import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './BatchItem.css'

export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    startDate: PropTypes.date.isRequired,
    endDate: PropTypes.date.isRequired,
    students: PropTypes.array.isRequired
  }
}

export default connect(null, {})(BatchItem)
