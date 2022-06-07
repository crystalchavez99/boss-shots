import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="signup">
      <form onSubmit={onSignUp} className="form-signup">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="email-div">
        <label className="username-label">User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder="User Name"
        ></input>
      </div>
      <div className="email-div">
        <label className="email-label-signup">Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder="Email"
        ></input>
      </div>
      <div className="password-div">
        <label className="password-label-signup">Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder="Password"
        ></input>
      </div>
      <div className="email-div">
        <label className="rereet-password-label">Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Password"
        ></input>
      </div>
      <button className="signup-btn" type='submit'>Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
