package com.yash.phishguard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "scan_reasons")
public class ScanReason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "scan_id", nullable = false)
    private Scan scan;

    private String ruleName;

    private String description;

    private Integer points;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Scan getScan() { return scan; }
    public void setScan(Scan scan) { this.scan = scan; }
    public String getRuleName() { return ruleName; }
    public void setRuleName(String ruleName) { this.ruleName = ruleName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
}