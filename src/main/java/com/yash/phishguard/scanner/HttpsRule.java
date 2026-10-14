package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;

@Component
public class HttpsRule implements ScanRule {

    @Override
    public RuleResult evaluate(String url) {
        boolean triggered = !url.toLowerCase().startsWith("https://");
        return new RuleResult(
                "NO_HTTPS",
                "URL does not use secure HTTPS encryption",
                15,
                triggered
        );
    }
}