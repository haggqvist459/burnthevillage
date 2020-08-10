import React, { Component } from 'react';
import '../sass/index.scss';
import { Hamburger, UploadButton, UploadIcon } from '../components';


class Upload extends Component {
  render() {
    return (
      <div className="uploadBackground">

        <div className="hamburger">
          <Hamburger />
        </div>

        <div className="uploadBackground__upload_button">
          <UploadButton>
            <UploadIcon />
          </UploadButton>
        </div>

      </div>
    )
  }
}

export default Upload;