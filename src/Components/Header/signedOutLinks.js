import React from 'react'
import { NavLink } from 'react-router-dom'


const SignedOutLinks = () => {
    return (
        <ul className="right hide-on-med-and-down signin-links">
            <li><NavLink to='/signup'>Sign Up</NavLink></li>
            <li><NavLink to='/signin'>Sign In</NavLink></li>
        </ul>
    )
}


export default SignedOutLinks