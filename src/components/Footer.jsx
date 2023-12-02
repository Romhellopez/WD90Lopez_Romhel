import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <>
    <div className='footer fixed-bottom'>
      <h2 className='footP'>&copy; 2023 TheYowMovies All Rights Reserved.</h2>
      <div className='media'>
      <Link className="button" id="fb" to="https://www.facebook.com/" role="button"><i className="fab fa-facebook" size='x6'></i></Link>
      <Link className="button" id="insta" to="https://www.intagram.com/" role="button"><i className="fab fa-instagram" size='x6'></i></Link>
      <Link className="button" id="X" to="https://www.x.com/" role="button"><i className="fab fa-x" size='x6'></i></Link>
      <Link className="button" id="tele" to="https://www.telegram.me/" role="button"><i className="fab fa-telegram" size='x6'></i></Link>
      </div>
      </div>
  
      </>
  )
}

export default Footer;
