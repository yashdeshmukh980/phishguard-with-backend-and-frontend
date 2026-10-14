package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LongUrlRuleTest {

    private final LongUrlRule rule = new LongUrlRule();

    @Test
    void triggersOnLongUrl() {
        String longUrl = "https://example.com/" + "a".repeat(80);
        RuleResult result = rule.evaluate(longUrl);
        assertTrue(result.isTriggered());
        assertEquals(10, result.getPoints());
    }

    @Test
    void doesNotTriggerOnShortUrl() {
        RuleResult result = rule.evaluate("https://example.com");
        assertFalse(result.isTriggered());
    }
}