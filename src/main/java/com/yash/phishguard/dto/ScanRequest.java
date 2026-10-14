package com.yash.phishguard.dto;

import jakarta.validation.constraints.NotBlank;

public class ScanRequest {

    @NotBlank(message = "URL must not be blank")
    private String url;

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}