package com.rueter.dottoday.controllers;

import com.rueter.dottoday.models.JournalEntry;
import com.rueter.dottoday.repositories.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal-entries")
public class JournalEntryController {
    
    @Autowired
    private JournalEntryRepository journalEntryRepository;

    // CREATE — POST
    @PostMapping
    public JournalEntry createJournalEntry(@RequestBody JournalEntry entry) {
        return journalEntryRepository.save(entry);
    }

    // READ — GET all
    @GetMapping
    public List<JournalEntry> getAllJournalEntries() {
        return journalEntryRepository.findAll();
    }

    // READ — GET one by ID
    @GetMapping("/{id}")
    public JournalEntry getJournalEntryById(@PathVariable Long id) {
        return journalEntryRepository.findById(id).orElse(null);
    }

    // UPDATE — PUT
    @PutMapping("/{id}")
    public JournalEntry updateJournalEntry(@PathVariable Long id, @RequestBody JournalEntry updatedEntry) {
        return journalEntryRepository.findById(id)
                .map(entry -> {
                    entry.setTitle(updatedEntry.getTitle());
                    entry.setContent(updatedEntry.getContent());
                    return journalEntryRepository.save(entry);
                })
                .orElse(null);
    }

    // DELETE — DELETE
    @DeleteMapping("/{id}")
    public String deleteJournalEntry(@PathVariable Long id) {
        journalEntryRepository.deleteById(id);
        return "Journal entry deleted successfully.";
    }


}
