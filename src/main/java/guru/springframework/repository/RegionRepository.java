package guru.springframework.repository;

import guru.springframework.domain.Region;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Region entity.
 */
@SuppressWarnings("unused")
public interface RegionRepository extends JpaRepository<Region,Long> {

}
