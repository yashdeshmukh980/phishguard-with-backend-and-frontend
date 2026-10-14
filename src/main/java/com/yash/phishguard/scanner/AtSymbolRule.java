package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;

@Component
public class AtSymbolRule implements ScanRule {

    @Override
    public RuleResult evaluate(String url) {
        boolean triggered = url.contains("@");
        return new RuleResult(
                "AT_SYMBOL",
                "URL contains '@', which can hide the real destination",
                20,
                triggered
        );
    }
}