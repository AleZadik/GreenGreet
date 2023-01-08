<template>
  <div>
    <LoadingOverlay :show="loading" :loadingMsg="loadingMsg" />
    <CactusNavbar active="browse" />

    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            <div class="row">
              <div class="col-lg-8">
                <div class="featured-games header-text">
                  <div class="heading-section">
                    <h4 id="project-title">{{ project.name }}</h4>
                  </div>
                  <div class="section project-summary">
                    <h3 class="underline-words">Summary</h3>
                    <p class="project-info-text" id="project-summary">
                      {{ project.meta.summary }}
                    </p>
                  </div>
                  <div class="section project-description">
                    <h3 class="underline-words">Description</h3>
                    <p class="project-info-text" id="project-description" v-html="project.description">
                    </p>
                  </div>
                  <div class="section project-funding">
                    <h3 class="underline-words">Funding Goal</h3>
                    <p class="project-info-text" id="project-funding">$$$$</p>
                  </div>
                  <div class="section project-about">
                    <h3 class="underline-words">About Me</h3>
                    <p class="project-info-text" id="project-about">
                      {{ project.meta.about }}
                    </p>
                  </div>
                  <div class="section project-image">
                    <h3 class="underline-words">Picture</h3>
                    <img
                      id="project-image-1"
                      :src="
                        'https://' +
                        project.meta.file +
                        '.ipfs.nftstorage.link/'
                      "
                      alt=""
                      style="border-radius: 23px;
                        margin-bottom: 30px;
                        width: 300px;
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="donors top-downloaded">
                  <div class="heading-section">
                    <h4>
                      <em>ESG: </em>
                      {{ project.ESGSCORE }}
                    </h4>
                    <h4>
                      <em>Acquire</em>
                      NFT
                    </h4>
                    <button
                      id="buy-button"
                      @click="purchaseNow()"
                      v-if="project.status == 2"
                    >
                      Purchase ({{ project.currentPrice / 10 ** 6 }} TRX)
                    </button>
                    <div v-else style="text-align: center;">
                      <p style="overflow-wrap: anywhere; color: white;">
                        Project was acquired by:
                      </p>
                      <img
                        :src="
                          'https://robohash.org/' +
                          convertAddress(project.purchaser)
                        "
                        alt=""
                        style="border-radius: 23px; width: 100px;"
                      />
                      <small style="overflow-wrap: anywhere; color: white;">
                        {{ convertAddress(project.purchaser) }}
                      </small>
                    </div>
                  </div>
                  <hr />
                  <div class="heading-section">
                    <h4>
                      <em>Funding</em>
                      Goal
                    </h4>
                    <div class="progress">
                      <div
                        id="progress-bar"
                        class="progress-bar"
                        role="progressbar"
                        :aria-valuenow="
                          (project.totalFunds /
                            10 ** 6 /
                            (project.entirePrice / 10 ** 6)) *
                          100
                        "
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="
                          'width: ' +
                          (project.totalFunds /
                            10 ** 6 /
                            (project.entirePrice / 10 ** 6)) *
                            100 +
                          '%;'
                        "
                      ></div>
                    </div>
                    <span
                      style="color: white;"
                      id="progress-bar-text"
                      class="progress-bar-text"
                    >
                      {{ project.totalFunds / 10 ** 6 }}/{{
                        project.entirePrice / 10 ** 6
                      }}
                      (TRX)
                    </span>
                    <br />
                    <span
                      id="progress-bar-text-2"
                      class="progress-bar-text"
                    ></span>
                  </div>
                  <hr />
                  <div class="heading-section" v-if="project.status == 2">
                    <h4>
                      <em>Support</em>
                      Now
                    </h4>
                    <label for="amount" class="amtlabel">Amount (TRX)</label>
                    <input
                      type="amount"
                      name="amount"
                      id="amount"
                      placeholder="0 TRX"
                      v-model="amount"
                    />
                    <button @click="donateNow()" v-if="project.status == 2">
                      Support
                    </button>
                  </div>
                  <hr />
                  <div class="heading-section">
                    <h4>
                      <em>Top</em>
                      Donors
                    </h4>
                  </div>
                  <div class="top-donor-list">
                    <ul class="donation-list">
                      <li
                        id="donation-1"
                        v-for="(donation, index) in project.donations"
                        :key="index"
                      >
                        <img
                          :src="
                            'https://robohash.org/' +
                            convertAddress(donation.userAddress)
                          "
                          class="avatar templatemo-item"
                          :style="{
                            backgroundImage: `url(${backgroundImagePath})`,
                            backgroundSize: 'cover',
                            borderRadius: '50px',
                          }"
                        />
                        <!-- <h4 class="donation-position">#{{index}}</h4> -->
                        <h6>
                          <small class="donation-sender">
                            {{ convertAddress(donation.userAddress) }}
                          </small>
                        </h6>
                        <span>
                          <i class="fa fa-leaf" style="color: green;"></i>
                          <span class="donation-pts_earned">
                            {{ donation.amount / 10 ** 6 }}pts
                          </span>
                        </span>
                        <span>
                          <i class="fa fa-dollar" style="color: #33cb9a;"></i>
                          <span class="donation-amt_donated">
                            {{ donation.amount / 10 ** 6 }} TRX
                          </span>
                        </span>
                      </li>
                    </ul>
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
import CactusNavbar from '~/components/CactusNavbar.vue'
import CactusFooter from '../components/CactusFooter.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'
import backgroundImagePath from '~/assets/images/patternCactus.png'

