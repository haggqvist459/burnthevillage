import React from 'react';
import { withRouter } from 'react-router';
import { Header, Footer } from '../components';

const Contact = ({ history }) => {

  return (
    <div className="">
      <Header />
      <p>contact</p>
      <Footer />
    </div> 
  )
}

export default withRouter(Contact);

