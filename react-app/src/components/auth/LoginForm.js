import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./Auth.css"
import logo from '../../assets/boss-shots.png'
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }
  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));


  }

  return (
    <div id="login" className='auth'>
      <form onSubmit={onLogin} className="form-login">
        <img src={logo}/>
        <h1>Log in to Boss-Shots</h1>
        <div id="errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="email-div">
          {/* <label className="email-label-login" htmlFor='email'>Email</label> */}
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="password-div">
          {/* <label className="password-label" htmlFor='password'>Password</label> */}
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />

        </div>
        <div className="login-demo-btn">
          <button className="login-btn" type='submit'>Login</button>
          <button className="demo-btn" onClick={demoUser}>Demo</button>
        </div>
        <p>Not a Boss-Shot Member? <a href="/sign-up">Sign up Here.</a></p>
      </form>
    </div>
  );
};

export default LoginForm;
