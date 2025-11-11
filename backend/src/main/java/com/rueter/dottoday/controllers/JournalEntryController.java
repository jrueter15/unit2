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

    // DRY - Get authenticated user from Authentication object
    private User getAuthenticatedUser(Authentication authentication) {
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    // DRY - Verify that the user owns the journal entry
    private void verifyOwnership(JournalEntry entry, User user) {
        if (!entry.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                "You don't have permission to access this entry");
        }
    }

    // DRY - Get entry by ID and verify ownership
    private JournalEntry getOwnedEntryById(Long id, User user) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found"));

        verifyOwnership(entry, user);
        return entry;
    }

    // CREATE — POST
    @PostMapping
    public JournalEntry createJournalEntry(@RequestBody JournalEntry entry, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        entry.setUser(user);
        return journalEntryRepository.save(entry);
    }

    // READ — GET all (only current user's entries)
    @GetMapping
    public List<JournalEntry> getAllJournalEntries(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return journalEntryRepository.findByUserId(user.getId());
    }

    // READ — GET one by ID (only if owned by current user)
    @GetMapping("/{id}")
    public JournalEntry getJournalEntryById(@PathVariable Long id, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return getOwnedEntryById(id, user);
    }

    // UPDATE — PUT (only if owned by current user)
    @PutMapping("/{id}")
    public JournalEntry updateJournalEntry(@PathVariable Long id, @RequestBody JournalEntry updatedEntry, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        JournalEntry entry = getOwnedEntryById(id, user);

        entry.setTitle(updatedEntry.getTitle());
        entry.setContent(updatedEntry.getContent());
        return journalEntryRepository.save(entry);
    }

    // DELETE — DELETE (only if owned by current user)
    @DeleteMapping("/{id}")
    public String deleteJournalEntry(@PathVariable Long id, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        // Verify ownership before deleting
        getOwnedEntryById(id, user);

        journalEntryRepository.deleteById(id);
        return "Journal entry deleted successfully.";
    }

}
