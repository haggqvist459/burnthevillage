import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import '../../sass/components/hamburger.scss'

class SignedOutLinks extends Component {

  render() {
    return (
        <div className="cheeseburger">
        <ul className="cheeseburger__menu_list">

          <li className="cheeseburger__menu_item">
        <NavLink to="/" onClick={this.props.closeCallback}> home </NavLink>
            </li>

        <li className="cheeseburger__menu_item">
        <NavLink to="/upload" onClick={this.props.closeCallback}> upload </NavLink>
            </li>

            <li className="cheeseburger__menu_item">
        <NavLink to="/terms" onClick={this.props.closeCallback}> terms </NavLink>
            </li>

            </ul>
      </div>
    )
  }
}


export default SignedOutLinks
