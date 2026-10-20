package com.yash.phishguard.scanner;

import com.yash.phishguard.model.ThreatCategory;
import com.yash.phishguard.model.Verdict;
import java.util.List;

public class ThreatCategorizer {

    private ThreatCategorizer() {}

    public static ThreatCategory categorize(Verdict verdict, List<RuleResult> reasons) {
        if (verdict == null || verdict == Verdict.SAFE) {
            return null;
        }

        ThreatCategory best = null;
        int bestPoints = -1;

        for (RuleResult r : reasons) {
            if (!r.isTriggered()) continue;
            ThreatCategory c = categoryFor(r.getRuleName());
            boolean higher = r.getPoints() > bestPoints;
            boolean tieWin = best != null && r.getPoints() == bestPoints && c.ordinal() < best.ordinal();
            if (higher || tieWin) {
                best = c;
                bestPoints = r.getPoints();
            }
        }
        return best == null ? ThreatCategory.OTHER : best;
    }

    private static ThreatCategory categoryFor(String ruleName) {
        return switch (ruleName) {
            case "EXECUTABLE_DOWNLOAD" -> ThreatCategory.MALWARE;
            case "AT_SYMBOL" -> ThreatCategory.PHISHING;
            case "SUSPICIOUS_KEYWORDS" -> ThreatCategory.CREDENTIAL_HARVESTING;
            case "IP_ADDRESS", "TOO_MANY_SUBDOMAINS", "LONG_URL" -> ThreatCategory.SUSPICIOUS_DOMAIN;
            default -> ThreatCategory.OTHER;
        };
    }
}