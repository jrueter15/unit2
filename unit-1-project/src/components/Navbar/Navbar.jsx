import {Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';

// Navbar component for header/title and router links
const Navbar = ({onLogout}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem('username');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    onLogout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="navbar">
      <h1>Dot.Today</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/calendar-page">Calendar</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <div className="user-menu" ref={dropdownRef}>
        <button
          className="username-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {username || 'User'}
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
