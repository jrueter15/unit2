import React, {useState} from 'react'
import Calendar from 'react-calendar'

const CalendarPage = () => {

    const[selectedDate, setSelectedDate] = useState(new Date());
    
    return (
        <div className="calendar-page">
            <h1>Dot Calendar</h1>
            <Calendar onClickDay={setSelectedDate}/>
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        </div>
  )
}

export default CalendarPage

