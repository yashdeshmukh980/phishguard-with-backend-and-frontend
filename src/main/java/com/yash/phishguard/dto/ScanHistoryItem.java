package com.yash.phishguard.dto;

import com.yash.phishguard.model.Verdict;
import java.time.LocalDateTime;

public class ScanHistoryItem {
    private Long id;
    private String url;
    private Integer score;
    private Verdict verdict;
    private LocalDateTime scannedAt;

    public ScanHistoryItem(Long id, String url, Integer score, Verdict verdict, LocalDateTime scannedAt) {
        this.id = id;
        this.url = url;
        this.score = score;
        this.verdict = verdict;
        this.scannedAt = scannedAt;
    }

    public Long getId() { return id; }
    public String getUrl() { return url; }
    public Integer getScore() { return score; }
    public Verdict getVerdict() { return verdict; }
    public LocalDateTime getScannedAt() { return scannedAt; }
}