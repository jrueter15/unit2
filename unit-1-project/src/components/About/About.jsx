import React from 'react'

// A simple about page explaining the purpose and mission of app

const About = () => {
  return (
    <div className="about">
        {/* Photo displaying Atomic Habits inspiration */}
        <div className="photo">
            <img 
            src="https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Atomic Habits Book" 
            title="Atomic Habits Book"
            style={{ width: '60%', borderRadius: '10px' }} 
            />
        </div>
        <h2>
            Why I Made This
        </h2>
        <p>
            I’ve always had the desire to be better. I wanted to be more consistent and focused in order to achieve my potential. No matter how hard I tried, I fell short. Motivation only goes so far, especially since life has become more demanding with a new job and an evening coding bootcamp.

            This project provided an opportunity to reflect on where I've fallen short. What was I building? What habits was I forming? Why haven't I progressed the way I've wanted to? What's missing isn't effort, but a system and an identity. I wanted a way to track progress, even on days when I was burnt out and could only manage a little. I wanted to know if I got something done that day, even when it felt small.
        </p>
        <br></br>

        <h2>
            The Purpose
        </h2>

        <p>
            This app is inspired by the book "Atomic Habits" by James Clear. The key principles of the book build around one simple principle: small, consistent actions compound into meaningful change and an identity shift. I don’t need to change in a day. I just need to add one dot today. Then another tomorrow. Then another. Then another.
        </p>
        <br></br>

        <h2>
            The Mission
        </h2>

        <p>
            The goal of this app is simple:
        </p>

        <ul>
            <li>Create a judgment-free space to log small daily wins - your daily dot</li>
            <li>Build momentum through repetition</li>
            <li>Redefine your identity, one small action at a time</li>
        </ul>
        <br />

        <p>
            Whether the win is meditating for one minute, not doom scrolling, or simply showing up — it counts.

            This is for anyone who wants change, but hasn't achieved it yet. Let's change in small ways. Everyday. I built this for myself - and maybe it can help you, too.       
        </p>
    </div>
  )
}

export default About
