import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './BatchItem.css'

export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
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

    return(
      <Link to={`/batches/${_id}`}>
        <article className="batch">
          <header>
            <h1>  {`Batch ${batchNumber}`}  </h1>
          </header>
          <main>
          <p>{`${students.length} students`}</p>
            <p>{`Start date: ${startDate}`} </p>
            <p>{`End date: ${endDate}`} </p>
          </main>
        </article>
       </Link>

    )
  }
}



export default connect(null, {})(BatchItem)
