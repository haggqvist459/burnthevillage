import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger";
import '../sass/pages/upload.scss'

class Upload extends Component {
  render() {
    return (
      <div className="uploadBackground">
        <div className="hamburger">
          <Hamburger />
        </div>
      </div>
    )
  }
}

export default Upload;