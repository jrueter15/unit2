import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import * as api from '../../services/api.js';
import Button from '../Button/Button';

const CalendarPage = () => {
    const[selectedDate, setSelectedDate] = useState(new Date());
    const[entries, setEntries] = useState([]);
    const[selectedDateEntries, setSelectedDateEntries] = useState([]);
    const[error, setError] = useState("");

    // Fetch all journal entries on mount
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

    // Check if a date has entries
    const hasEntriesOnDate = (date) => {
        return entries.some(entry => {
            const entryDate = new Date(entry.dateCreated);
            return entryDate.getDate() === date.getDate() &&
                   entryDate.getMonth() === date.getMonth() &&
                   entryDate.getFullYear() === date.getFullYear();
        });
    };

    // Get entries for a specific date
    const getEntriesForDate = (date) => {
        return entries.filter(entry => {
            const entryDate = new Date(entry.dateCreated);
            return entryDate.getDate() === date.getDate() &&
                   entryDate.getMonth() === date.getMonth() &&
                   entryDate.getFullYear() === date.getFullYear();
        });
    };

    // Handle date click
    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dateEntries = getEntriesForDate(date);
        setSelectedDateEntries(dateEntries);
    };

    // Add class name to tiles with entries for styling
    const tileClassName = ({ date, view }) => {
        if (view === 'month' && hasEntriesOnDate(date)) {
            return 'has-entries';
        }
        return null;
    };

    // Add dot to corner of tiles with entries
    const tileContent = ({ date, view }) => {
        if (view === 'month' && hasEntriesOnDate(date)) {
            return <div className="calendar-dot">•</div>;
        }
        return null;
    };

    // Format date and time for display
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="calendar-page">
            <h1>Dot Calendar</h1>
            {error && <p className="error-message">{error}</p>}
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
                tileContent={tileContent}
            />
            <div className="selected-date-section">
                <h2>Selected Date: {selectedDate.toLocaleDateString()}</h2>
                {selectedDateEntries.length > 0 ? (
                    <div className="date-entries">
                        <h3>Journal Entries ({selectedDateEntries.length})</h3>
                        <ul>
                            {selectedDateEntries.map(entry => (
                                <li key={entry.id} className="date-entry-item">
                                    <span className="entry-time">{formatDateTime(entry.dateCreated)}</span>
                                    <p>{entry.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No journal entries for this date.</p>
                )}
            </div>
        </div>
  )
}

export default CalendarPage

