import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class SignedOutLinks extends Component {

  render() {
    return (
        <div className="menu">
        <ul>

          <li className="menu__menu_item">
        <NavLink to="/" onClick={this.props.closeCallback}> home </NavLink>
            </li>

        <li className="menu__menu_item">
        <NavLink to="/upload" onClick={this.props.closeCallback}> upload </NavLink>
            </li>

            </ul>
      </div>
    )
  }
}

SignedOutLinks.propTypes = {
  closeCallback: PropTypes.func.isRequired
}

export default SignedOutLinks
