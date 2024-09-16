import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forms.css';
import { SIGNIN_TITLE, SIGNUP_TITLE, PASSWORD, EMAIL } from '../utils/labels';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{SIGNIN_TITLE}</h1>
        <label htmlFor="email">
          {EMAIL}
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
        <label htmlFor="password">
          {PASSWORD}
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <span>
          <a href="#">Reset {PASSWORD}</a>
        </span>
        <button type="submit">{SIGNIN_TITLE}</button>
        <Link to="/signup">{SIGNUP_TITLE}</Link>
      </form>
    </>
  );
}