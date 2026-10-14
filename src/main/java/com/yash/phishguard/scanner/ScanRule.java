package com.yash.phishguard.scanner;

public interface ScanRule {
    RuleResult evaluate(String url);
}