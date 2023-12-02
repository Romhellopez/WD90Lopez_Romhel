import React from 'react';
import './Navbar.css';
import ProfileBox from './ProfileBox';
import TheYow from '../img/TheYow.jpg';
import { lineSpinner } from 'ldrs'


lineSpinner.register()
const Navbar = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <div className='navbar'>
        <img className='TheYow' src={TheYow} alt='' href='#'/>
        <h3 className='TheYowTitle' onClick={refreshPage}>TheYowMovies</h3>
        <button id='Button' onClick={refreshPage}>Movies</button>
        
      </div>
            <ProfileBox />

    </div>
  )
}

export default Navbar;
