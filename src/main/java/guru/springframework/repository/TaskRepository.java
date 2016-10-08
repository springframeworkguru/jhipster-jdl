package guru.springframework.repository;

import guru.springframework.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Task entity.
 */
@SuppressWarnings("unused")
public interface TaskRepository extends JpaRepository<Task,Long> {

}
