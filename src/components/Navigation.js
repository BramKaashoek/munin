// src/components/Navigation.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import EyeIcon from 'material-ui/svg-icons/action/visibility'
import FlatButton from 'material-ui/FlatButton'
import signOut from '../actions/users/sign-out'

class Navigation extends PureComponent {

  static propTypes = {
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }

  signIn = () => {
    this.props.push('/sign-in')
  }

  goHome = () => {
    this.props.push('/')
  }

  render(){
    const { signedIn, signOut } = this.props
    return (
      <AppBar
      title="Munin"
      iconElementLeft={<IconButton onClick={this.goHome}><EyeIcon /></IconButton>}
      iconElementRight={signedIn ?
        <FlatButton label="Sign Out" onClick={signOut} /> :
          <FlatButton label="Sign In" onClick={this.signIn} />
      }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
