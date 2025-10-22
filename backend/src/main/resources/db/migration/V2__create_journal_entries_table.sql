-- Journal entries reference users.id 

CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  title VARCHAR(255),
  content TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_journal_entries_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- index for find entries by user
CREATE INDEX ix_journal_entries_user_id ON journal_entries (user_id);