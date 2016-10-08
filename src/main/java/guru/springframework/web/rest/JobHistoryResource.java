package guru.springframework.web.rest;

import com.codahale.metrics.annotation.Timed;
import guru.springframework.domain.JobHistory;
import guru.springframework.repository.JobHistoryRepository;
import guru.springframework.web.rest.util.HeaderUtil;
import guru.springframework.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JobHistory.
 */
@RestController
@RequestMapping("/api")
public class JobHistoryResource {

    private final Logger log = LoggerFactory.getLogger(JobHistoryResource.class);

    @Inject
    private JobHistoryRepository jobHistoryRepository;

    /**
     * POST  /job-histories : Create a new jobHistory.
     *
     * @param jobHistory the jobHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobHistory, or with status 400 (Bad Request) if the jobHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/job-histories",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobHistory> createJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to save JobHistory : {}", jobHistory);
        if (jobHistory.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("jobHistory", "idexists", "A new jobHistory cannot already have an ID")).body(null);
        }
        JobHistory result = jobHistoryRepository.save(jobHistory);
        return ResponseEntity.created(new URI("/api/job-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("jobHistory", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-histories : Updates an existing jobHistory.
     *
     * @param jobHistory the jobHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobHistory,
     * or with status 400 (Bad Request) if the jobHistory is not valid,
     * or with status 500 (Internal Server Error) if the jobHistory couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/job-histories",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobHistory> updateJobHistory(@RequestBody JobHistory jobHistory) throws URISyntaxException {
        log.debug("REST request to update JobHistory : {}", jobHistory);
        if (jobHistory.getId() == null) {
            return createJobHistory(jobHistory);
        }
        JobHistory result = jobHistoryRepository.save(jobHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("jobHistory", jobHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-histories : get all the jobHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobHistories in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/job-histories",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<JobHistory>> getAllJobHistories(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of JobHistories");
        Page<JobHistory> page = jobHistoryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/job-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /job-histories/:id : get the "id" jobHistory.
     *
     * @param id the id of the jobHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobHistory, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/job-histories/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JobHistory> getJobHistory(@PathVariable Long id) {
        log.debug("REST request to get JobHistory : {}", id);
        JobHistory jobHistory = jobHistoryRepository.findOne(id);
        return Optional.ofNullable(jobHistory)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /job-histories/:id : delete the "id" jobHistory.
     *
     * @param id the id of the jobHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/job-histories/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteJobHistory(@PathVariable Long id) {
        log.debug("REST request to delete JobHistory : {}", id);
        jobHistoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("jobHistory", id.toString())).build();
    }

}
