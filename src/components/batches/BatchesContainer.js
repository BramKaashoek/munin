//src/components/batches/BatchesContainer.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../../actions/batches/fetch'
import subscribeToBatchesService from '../../actions/batches/subscribe'
import CreateBatchButton from './CreateBatchButton'
import BatchItem from './BatchItem'


export class BatchesContainer extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToBatchesService()
  }

  componentDidMount(){
    if (!this.props.signedIn){
      this.props.push('/sign-in')
    }
  }

  renderBatch(batch, index){
    return ( <BatchItem key={index} { ...batch } /> )
  }

  render(){
    if (!this.props.signedIn) return null

    return (
      <div className="batcheswrapper">
          <header>
            <CreateBatchButton />
          </header>
          <main>
            { this.props.batches.map(this.renderBatch.bind(this)) }
          </main>
        </div>
    )
  }
}

const mapStateToProps= ({ currentUser, batches }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  batches })

export default connect(mapStateToProps, { fetchBatches, subscribeToBatchesService, push })(BatchesContainer)
