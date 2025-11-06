package com.rueter.dottoday.services;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.rueter.dottoday.models.JournalEntry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiSummaryService {

    @Value("${google.ai.api-key}")
    private String apiKey;

    public String generateWeeklySummary(List<JournalEntry> entries) {
        if (entries.isEmpty()) {
            return "No journal entries found for the past week.";
        }

        // Build prompt with all journal entries
        StringBuilder prompt = new StringBuilder();

        // For each entry in the entries add the date, title, and content to form a
        // block of string for AI to summarize
        for (JournalEntry entry : entries) {
            prompt.append("Date: ").append(entry.getDateCreated()).append("\n");
            prompt.append("Title: ").append(entry.getTitle()).append("\n");
            prompt.append("Content: ").append(entry.getContent()).append("\n\n");
        }

        try {
            // Create client with API key using builder
            Client client = Client.builder().apiKey(apiKey).build();

            // Combine AI prompt with journal entries prompt
            String fullPrompt = "Please write a short weekly summary (3-5 sentences) of the following journal entries:\n\n" + prompt.toString();

            // Generate the Gemini AI response using the full prompt
            GenerateContentResponse response = client.models.generateContent("gemini-2.0-flash-001", fullPrompt, null);

            return response.text();
        } catch (Exception e) {
            return "Error generating summary: " + e.getMessage();
        }
    }
}
