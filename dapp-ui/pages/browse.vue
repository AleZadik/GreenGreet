<template>
  <div>
    <CactusNavbar active="browse" />
    <LoadingOverlay :show="loading" :loadingMsg="loadingMsg" />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            <h1 style="color: #0e0f19;">NFT list</h1>
            <div class="most-popular">
              <div class="row">
                <div class="col-lg-12">
                  <div class="heading-section">
                    <h4>
                      <em>Green Projects</em>
                      Available
                    </h4>
                    <!-- <div class="category-buttons">
                      <button id="all" onclick="filterSelection('all')">
                        All
                      </button>
                      <button id="sus" onclick="filterSelection('sus')">
                        Sustainability
                      </button>
                      <button id="social" onclick="filterSelection('social')">
                        Social Good
                      </button>
                      <button id="edu" onclick="filterSelection('edu')">
                        Education
                      </button>
                      <button id="green" onclick="filterSelection('green')">
                        Green
                      </button>
                    </div> -->
                  </div>
                  <div class="row" id="project-list">
                    <CactusProject
                      v-for="project in projects"
                      :project="project"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CactusFooter />
  </div>
</template>

<script>
import CactusFooter from '../components/CactusFooter.vue'
import CactusNavbar from '../components/CactusNavbar.vue'
import CactusProject from '../components/CactusProject.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import {
  fetchAllProjects,
  setCactusContract,
  getTronWeb,
} from '~/plugins/utils'

export default {
  data() {
    return {
      projects: [],
      loadingMsg: 'Loading Project',
    }
  },
  components: {
    CactusNavbar,
    CactusProject,
    CactusFooter,
    LoadingOverlay,
  },
  methods: {},
  async mounted() {
    getTronWeb()

    setTimeout(async () => {
      // init contract object
      await setCactusContract()
      this.$store.commit('toggleLoading')
      this.loadingMsg = 'Fetching all projects...'
      const projects = await fetchAllProjects()
      this.$store.commit('toggleLoading')
      this.projects = projects
      console.log('The total number of projects: ' + projects.length)
    }, 50)
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>

<style scoped>
.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
<style>
.most-popular .item ul {
  float: none;
  margin: 0;
}

.category-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 1rem 0;
}
.category-buttons button {
  width: 20%;
  background-color: #fff;
  color: #000;
  border: 3px solid #fff;
  border-radius: 20px;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin: 1rem;
}
.category-buttons button:hover {
  background-color: rgb(255, 255, 255, 0.1);
  color: rgb(255, 255, 255);
  border: 3px solid #000;
}
.category-buttons button:focus {
  outline: none;
}
</style>
