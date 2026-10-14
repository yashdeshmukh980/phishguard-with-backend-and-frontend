package com.yash.phishguard.service;

import com.yash.phishguard.model.Verdict;
import com.yash.phishguard.scanner.RuleResult;
import java.util.List;

public class ScanResult {
    private String url;
    private int score;
    private Verdict verdict;
    private List<RuleResult> reasons;

    public ScanResult(String url, int score, Verdict verdict, List<RuleResult> reasons) {
        this.url = url;
        this.score = score;
        this.verdict = verdict;
        this.reasons = reasons;
    }

    public String getUrl() { return url; }
    public int getScore() { return score; }
    public Verdict getVerdict() { return verdict; }
    public List<RuleResult> getReasons() { return reasons; }
}