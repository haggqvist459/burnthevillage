import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SignedOutLinks from './signedOutLinks';

class MenuContent extends Component {

  render() {
    return (
     <SignedOutLinks />
    )
  }
}

MenuContent.propTypes = {
  closeCallback: PropTypes.func.isRequired
}

export default MenuContent
