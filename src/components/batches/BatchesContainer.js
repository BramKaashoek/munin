import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import fetchBatches from '../../actions/batches/fetch'
import subscribeToBatchesService from '../../actions/batches/subscribe'
import saveBatch from '../../actions/batches/save-batch'
import BatchItem from './BatchItem'
import './BatchesContainer.css'


export class BatchesContainer extends PureComponent {
  state = {
    open: false,
    endDate: new Date,
    startDate: new Date
  }
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

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  formatDate(date){
    return date.getDate()  + "/" + (date.getMonth() + 1)  +  "/" + date.getFullYear();
  }

  changeStartDate = (event, date) => {
      this.setState({
        startDate: date,
      });
    }

    changeEndDate = (event, date) => {
    this.setState({
      endDate: date,
    });
  }

  handleSave = () => {
    const {
      startDate,
      endDate,
    } = this.state

    const newBatch = { startDate, endDate }

    this.props.saveBatch(newBatch)
    this.handleClose()
  }

  renderBatch(batch, index){
    return ( <BatchItem key={index} { ...batch } /> )
  }

  render(){
    if (!this.props.signedIn) return null

    return (
      <div className="batcheswrapper">
          <header>
          <RaisedButton
            label="Create Batch"
            primary={true}
            onTouchTap={this.handleOpen} />
            <Dialog
              title="Create New Batch"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            <div className="createBatchDialog">
              <p>Select start date</p>
              <DatePicker
                className="datePicker"
                formatDate={this.formatDate}
                hintText="Today"
                onChange={this.changeStartDate.bind(this)}
              />

              <p>Select end date</p>
              <DatePicker
                className="datePicker"
                formatDate={this.formatDate.bind(this)}
                hintText="Today"
                onChange={this.changeEndDate.bind(this)}
              />
              <RaisedButton
              label="Save"
              primary={true}
              onTouchTap={this.handleSave}
              />
            </div>
            </Dialog>
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

export default connect(mapStateToProps, { fetchBatches, subscribeToBatchesService, push, saveBatch })(BatchesContainer)
