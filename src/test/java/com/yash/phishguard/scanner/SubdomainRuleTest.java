package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SubdomainRuleTest {

    private final SubdomainRule rule = new SubdomainRule();

    @Test
    void triggersOnManySubdomains() {
        RuleResult result = rule.evaluate("https://secure.login.account.verify.fake-bank.com");
        assertTrue(result.isTriggered());
        assertEquals(15, result.getPoints());
    }

    @Test
    void doesNotTriggerOnNormalDomain() {
        RuleResult result = rule.evaluate("https://www.example.com");
        assertFalse(result.isTriggered());
    }
}