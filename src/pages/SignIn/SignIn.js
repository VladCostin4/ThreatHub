import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = () => {
    // You can add custom validation logic here if needed
    if (email === '' && password === '') {
      // Successful sign-in, redirect to the homepage
      
      if (localStorage.getItem('authenticated') === 'true') {
        localStorage.setItem('authenticated', 'false');
      } else {
        localStorage.setItem('authenticated', 'true');
      }

      console.log(localStorage.getItem('authenticated'));	
      
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div >
      <h2>Sign In</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;