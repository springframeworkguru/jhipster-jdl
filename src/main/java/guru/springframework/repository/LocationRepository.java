package guru.springframework.repository;

import guru.springframework.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Location entity.
 */
@SuppressWarnings("unused")
public interface LocationRepository extends JpaRepository<Location,Long> {

}
