package com.yash.phishguard.repository;

import com.yash.phishguard.model.DomainList;
import com.yash.phishguard.model.ListType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DomainListRepository extends JpaRepository<DomainList, Long> {
    Optional<DomainList> findByDomain(String domain);
    boolean existsByDomainAndType(String domain, ListType type);
}