import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SIGNUP_TITLE, EMAIL, USERNAME, COMPANY, SIGNIN_TITLE } from '../utils/labels';
import { API_URL } from '../utils/constant';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}register`, {
        username,
        email,
        password,
        company: "Company Test",
        is_active: true
      });
      if (response.status === 201) {
        console.log('User successfully registered:', response.data);
        navigate('/userslist');
      }
    } catch (error) {
      console.error('Bad Request: Invalid input data', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{SIGNUP_TITLE}</h1>
        <label htmlFor="username">
          {USERNAME}
          <input 
            type="text" 
            name="username" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </label>
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
          Password
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
        <label htmlFor="company">
          {COMPANY}
          <input 
            type="text" 
            name="company" 
            id="company" 
            value="Company Test" 
            disabled 
          />
        </label>
        <button type="submit">{SIGNUP_TITLE}</button>
        <Link to="/signin">{SIGNIN_TITLE}</Link>
      </form>
    </>
  );
}
