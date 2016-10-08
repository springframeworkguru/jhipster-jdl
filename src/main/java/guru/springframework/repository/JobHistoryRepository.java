package guru.springframework.repository;

import guru.springframework.domain.JobHistory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the JobHistory entity.
 */
@SuppressWarnings("unused")
public interface JobHistoryRepository extends JpaRepository<JobHistory,Long> {

}
