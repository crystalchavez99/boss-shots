
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'


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
              <NavLink className="navLink" to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        }



        {sessionUser &&
          <li>
            <LogoutButton />
          </li>}
      </ul>
    </nav>
  );
}

export default NavBar;
