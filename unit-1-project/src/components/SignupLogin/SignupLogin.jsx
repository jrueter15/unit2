import React from 'react'
import {useState} from 'react'
import Form from '../Form/Form';
import { authAPI } from '../../services/api';

// Handles both Signup and Login
const SignupLogin = ({onAuthSuccess}) => {
  // State for tracking login and signup errors
  const[loginError, setLoginError] = useState('');
  const[signupError, setSignupError] = useState('');

  // Validation test for empty fields and password length
  const validateForm = ({ username, password }) => {
    if (!username || !password) {
      return 'All fields are required.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };

  // Handles login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.name.value.trim();
    const password = e.target.password.value;

    const error = validateForm({ username, password });
    if (error) {
      setLoginError(error);
      return;
    }

    try {
      const response = await authAPI.login(username, password);
      localStorage.setItem('jwt', response.token);
      localStorage.setItem('username', response.username);
      setLoginError('');
      onAuthSuccess();
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  // Handles signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.name.value.trim();
    const password = e.target.password.value;

    const error = validateForm({ username, password });
    if (error) {
      setSignupError(error);
      return;
    }

    try {
      await authAPI.register(username, password);
      // After successful registration, automatically log in
      const response = await authAPI.login(username, password);
      localStorage.setItem('jwt', response.token);
      localStorage.setItem('username', response.username);
      setSignupError('');
      onAuthSuccess();
    } catch (err) {
      setSignupError(err.response?.data?.message || 'Registration failed. Username may already exist.');
    }
  };
  
  return (
    <div className="login-signup">
      <Form
        title="Log-in"
        onSubmit={handleLogin}
        error={loginError}
        buttonText="Login"
      />
      <Form
        title="Sign-up"
        onSubmit={handleSignup}
        error={signupError}
        buttonText="Sign-Up"
      />
    </div>
  )
}

export default SignupLogin
