package com.yash.phishguard.scanner;

import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

@Component
public class IpAddressRule implements ScanRule {

    private static final Pattern IP_PATTERN =
            Pattern.compile("^(https?://)?\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}");

    @Override
    public RuleResult evaluate(String url) {
        boolean triggered = IP_PATTERN.matcher(url).find();
        return new RuleResult(
                "IP_ADDRESS",
                "URL uses an IP address instead of a domain name",
                30,
                triggered
        );
    }
}