package com.yash.phishguard.service;

import com.yash.phishguard.model.Verdict;
import com.yash.phishguard.scanner.RuleResult;
import com.yash.phishguard.scanner.ScanRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScanService {

    private final List<ScanRule> rules;

    @Autowired
    public ScanService(List<ScanRule> rules) {
        this.rules = rules;
    }

    public ScanResult scanUrl(String url) {
        List<RuleResult> results = rules.stream()
                .map(rule -> rule.evaluate(url))
                .filter(RuleResult::isTriggered)
                .toList();

        int totalScore = results.stream()
                .mapToInt(RuleResult::getPoints)
                .sum();

        totalScore = Math.min(totalScore, 100);

        Verdict verdict = totalScore <= 30 ? Verdict.SAFE
                : totalScore <= 60 ? Verdict.SUSPICIOUS
                : Verdict.DANGEROUS;

        return new ScanResult(url, totalScore, verdict, results);
    }
}