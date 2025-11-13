import React from 'react';
import { useState, useEffect } from "react";
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import * as api from '../../services/api.js';

// Home component will display suggested wins and daily dots/journals the user adds
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

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  // State for journal entries and error handling
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  // No longer syncs logs to local storage, but fetches all entries on mount
  // Uses api.js
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await api.journalAPI.getAllEntries();
        setEntries(data);
      } catch (err) {
        console.error('Error fetching journal entries:', err);
        setError('Failed to load journal entries.');
      }
    };
    fetchEntries();
  }, []);

  // State for new input and editing
  const [inputValue, setInputValue] = useState("");
  const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(null);
  const [tempEditValue, setTempEditValue] = useState("");
  const [encouragement, setEncouragement] = useState("");
  
  // Handles typing
  function handleInputChange(e){
    setInputValue(e.target.value);
  }

  // Function for adding a journal entry
  const addLog = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Checks if input is input, if not try createEntry
    if(inputValue.trim() !== ""){
      try {
        const newEntry = await api.journalAPI.createEntry({
          content: inputValue,
          title: "" // Potential title field
        });
        setEntries((prevEntries) => [...prevEntries, newEntry]);
        // Resets value - new blank field
        setInputValue("");
        setError("");

        // Random # between 0-1, multiplied by the length of the array, rounded down by floor, pulls message from that position in array
        const randomMessage = encouragingMessageArray[Math.floor(Math.random() * encouragingMessageArray.length)];
        setEncouragement(randomMessage);
      } catch (err) {
        console.error('Error creating entry:', err);
        setError('Failed to create journal entry.');
      }
    }
  };
  
  // function for editing specific entry
  function startEditing(id, content) {
    setCurrentlyEditingIndex(id);
    setTempEditValue(content);
  }

  // function for handling editing changes
  function handleEditChange(e) {
    setTempEditValue(e.target.value);
  }

  // function to save the edits
  const saveEdit = async (id) => {
    try {
      const updatedEntry = await api.journalAPI.updateEntry(id, {
        content: tempEditValue,
        title: ""
      });
      setEntries((prevEntries) =>
        prevEntries.map((entry) => (entry.id === id ? updatedEntry : entry))
      );
      setCurrentlyEditingIndex(null);
      setTempEditValue("");
      setError("");
    } catch (err) {
      console.error('Error updating entry:', err);
      setError('Failed to update journal entry.');
    }
  };

  // function to handle the delete click that opens the modal and sets the entry
  const handleDeleteClick = (id) => {
    setEntryToDelete(id);
    setIsModalOpen(true);
  };

  // function to handle the actual deleting. Filtering out the entry to delete from the entries state array, closing modal, clearing entry to delete
  const handleConfirmDelete = async () => {
    try {
      await api.journalAPI.deleteEntry(entryToDelete);
      setEntries((prev) => prev.filter((entry) => entry.id !== entryToDelete));
      setIsModalOpen(false);
      setEntryToDelete(null);
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError('Failed to delete journal entry.');
      setIsModalOpen(false);
    }
  };

  // Format date and time for display
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="home">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Journal Entry"
        message="Are you sure you want to delete this journal entry? This action cannot be undone."
      />        
      
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

      {/* Form to add a new log */}
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
      {error && <p className="error-message">{error}</p>}

      {/* Display list of journal entries */}
      <div className="daily-log-output">
        <h1>Dot Archive ({entries.length})</h1>

        <ol>
          {entries.map((entry) =>
            <li key={entry.id}>
              {currentlyEditingIndex === entry.id ? (
                <>
                  <input
                    type="text"
                    value={tempEditValue}
                    onChange={handleEditChange}
                    style={{ width: "90%", padding: "8px", fontSize: "1rem" }}
                  />
                  <Button
                    text="Save"
                    onClick={() => saveEdit(entry.id)}
                  />
                </>
              ):(
                // Displays entry along with edit and delete buttons
                <>
                  <span className="text">
                    <span className="entry-date">{formatDateTime(entry.dateCreated)}</span>
                    {" - "}
                    {entry.content}
                  </span>
                  <div className="log-buttons">
                    <Button text="Edit" onClick={() => startEditing(entry.id, entry.content)} />
                    <Button text="Delete" onClick={() => handleDeleteClick(entry.id)}/>
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
