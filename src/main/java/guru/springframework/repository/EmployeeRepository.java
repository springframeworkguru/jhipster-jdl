package guru.springframework.repository;

import guru.springframework.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Employee entity.
 */
@SuppressWarnings("unused")
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
