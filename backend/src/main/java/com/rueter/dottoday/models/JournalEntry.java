package com.rueter.dottoday.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "journal_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JournalEntry {

    // PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // FK linking journal_entries_user_id to id in users table
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "user_id",
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_journal_entries_user")
    )
    private User user;

    @Column(length = 255)
    private String title;

    // Use TEXT in MySQL; JPA @Lob (large object for large text)
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "date_created", nullable = false, updatable = false)
    private LocalDateTime dateCreated;

    @PrePersist
    protected void onCreate() {
        if (dateCreated == null) {
            dateCreated = LocalDateTime.now();
        }
    }
}