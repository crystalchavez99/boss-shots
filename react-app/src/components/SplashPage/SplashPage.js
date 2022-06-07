import React from 'react';
import {NavLink} from 'react-router-dom';
import './SplashPage.css';
import logo from '../../assets/boss-shots.png'
function SplashPage() {
  return (
    <div id="splash-page">
      <div id="splash-main-div">
        <img src={logo}/>
        {/* <img src='../../../assets/boss-shots.png' alt="boss-shots-logo" id="splash-logo" style={{width: "600px", height: "auto"}}/> */}
        <div id="splash-slogan">Beat the Boss,</div>
        <div id="splash-slogan-two">Share the Battle</div>
        <div id="splash-links-div">
          <NavLink to='/sign-up' className="splash-links" exact={true}>Start For Free</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SplashPage;