import {
  donateToProject,
  purchaseProject,
  convertAddress,
  web3,
} from '~/plugins/utils'
export default {
  data() {
    return {
      project: {
        meta: {
          about: '',
          description: '',
          file: '',
          summary: '',
        },
      },
      amount: 0,
      loadingMsg: '',
      backgroundImagePath,
    }
  },
  components: {
    CactusNavbar,
    CactusFooter,
    LoadingOverlay,
  },
  mounted() {
    // get project from router
    if (this.$route.params.project) {
      this.project = this.$route.params.project
      // remove the '\n' from the description and add <br> instead
      this.project.description = this.project.description.replace(
        /\\n/g,
        '<br>'
      );
    } else {
      this.$bvToast.toast('It was not possible to GET the project', {
        title: 'Error',
        variant: 'error',
        solid: true,
        timeout: 6000,
      })
      this.$router.push('/browse')
    }
  },
  methods: {
    convertAddress,
    async donateNow() {
      const totalPrice = tronWeb.toSun(this.amount)
      this.$store.commit('toggleLoading')
      this.loadingMsg = 'Donating to project...'
      const res = await donateToProject(this.project, totalPrice)
      if (res) {
        this.$bvToast.toast('Donation successful', {
          title: 'Success',
          variant: 'success',
          solid: true,
          timeout: 6000,
        })
        this.$store.commit('toggleLoading')
        // redirect to browse
        this.$router.push('/browse')
      } else {
        this.$store.commit('toggleLoading')
        this.$bvToast.toast('It was not possible to donate to the project', {
          title: 'Error',
          variant: 'error',
          solid: true,
          timeout: 6000,
        })
      }
    },
    async purchaseNow() {
      this.$store.commit('toggleLoading')
      this.loadingMsg = 'Purchasing project. This can take a while...'
      const res = await purchaseProject(this.project.projectId)
      if (res) {
        this.$bvToast.toast('Purchase successful', {
          title: 'Success',
          variant: 'success',
          solid: true,
          timeout: 6000,
        })
        this.$store.commit('toggleLoading');
        // redirect to browse page
        this.$router.push('/browse')
      } else {
        this.$store.commit('toggleLoading')
        this.$bvToast.toast('It was not possible to purchase the project', {
          title: 'Error',
          variant: 'error',
          solid: true,
          timeout: 6000,
        })
      }
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>

<style scoped>
#progress-bar-text {
  color: white;
}
.underline-words {
  text-decoration: underline;
  padding-top: 20px;
  padding-bottom: 20px;
}

body .page-content {
  padding: 30px;
}

.top-downloaded {
  overflow-y: scroll;
}

.top-downloaded ul li {
  margin-bottom: 0px;
  text-align: center;
}

.templatemo-item {
  max-width: 100%;
}
</style>
