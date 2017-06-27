//src/components/batches/Batch.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../../actions/batches/fetch'
import StudentItem from './StudentItem'
import './Batch.css'

export class Batch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    students: PropTypes.array.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }

  componentWillMount(){
    this.props.fetchBatches()
  }

  renderStudent(student, index){
    return ( <StudentItem key={index} { ...student } /> )
  }

  render(){
    const {
      _id,
      batchNumber,
      students,
      startDate,
      endDate,
    } = this.props

    return (
      <div className="students wrapper">
        <header>
          <h1>{`Batch ${batchNumber}`}</h1>
        </header>
        <main>
          { this.props.students.map(this.renderStudent.bind(this))}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  },{})
  return { ...batch }
}

export default connect(mapStateToProps, { fetchBatches })(Batch)
