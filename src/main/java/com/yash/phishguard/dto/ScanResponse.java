package com.yash.phishguard.dto;

import com.yash.phishguard.model.Verdict;
import com.yash.phishguard.scanner.RuleResult;
import java.util.List;

public class ScanResponse {
    private Long id;
    private String url;
    private int score;
    private Verdict verdict;
    private List<RuleResult> reasons;

    public ScanResponse(Long id, String url, int score, Verdict verdict, List<RuleResult> reasons) {
        this.id = id;
        this.url = url;
        this.score = score;
        this.verdict = verdict;
        this.reasons = reasons;
    }

    public Long getId() { return id; }
    public String getUrl() { return url; }
    public int getScore() { return score; }
    public Verdict getVerdict() { return verdict; }
    public List<RuleResult> getReasons() { return reasons; }
}