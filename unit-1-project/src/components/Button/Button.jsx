import React from 'react'

{/* Reusable button that takes text, click handler, and type */}
{/* text is dynamically put on the button */}
const Button = ({text, onClick, type="button"}) => {
  return (
    <div className="button">
      <button
        type={type}
        onClick={onClick}
        className={'custom-button'}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
