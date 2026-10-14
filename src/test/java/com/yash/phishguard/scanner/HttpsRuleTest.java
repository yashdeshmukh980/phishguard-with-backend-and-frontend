package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class HttpsRuleTest {

    private final HttpsRule rule = new HttpsRule();

    @Test
    void triggersWhenNotHttps() {
        RuleResult result = rule.evaluate("http://example.com");
        assertTrue(result.isTriggered());
        assertEquals(15, result.getPoints());
    }

    @Test
    void doesNotTriggerWhenHttps() {
        RuleResult result = rule.evaluate("https://example.com");
        assertFalse(result.isTriggered());
    }
}