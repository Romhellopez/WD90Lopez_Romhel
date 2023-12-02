import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { spiral } from 'ldrs';
import './Register.css';

spiral.register();

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const validatePassword = (password) => !!password.trim(); // Check if password is not empty
  const validateUsername = (username) => !!username.trim(); // Check if username is not empty
  const validateEmail = (email) => /^[a-zA-Z0-9]{1,6}@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);

  const register = async () => {
    setLoading(true);

    if (!registerEmail || !registerPassword || !confirmPassword || !registerUsername) {
      alert('Please fill up all fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(registerEmail)) {
      alert('Invalid email. It should be up to 6 characters, no special characters, with @ and at least 1 dot.');
      setLoading(false);
      return;
    }

    if (!validatePassword(registerPassword)) {
      alert('Please enter a password.');
      setLoading(false);
      return;
    }

    if (registerPassword !== confirmPassword) {
      alert('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!validateUsername(registerUsername)) {
      alert('Please enter a username.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const newUser = userCredential.user;

      alert(`Registration successful for ${newUser.email}`);
      window.location.href = '/';
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='form'>
      <div className='Register'>
        <div>
          <h3 className='signup'>SIGN UP</h3>
          <input className='form--input'
            placeholder='Email...'
            onChange={(event) => setRegisterEmail(event.target.value)}
          /><br />
          <input className='form--input'
            placeholder='Password'
            type='password'
            onChange={(event) => setRegisterPassword(event.target.value)}
          /><br />
          <input className='form--input'
            placeholder='Confirm Password'
            type='password'
            onChange={(event) => setConfirmPassword(event.target.value)}
          /><br />
          <input className='form--input'
            placeholder='Username'
            onChange={(event) => setRegisterUsername(event.target.value)}
          /><br />
          <button type='button' className='form--submit' onClick={register}>
            Sign up
          </button>
        </div>
        {loading && (
          <div className='loader-overlay'>
            <l-spiral size="40" speed="0.9" color="black" />
          </div>
        )}
      </div>
    </form>
  );
}

export default Register;
