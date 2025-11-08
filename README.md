<img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Person journaling" title="Person journaling"/>

<div align="center">
  <h1>Dot.Today - a Full-Stack Application</h1>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=323330" alt="JavaScript" />
  <img src="https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=20232A" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge" alt="Java" />
  <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white" alt="Hibernate" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
  <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge" alt="MySQL" />
  <img src="https://img.shields.io/badge/CSS-rebeccapurple?style=for-the-badge&logo=css&logoColor=white" alt="CSS" />
</div>

---

<div align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#tech">Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#database">Database</a> •
    <a href="#api">API</a> •
    <a href="#future">Future Features</a>
</div>

<a name="about"></a>

## About

Dot.Today is a full-stack habit journal that helps people build better identities through small daily wins. Inspired by James Clear's Atomic Habits, it lets users log their 'dots', those small victories that can compound over time to reshape your life. Built with Spring Boot and React, it features Java Web Token (JWT) authentication, a MySQL database, and a user interface for tracking progress. Every entry is a dot on your journey to becoming who you want to be."

## Features

### Front-End

- Sign-in or Login - Checks for the correct username and password to gain authorization
- Home - Write, read, update, or delete habit journal entries
- Calendar - Shows days where you've written a journal entry - giving you a visual indication and interpretation of your progress and patterns
- About - Learn about the developer and the reason for Dot.Today

### Back-End

- Secure JWT Authentication - Spring Security with JWT Tokens, password encryption, and user-specific access controls
- RESTful Journal Entry API - Full CRUD operations (Create, Read, Update, Delete) for journal entries with persistence, Flyway database migrations, and JPA/Hibernate ORM for data management
- AI-Powered Weekly Summaries - Google Gemini AI analyzes the past week of entries and generates a summary

## Technologies

### Front-End

- JavaScript
- React
- React Router
- Vite
- HTML
- CSS

### Back-End

- Java
- Spring Boot
- Maven
- Hibernate
- Spring Security
- MySQL

## Setup

- Setup instructions

  - Configure MySQL using a CLI install
  - Run `mysql_secure_installation` to configure the new install
  - Set a root password
  - Disallow remote root login
  - Remove anon users
  - Remove test database
  - Login as root (enter the password you chose above):

    ```bash
    mysql -u root -p
    ```

    You should now see:

    ```bash
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 11
    Server version: 9.4.0 Homebrew

    Copyright (c) 2000, 2025, Oracle and/or its affiliates.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>
    ```

    Create a Database and a user to connect from your Java app:

    ```sql
    -- Database for the app (copy the line and hit enter to create the database)
    CREATE DATABASE unit_2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
    -- Now have a database called "unit_2". You can view it and all the other default databases by running the following:
    SHOW DATABASES;

    -- Create a low privilege local user to allow connection to the new database. This is a weak test password.
    CREATE USER 'unit_2_user'@'localhost' IDENTIFIED BY 'testpass';

    // -- Grant unit_2_user the ability to make changes to the database
    // GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP ON unit_2.* TO 'unit_2_user'@'localhost';

    --  Grant all privileges
    GRANT ALL PRIVILEGES ON unit_2.* TO 'unit_2_user'@'localhost';

    -- Ensure changes are reflected in the system
    FLUSH PRIVILEGES;
    ```

## ER Diagram

<iframe width="560" height="315" src='https://dbdiagram.io/e/690d39246735e11170a56fb0/690d5d0c6735e11170a8df09'> </iframe>

- https://dbdiagram.io/d/LC-Unit-2-ERD-V2-690d39246735e11170a56fb0
[ERD][ERD_Link]
[ERD_Link]: https://dbdiagram.io/d/LC-Unit-2-ERD-V2-690d39246735e11170a56fb0
[ERD](https://dbdiagram.io/d/LC-Unit-2-ERD-V2-690d39246735e11170a56fb0)
![ERD](https://dbdiagram.io/d/LC-Unit-2-ERD-V2-690d39246735e11170a56fb0)

## Future Features

- Additional fields for journal entries to allow for keywords, sorting, etc.
- Emotes/Categorization of entries
- In-depth UI dashboard to watch categorized entries add up in a specific area
- Search or sorting of entries
- Prompts to get the user started
- AI prompts to cue reflections
- AI soundboard for reflection and discussion
- Sharing with others feature to create a community
- Light and dark mode to simulate a morning and evening mode with different cues "What's one intention for today?" and "What did you feel proud of today?"
- Timer for distraction-free reflection
