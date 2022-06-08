
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import AddPhotoModal from './AddPhotoModal';
import AddAlbumModal from './AddAlbumModal.js';
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink className="navLink" to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!sessionUser &&
          <div className="login_sign_up_div">
            <li>
              <NavLink id="login-nav-link" className="navLink" to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink id="signup-navLink" to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        }



        {sessionUser &&
         <div id="user-action">
            <li>
            <AddPhotoModal />
          </li>
          <li>
          <AddAlbumModal />
          </li>
          <li>
            <LogoutButton className="logout-btn" />
          </li>
         </div>
          }
      </ul>
    </nav>
  );
}

export default NavBar;
