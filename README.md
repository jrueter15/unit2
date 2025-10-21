# unit-2-project-dotToday

- Setup instructions
  - Configure MySQL using a CLI install
  - Run `mysql_secure_installation` to configure the new install
  - Set a decent root password. Set a basic one for the time being.
  - Disallow remote root login
  - Remove anon users
  - Remove test db
  - Login as root (enter the pass you chose above):
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
    
    Create a DB and a user to connect from your Java app:
    
    ```sql
    -- DB for the app (copy the line and hit enter to create the db)
    CREATE DATABASE unit_2 CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
    -- Now have a db called "unit_2". You can view it and all the other default dbs by running the following:
    SHOW DATABASES;
    
    -- Create a low privilege local user to allow connection to the new db. This is a weak test password.
    CREATE USER 'unit_2_user'@'localhost' IDENTIFIED BY 'testpass';
    
    -- Grant unit_2_user the ability to make changes to the db
    GRANT ALL PRIVILEGES ON unit_2.* TO 'unit_2_user'@'localhost';
    
    -- Ensure changes are relflected in the system
    FLUSH PRIVILEGES;
    ```
