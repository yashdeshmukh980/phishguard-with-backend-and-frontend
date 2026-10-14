package com.yash.phishguard.scanner;

public class RuleResult {
    private String ruleName;
    private String description;
    private int points;
    private boolean triggered;

    public RuleResult(String ruleName, String description, int points, boolean triggered) {
        this.ruleName = ruleName;
        this.description = description;
        this.points = points;
        this.triggered = triggered;
    }

    public String getRuleName() { return ruleName; }
    public String getDescription() { return description; }
    public int getPoints() { return points; }
    public boolean isTriggered() { return triggered; }
}