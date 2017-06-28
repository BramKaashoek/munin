import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './BatchItem.css'

export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired
  }
  render(){
    const {
      _id,
      batchNumber,
      startDate,
      endDate,
      students,
    } = this.props

    const dateStartDate = new Date(startDate)
    const dateEndDate = new Date(endDate)

    return(
      <Link to={`/batches/${_id}`}>
      <article className="batch">
      <header>
      <h1>  {`Batch ${batchNumber}`}  </h1>
      </header>
      <main>
      <p>{`${students.length} students`}</p>
      <p>{`Start date: ${dateStartDate.getDate()}/${dateStartDate.getMonth()}/${dateStartDate.getFullYear()}`} </p>
      <p>{`End date: ${dateEndDate.getDate()}/${dateEndDate.getMonth()}/${dateEndDate.getFullYear()}`} </p>
      </main>
      </article>
      </Link>
    )
  }
}



export default connect(null, {})(BatchItem)
