package guru.springframework.web.rest;

import guru.springframework.JdlDemoApp;
import guru.springframework.domain.Region;
import guru.springframework.repository.RegionRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RegionResource REST controller.
 *
 * @see RegionResource
 */
@RunWith(SpringRunner.class)

@SpringBootTest(classes = JdlDemoApp.class)

public class RegionResourceIntTest {

    private static final Long DEFAULT_REGION_ID = 1L;
    private static final Long UPDATED_REGION_ID = 2L;
    private static final String DEFAULT_REGION_NAME = "AAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBB";

    @Inject
    private RegionRepository regionRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restRegionMockMvc;

    private Region region;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RegionResource regionResource = new RegionResource();
        ReflectionTestUtils.setField(regionResource, "regionRepository", regionRepository);
        this.restRegionMockMvc = MockMvcBuilders.standaloneSetup(regionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Region createEntity(EntityManager em) {
        Region region = new Region()
                .regionId(DEFAULT_REGION_ID)
                .regionName(DEFAULT_REGION_NAME);
        return region;
    }

    @Before
    public void initTest() {
        region = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegion() throws Exception {
        int databaseSizeBeforeCreate = regionRepository.findAll().size();

        // Create the Region

        restRegionMockMvc.perform(post("/api/regions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(region)))
                .andExpect(status().isCreated());

        // Validate the Region in the database
        List<Region> regions = regionRepository.findAll();
        assertThat(regions).hasSize(databaseSizeBeforeCreate + 1);
        Region testRegion = regions.get(regions.size() - 1);
        assertThat(testRegion.getRegionId()).isEqualTo(DEFAULT_REGION_ID);
        assertThat(testRegion.getRegionName()).isEqualTo(DEFAULT_REGION_NAME);
    }

    @Test
    @Transactional
    public void getAllRegions() throws Exception {
        // Initialize the database
        regionRepository.saveAndFlush(region);

        // Get all the regions
        restRegionMockMvc.perform(get("/api/regions?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(region.getId().intValue())))
                .andExpect(jsonPath("$.[*].regionId").value(hasItem(DEFAULT_REGION_ID.intValue())))
                .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME.toString())));
    }

    @Test
    @Transactional
    public void getRegion() throws Exception {
        // Initialize the database
        regionRepository.saveAndFlush(region);

        // Get the region
        restRegionMockMvc.perform(get("/api/regions/{id}", region.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(region.getId().intValue()))
            .andExpect(jsonPath("$.regionId").value(DEFAULT_REGION_ID.intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRegion() throws Exception {
        // Get the region
        restRegionMockMvc.perform(get("/api/regions/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegion() throws Exception {
        // Initialize the database
        regionRepository.saveAndFlush(region);
        int databaseSizeBeforeUpdate = regionRepository.findAll().size();

        // Update the region
        Region updatedRegion = regionRepository.findOne(region.getId());
        updatedRegion
                .regionId(UPDATED_REGION_ID)
                .regionName(UPDATED_REGION_NAME);

        restRegionMockMvc.perform(put("/api/regions")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRegion)))
                .andExpect(status().isOk());

        // Validate the Region in the database
        List<Region> regions = regionRepository.findAll();
        assertThat(regions).hasSize(databaseSizeBeforeUpdate);
        Region testRegion = regions.get(regions.size() - 1);
        assertThat(testRegion.getRegionId()).isEqualTo(UPDATED_REGION_ID);
        assertThat(testRegion.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    public void deleteRegion() throws Exception {
        // Initialize the database
        regionRepository.saveAndFlush(region);
        int databaseSizeBeforeDelete = regionRepository.findAll().size();

        // Get the region
        restRegionMockMvc.perform(delete("/api/regions/{id}", region.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Region> regions = regionRepository.findAll();
        assertThat(regions).hasSize(databaseSizeBeforeDelete - 1);
    }
}
