CREATE TABLE journal_entries (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255),
    content TEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_journal_entries_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);