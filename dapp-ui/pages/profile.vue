<template>
  <div>
    <LoadingOverlay :show="loading" :loadingMsg="loadingMsg" />
    <CactusNavbar active="profile" />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            <div class="row">
              <div class="col-lg-12">
                <div class="main-profile">
                  <div class="row">
                    <div
                      class="col-lg-4"
                      :style="{
                        backgroundImage: `url(${backgroundImagePath})`,
                        backgroundSize: 'cover',
                        borderRadius: '50px',
                      }"
                    >
                      <img
                        :src="'https://robohash.org/' + address"
                        alt=""
                        :style="'border-radius: 23px;'"
                      />
                    </div>
                    <div class="col-lg-4 align-self-center">
                      <div class="main-info header-text">
                        <span style="background-color: green;">
                          {{ user.points }} pts
                        </span>
                        <h6 id="TRXaddr" style="font-size: 10pt;">
                          {{ address }}
                        </h6>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>
                        <p>
                          ...................................................................................................
                        </p>

                        <div class="main-border-button">
                          <a href="#">Check address Data</a>
                        </div>
                      </div>
                    </div>
                    <CactusRightBar :complete="complete" />
                  </div>
                  <div class="most-popular">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="heading-section">
                          <h4>
                            <em>Acquired</em>
                            Green Projects
                          </h4>
                        </div>
                        <div class="row" id="project-list">
                          <CactusProject
                            v-for="project in user.purchases"
                            :project="project"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="most-popular">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="heading-section">
                          <h4>
                            <em>Created</em>
                            Green Projects
                          </h4>
                        </div>
                        <div class="row" id="project-list">
                          <CactusProject
                            v-for="project in user.projects"
                            :project="project"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CactusDonations :donations="user.donations"/>
            </div>
          </div>
        </div>
      </div>

      <CactusFooter />
    </div>
  </div>
</template>

<script>
import CactusFooter from '~/components/CactusFooter'
import CactusNavbar from '../components/CactusNavbar.vue'
import backgroundImagePath from '~/assets/images/patternCactus.png'
import CactusProject from '../components/CactusProject.vue'
import CactusDonations from '../components/CactusDonations.vue'
import CactusRightBar from '../components/CactusRightBar.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import {
  fetchAllProjects,
  setCactusContract,
  getTronWeb,
  getUserByAddress,
  getAllUserDataByAddress,
} from '~/plugins/utils'

export default {
  name: 'Profile',
  components: {
    CactusNavbar,
    CactusFooter,
    CactusProject,
    CactusDonations,
    CactusRightBar,
    LoadingOverlay,
  },
  data() {
    return {
      address: tronWeb.defaultAddress.base58,
      backgroundImagePath,
      user: {},
      complete: {},
    }
  },
  async mounted() {
    getTronWeb()
    setTimeout(async () => {
      // init contract object
      await setCactusContract()
      this.$store.commit('toggleLoading')
      this.loadingMsg = 'Fetching user data...'
      const user = await getAllUserDataByAddress(this.address)
      this.loadingMsg = 'Saving user data...'
      this.user = user
      // calculate: ['projectsAcquired', 'projectsCreated', 'projectsFullyFunded', 'successfulDonations', 'pendingDonations', 'totalDonated'],
      let count = 0
      let c2 = 0
      this.loadingMsg = 'Calculating metrics...'
      user.projects.forEach((project) => {
        if (project.status == 1) count++
      })
      user.donations.forEach((donation) => {
        if (donation.fulfilled == 1) count++
      })
      let total = 0
      user.donations.forEach((donation) => {
        total += donation.amount / 10 ** 6
      })
      this.complete = {
        projectsAcquired: user.purchases.length,
        projectsCreated: user.projects.length,
        projectsFullyFunded: count,
        successfulDonations: c2,
        pendingDonations: user.donations.length - c2,
        totalDonated: total,
      }
      this.$store.commit('toggleLoading')
    }, 50)
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
}
</script>

<style>
.main-profile-ul {
  -webkit-box-shadow: 0px 0px 60px 1px rgba(45, 255, 196, 0.9);
  -moz-box-shadow: 0px 0px 60px 1px rgba(45, 255, 196, 0.9);
  box-shadow: 0px 0px 60px 1px rgba(45, 255, 196, 0.9);
}
.most-popular .item ul {
  float: none !important;
  margin: 0 !important;
  /* no shadows */
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
