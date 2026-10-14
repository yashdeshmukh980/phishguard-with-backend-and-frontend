package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class KeywordRuleTest {

    private final KeywordRule rule = new KeywordRule();

    @Test
    void triggersOnSuspiciousKeywords() {
        RuleResult result = rule.evaluate("https://secure-login-verify.com/account/update");
        assertTrue(result.isTriggered());
        assertEquals(25, result.getPoints());
    }

    @Test
    void doesNotTriggerOnCleanUrl() {
        RuleResult result = rule.evaluate("https://www.example.com");
        assertFalse(result.isTriggered());
    }
}
