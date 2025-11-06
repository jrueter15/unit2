import {Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import Modal from '../Modal/Modal';
import * as api from '../../services/api.js';

// Navbar component for header/title and router links
const Navbar = ({onLogout}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const username = localStorage.getItem('username');
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    onLogout();
  };

  const handleDeleteAccountClick = () => {
    // Close dropdown and open delete modal
    setDropdownOpen(false); 
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteAccount = async () => {
    try {
      await api.authAPI.deleteCurrentUser();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert('Account deleted successfully');
      onLogout();
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account. Please try again.');
      setIsDeleteModalOpen(false);
    }
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
            <button onClick={handleDeleteAccountClick} className="delete-account-btn">Delete Account</button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will delete all your journal entries."
      />
    </div>
  )
}

export default Navbar
