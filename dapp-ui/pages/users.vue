<template>
  <div>
    <CactusNavbar active="users" />

    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            <div class="most-popular">
              <div class="row">
                <div class="col-lg-12">
                  <div class="heading-section">
                    <h4>
                      <em>Green User</em>
                      Scoreboard
                    </h4>
                  </div>
                  <div class="row" id="project-list">
                    <CactusUser v-for="user in users" :user="user"></CactusUser>
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
import CactusUser from '../components/CactusUser.vue'
import {
  fetchAllProjects,
  setCactusContract,
  getTronWeb,
  getUserByAddress,
  getAllUserDataByAddress,
} from '~/plugins/utils'

export default {
  data() {
    return {
      users: [
        {
          address: 'TRGV1Leawq4jAcuFTmEA3rrpqis2BW83TV',
          points: 1500,
          projectsAcquired: 5,
          projectsWritten: 1,
          donations: 200,
          spent: 1200,
          rank: 1,
        },
        {
          address: 'TUS3ZvhS3WjkU2noKjxGyFhMajPuWrWuXy',
          points: 1200,
          projectsAcquired: 2,
          projectsWritten: 0,
          donations: 200,
          spent: 800,
          rank: 2,
        },
      ],
      address: tronWeb.defaultAddress.base58,
    }
  },
  components: {
    CactusNavbar,
    CactusProject,
    CactusFooter,
    CactusUser,
  },
  async mounted() {
      getTronWeb();
      await setCactusContract();
      // this.$store.commit('toggleLoading')
      // this.loadingMsg = 'Fetching user data...'
      const user = await getAllUserDataByAddress(this.address);
      let cost = 0;
      user.donations.forEach(don => {
        cost += don.amount / 1000000;
      });
      let lightUser = {
        address: user.userAddress,
        points: user.points,
        projectsAcquired: user.purchases.length,
        projectsWritten: user.projects.length,
        donations: user.donations.length,
        spent: cost,
        rank: 3,
      }
      this.users.push(lightUser);
  },
  methods: {},
}
</script>

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
