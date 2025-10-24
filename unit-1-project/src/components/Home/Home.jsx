import React from 'react';
import { useState, useEffect } from "react";
import Button from '../Button/Button';

// Home component will display past wins (currently suggested wins) and daily dots/logs the user adds
// The component will also allow editing and deleting

const Home = ({wins}) => {

  const encouragingMessageArray = [
    "Great job!",
    "Nice momentum!",
    "Every little bit counts!",
    "No matter how small...it counts.",
    "Another step towards your new identity!",
    "Another dot closer!",
    "Another win today!",
    "Way to go!",
    "You can do it!",
    "Those dots are adding up!",
    "Consistency beats intensity"
  ];

  // State for logs using local storage
  const [logs, setLogs] = useState(() => {
    const storedLogs = localStorage.getItem("dailyLogs");
    return storedLogs ? JSON.parse(storedLogs) : [];
  })

  // Sync logs state to local storage
  useEffect(() => {
    localStorage.setItem("dailyLogs", JSON.stringify(logs));
  }, [logs]);

  // State for new input and editing
  const [inputValue, setInputValue] = useState("");
  const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(null);
  const [tempEditValue, setTempEditValue] = useState("");
  const [encouragement, setEncouragement] = useState("");

  // Handles typing
  function handleInputChange(e){
    setInputValue(e.target.value);
  }

  // Function for adding a log
  function addLog(e){
    e.preventDefault();
    if(inputValue.trim() !== ""){
      setLogs((prevLogs) => [...prevLogs, inputValue]);
      setInputValue("");

      const randomMessage = encouragingMessageArray[Math.floor(Math.random() * encouragingMessageArray.length)];
      setEncouragement(randomMessage);
    }
  }
  
  // function for editing specific log
  function startEditing(index) {
    setCurrentlyEditingIndex(index);
    setTempEditValue(logs[index]);
  }

  // function for handling editing changes
  function handleEditChange(e) {
    setTempEditValue(e.target.value);
  }

  // function to save the edits
  function saveEdit(index) {
    const updatedLogs = logs.map((log, i) =>
      i === index ? tempEditValue : log
    );
    setLogs(updatedLogs);
    setCurrentlyEditingIndex(null);
    setTempEditValue("");
  }

  // function to delete a specific log at index
  function deleteLog(index){
    const updatedLogs = logs.filter((element, i) => i !== index)
    setLogs(updatedLogs);
  }

  return (
    <div className="home">
      <div className="photo">
        <img 
          src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Person journaling" 
          title="Person journaling"
          style={{ width: '60%', borderRadius: '10px' }} 
        />
      </div>

      <div className="welcome-message">
        <h1>Welcome to Dot.Today!</h1>
        <p>This app was designed to allow you to quickly record a meaningful "dot" from the day—any achievement, no matter how small. It's a simple way to stay mindful, track your progress, and reflect. This is based off the principles from "Atomic Habits" by James Clear, where each small achievements build up to form a habit and change your identity.</p>
      </div>
      
      <div className="suggested-dots">
        <h2>Suggested Dots</h2>
          <ul>
            {wins.map(win => (
              <li key={win.id}>{win.text}</li>
            ))}    
          </ul>
      </div>

      {/* Form to add a  new log */}
      <form onSubmit={addLog} className="daily-log-input">
        <h1>Dot Log - What's your dot today?</h1>
        <textarea
          className="log-textarea"
          value={inputValue}
          onChange={handleInputChange}
          />
        <Button type="submit" text="Add"/>
      </form>

      <br></br>
      {encouragement && <p className="encouragement">{encouragement}</p>}

      {/* Display list of logs */}
      <div className="daily-log-output">
        <h1>Dot Archive ({logs.length})</h1>
        <div className="dots-archive">
            {logs.map((element, index) => (
              <span key={index}>•</span>
            ))}
        </div>
        <Button text="Clear All" onClick={() => setLogs([])} />
        <ol>
          {logs.map((log, index) =>
            <li key={index}>
              {currentlyEditingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={tempEditValue}
                    onChange={handleEditChange}
                  />
                  <Button
                    text="Save"
                    onClick={() => saveEdit(index)}
                  />
                </>
              ):(
                // Displays log along with edit and delete buttons
                <>
                  <span className="text">{log}</span>
                  <div className="log-buttons">
                    <Button text="Edit" onClick={() => startEditing(index)} />
                    <Button text="Delete" onClick={() => deleteLog(index)}/>
                  </div>
                </>
              )}
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default Home
