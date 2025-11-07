package com.rueter.dottoday.repositories;

import com.rueter.dottoday.models.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
    List<JournalEntry> findByUserId(Long userId);
    List<JournalEntry> findByUserIdAndDateCreatedAfter(Long userId, LocalDateTime dateCreated);
}