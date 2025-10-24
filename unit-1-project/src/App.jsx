import SignupLogin from './components/SignupLogin/SignupLogin'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import About from './components/About/About'
import CalendarPage from './components/Calendar/Calendar'
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  // Mock backend data to pass as prop
  const suggestedDots = [
    {id: 1, text: "Went for a walk", date: "2025-07-01" },
    {id: 2, text: "Read 5 pages of a book", date: "2025-07-02" },
    {id: 3, text: "Meditate for 5 minutes", date: "2025-07-03" }
  ];

  // Tracks if the user is logged in, defaults to false
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>    
      <div className="container">
        {/*Checks to see if isAuthenticated is true before allowing access to the Navbar and the rest of the app */}
        {isAuthenticated ? (
          <>
            <header>
              <Navbar />
            </header>
            <main>
              <Routes>
                {/*Shows Home with mockWins passed if authenticated*/}
                <Route path="/" element={<Home wins={suggestedDots} />} />
                <Route path="/home" element={<Home wins={suggestedDots} />} />
                <Route path="/calendar-page" element={<CalendarPage wins={suggestedDots} />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <footer>
              <ul>
                <li>
                  <a href="https://jamesclear.com/">James Clear - author of Atomic Habits and inspiration for this app</a>
                </li>
                <li>
                  <a href="https://www.hubermanlab.com/">Informational Podcast - Huberman Lab</a>
                </li>
                <li>
                  Copyright 2025
                </li>
              </ul>
            </footer>
          </>
        ) : (
          <main> 
            {/*If isAuthenticated is false, will still show SignupLogin */}
            <SignupLogin onAuthSuccess={() => setIsAuthenticated(true)}/>
          </main>
        )}
      </div>
    </Router>        
  );
}

export default App
