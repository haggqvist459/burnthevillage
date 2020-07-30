import React, { Component } from 'react';
import Hamburger from "../components/hamburger/hamburger";
import '../sass/pages/upload.scss'
import {UploadButton} from '../components/styledmaterial/buttons';
import {UploadIcon} from '../components/styledmaterial/icons';

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