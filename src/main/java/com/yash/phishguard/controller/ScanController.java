package com.yash.phishguard.controller;

import com.yash.phishguard.dto.ScanHistoryItem;
import com.yash.phishguard.dto.ScanRequest;
import com.yash.phishguard.dto.ScanResponse;
import com.yash.phishguard.model.Scan;
import com.yash.phishguard.model.ScanReason;
import com.yash.phishguard.model.User;
import com.yash.phishguard.repository.ScanReasonRepository;
import com.yash.phishguard.repository.ScanRepository;
import com.yash.phishguard.repository.UserRepository;
import com.yash.phishguard.scanner.RuleResult;
import com.yash.phishguard.service.ScanResult;
import com.yash.phishguard.service.ScanService;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/scans")
public class ScanController {

    private final ScanService scanService;
    private final ScanRepository scanRepository;
    private final ScanReasonRepository scanReasonRepository;
    private final UserRepository userRepository;

    public ScanController(ScanService scanService,
                          ScanRepository scanRepository,
                          ScanReasonRepository scanReasonRepository,
                          UserRepository userRepository) {
        this.scanService = scanService;
        this.scanRepository = scanRepository;
        this.scanReasonRepository = scanReasonRepository;
        this.userRepository = userRepository;
    }

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }

    @PostMapping
    public ScanResponse scan(@Valid @RequestBody ScanRequest request,
                             Authentication authentication) {
        User user = currentUser(authentication);
        ScanResult result = scanService.scanUrl(request.getUrl());

        Scan scan = new Scan();
        scan.setUser(user);
        scan.setUrl(result.getUrl());
        scan.setRiskScore(result.getScore());
        scan.setVerdict(result.getVerdict());
        scan = scanRepository.save(scan);

        for (RuleResult r : result.getReasons()) {
            ScanReason reason = new ScanReason();
            reason.setScan(scan);
            reason.setRuleName(r.getRuleName());
            reason.setDescription(r.getDescription());
            reason.setPoints(r.getPoints());
            scanReasonRepository.save(reason);
        }

        return new ScanResponse(
                scan.getId(),
                result.getUrl(),
                result.getScore(),
                result.getVerdict(),
                result.getReasons()
        );
    }

    @GetMapping
    public List<ScanHistoryItem> history(Authentication authentication,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size) {
        User user = currentUser(authentication);
        Pageable pageable = PageRequest.of(page, size, Sort.by("scannedAt").descending());

        return scanRepository.findByUserId(user.getId(), pageable)
                .getContent()
                .stream()
                .map(s -> new ScanHistoryItem(
                        s.getId(), s.getUrl(), s.getRiskScore(), s.getVerdict(), s.getScannedAt()))
                .toList();
    }
}