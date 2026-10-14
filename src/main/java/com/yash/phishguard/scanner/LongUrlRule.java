package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;

@Component
public class LongUrlRule implements ScanRule {

    @Override
    public RuleResult evaluate(String url) {
        boolean triggered = url.length() > 75;
        return new RuleResult(
                "LONG_URL",
                "URL is unusually long, often used to hide the real destination",
                10,
                triggered
        );
    }
}