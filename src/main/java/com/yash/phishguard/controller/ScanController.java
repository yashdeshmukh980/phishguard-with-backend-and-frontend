package com.yash.phishguard.controller;

import com.yash.phishguard.dto.ScanRequest;
import com.yash.phishguard.dto.ScanResponse;
import com.yash.phishguard.service.ScanResult;
import com.yash.phishguard.service.ScanService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/scans")
public class ScanController {

    private final ScanService scanService;

    public ScanController(ScanService scanService) {
        this.scanService = scanService;
    }

    @PostMapping

    public ScanResponse scan(@Valid @RequestBody ScanRequest request) {
        ScanResult result = scanService.scanUrl(request.getUrl());
        return new ScanResponse(
                null,
                result.getUrl(),
                result.getScore(),
                result.getVerdict(),
                result.getReasons()
        );
    }
}