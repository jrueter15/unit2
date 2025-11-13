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

  const extractFormData = (e) => {
    return {
      username: e.target.name.value.trim(),
      password: e.target.password.value
    };
  };

  const storeAuthData = (response) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    onAuthSuccess();
  }

  // Handles login submission - wait for promise (async)
  const handleLogin = async (e) => {
    // Stop the page from reloading
    e.preventDefault();
    const { username, password } = extractFormData(e);

    const error = validateForm({ username, password });
    if (error) {
      // Save error message in React state - display to user
      setLoginError(error);
      return;
    }

    // Tries to call backend
    try {
      const response = await authAPI.login(username, password);
      // Sets token and username from response into local storage and sets onAuthSuccess
      storeAuthData(response);
      // Clears error
      setLoginError('');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  // Handles signup submission - wait for promise (async)
  const handleSignup = async (e) => {
    // Stop the page from reloading
    e.preventDefault();
    const { username, password } = extractFormData(e);

    const error = validateForm({ username, password });
    if (error) {
      // Save error message in React state - display to user
      setSignupError(error);
      return;
    }

    try {
      await authAPI.register(username, password);
      const response = await authAPI.login(username, password);
      storeAuthData(response);
      // After successful registration, automatically log in
      setSignupError('');
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
