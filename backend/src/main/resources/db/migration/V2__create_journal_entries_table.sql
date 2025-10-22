CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  content TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_journal_entries_user
    FOREIGN KEY (username)
    REFERENCES users(username)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;