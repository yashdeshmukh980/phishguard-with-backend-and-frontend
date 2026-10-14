package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;

@Component
public class SubdomainRule implements ScanRule {

    @Override
    public RuleResult evaluate(String url) {
        String cleaned = url.replaceAll("^https?://", "").split("/")[0];
        long dotCount = cleaned.chars().filter(c -> c == '.').count();
        boolean triggered = dotCount > 3;
        return new RuleResult(
                "TOO_MANY_SUBDOMAINS",
                "URL has an unusually high number of subdomains",
                15,
                triggered
        );
    }
}