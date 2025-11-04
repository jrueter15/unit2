package com.rueter.dottoday.controllers;

import com.rueter.dottoday.models.JournalEntry;
import com.rueter.dottoday.models.User;
import com.rueter.dottoday.repositories.JournalEntryRepository;
import com.rueter.dottoday.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/journal-entries")
public class JournalEntryController {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE — POST
    @PostMapping
    public JournalEntry createJournalEntry(@RequestBody JournalEntry entry, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        entry.setUser(user);
        return journalEntryRepository.save(entry);
    }

    // READ — GET all (only current user's entries)
    @GetMapping
    public List<JournalEntry> getAllJournalEntries(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return journalEntryRepository.findByUserId(user.getId());
    }

    // READ — GET one by ID (only if owned by current user)
    @GetMapping("/{id}")
    public JournalEntry getJournalEntryById(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to access this entry");
        }

        return entry;
    }

    // UPDATE — PUT (only if owned by current user)
    @PutMapping("/{id}")
    public JournalEntry updateJournalEntry(@PathVariable Long id, @RequestBody JournalEntry updatedEntry, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return journalEntryRepository.findById(id)
                .map(entry -> {
                    if (!entry.getUser().getId().equals(user.getId())) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to update this entry");
                    }
                    entry.setTitle(updatedEntry.getTitle());
                    entry.setContent(updatedEntry.getContent());
                    return journalEntryRepository.save(entry);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found"));
    }

    // DELETE — DELETE (only if owned by current user)
    @DeleteMapping("/{id}")
    public String deleteJournalEntry(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to delete this entry");
        }

        journalEntryRepository.deleteById(id);
        return "Journal entry deleted successfully.";
    }


}
