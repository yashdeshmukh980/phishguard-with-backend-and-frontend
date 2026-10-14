package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AtSymbolRuleTest {

    private final AtSymbolRule rule = new AtSymbolRule();

    @Test
    void triggersWhenAtSymbolPresent() {
        RuleResult result = rule.evaluate("https://paypal.com@evil-site.ru");
        assertTrue(result.isTriggered());
        assertEquals(20, result.getPoints());
    }

    @Test
    void doesNotTriggerWithoutAtSymbol() {
        RuleResult result = rule.evaluate("https://example.com");
        assertFalse(result.isTriggered());
    }
}