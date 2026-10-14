package com.yash.phishguard.scanner;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class IpAddressRuleTest {

    private final IpAddressRule rule = new IpAddressRule();

    @Test
    void triggersOnIpAddress() {
        RuleResult result = rule.evaluate("http://192.168.1.1/login");
        assertTrue(result.isTriggered());
        assertEquals(30, result.getPoints());
    }

    @Test
    void doesNotTriggerOnNormalDomain() {
        RuleResult result = rule.evaluate("https://www.google.com");
        assertFalse(result.isTriggered());
    }
}