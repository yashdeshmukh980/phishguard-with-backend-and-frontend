package com.yash.phishguard.repository;

import com.yash.phishguard.model.ScanReason;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScanReasonRepository extends JpaRepository<ScanReason, Long> {
    List<ScanReason> findByScanId(Long scanId);
}