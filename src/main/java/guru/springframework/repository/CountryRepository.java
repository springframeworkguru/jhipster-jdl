package guru.springframework.repository;

import guru.springframework.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Country entity.
 */
@SuppressWarnings("unused")
public interface CountryRepository extends JpaRepository<Country,Long> {

}
