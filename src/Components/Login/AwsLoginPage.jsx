import React from 'react'
import NavbarAWS from '../Nav/NavbarAWS'
import LoginAws from './LoginAws'
import Footer from '../Nav/Footer'

const AwsLoginPage = () => {
  return (
    <div>
      <NavbarAWS/>
      <LoginAws/>
      <Footer/>
    </div>
  );
}

export default AwsLoginPage
