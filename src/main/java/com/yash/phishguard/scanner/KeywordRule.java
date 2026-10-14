package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class KeywordRule implements ScanRule {

    private static final List<String> KEYWORDS =
            List.of("login", "verify", "secure", "bank", "update", "account");

    @Override
    public RuleResult evaluate(String url) {
        String lower = url.toLowerCase();
        long matches = KEYWORDS.stream().filter(lower::contains).count();
        int points = (int) Math.min(matches * 10, 25);
        boolean triggered = matches > 0;
        return new RuleResult(
                "SUSPICIOUS_KEYWORDS",
                "URL contains words commonly used in phishing attempts",
                points,
                triggered
        );
    }
}