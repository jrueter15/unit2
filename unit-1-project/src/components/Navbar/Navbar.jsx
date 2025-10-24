import {Link} from 'react-router-dom';

// Navbar component for header/title and router links
const Navbar = () => {
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
    </div>
  )
}

export default Navbar
