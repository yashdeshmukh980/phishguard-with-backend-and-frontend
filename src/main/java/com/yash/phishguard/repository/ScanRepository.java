package com.yash.phishguard.repository;

import com.yash.phishguard.model.Scan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScanRepository extends JpaRepository<Scan, Long> {
    Page<Scan> findByUserId(Long userId, Pageable pageable);
}