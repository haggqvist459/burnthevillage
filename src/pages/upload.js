import React from 'react';
import { withRouter } from 'react-router';
import '../sass/index.scss';
import { Hamburger, UploadButton, UploadIcon } from '../components';


const Upload = ({ history }) => {
  
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

export default withRouter(Upload);