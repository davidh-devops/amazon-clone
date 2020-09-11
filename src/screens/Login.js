import React, { useState, useCallback } from 'react';
import './Login.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useAppState } from '../AppProvider';
import { createAction, actions } from '../reducer';

const Login = () => {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [state, dispatch] = useAppState();

  const onSignIn = useCallback(
    (event) => {
      event.preventDefault();

      auth
        .signInWithEmailAndPassword(username, password)
        .then((auth) => {
          if (auth) {
            history.push('/');
          }
        })
        .catch((error) => alert(error.message));
    },
    [dispatch, username, password]
  );
  const onRegister = useCallback(
    (event) => {
      event.preventDefault();

      auth
        .createUserWithEmailAndPassword(username, password)
        .then((auth) => {
          if (auth) {
            history.push('/');
          }
        })
        .catch((error) => alert(error.message));
    },
    [dispatch, username, password]
  );

  return (
    <div className='login'>
      <Link to='/'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='amazon logo'
          className='login__logo'
        />
      </Link>
      <form action='POST' className='login__form' onSubmit={onSignIn}>
        <h2>Sign In</h2>
        <div className='login__username'>
          <label htmlFor='username'>E-mail</label>
          <input
            type='email'
            id='username'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='login__password'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login__signin' type='submit'>
          Sign In
        </button>
        <p className='login__concent'>
          By signing in you agree to the Amazon FAKE clone conditions of use &
          sale. Please see our Privacy notice, our Cookies notice and our
          Interest-Based Ads notice.
        </p>
        <button className='login__signup btn-secondary' onClick={onRegister}>
          Create Your Amazon Account
        </button>
      </form>
    </div>
  );
};

export default Login;
