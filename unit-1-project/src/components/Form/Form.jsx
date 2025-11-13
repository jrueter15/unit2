import React from 'react'
import Button from '../Button/Button';

{/* Form component to simplify SignupLogin */}
{/* Dynamically changes title, requires completed form */}
const Form = ({title, onSubmit, error, buttonText}) => {
  return (
    <div className="inputs">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        <div className="input">
          <input type="text" name="name" placeholder="Username" required autoComplete="username" />
        </div>
        <div className="input">
          <input type="password" name="password" placeholder="Password" required autoComplete="current-password" />
        </div>
        {/* Displays error message on validation fail */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" text={buttonText} />
      </form>
    </div>
  )
}

export default Form
