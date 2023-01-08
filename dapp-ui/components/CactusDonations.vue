<template>
  <div class="gaming-library profile-library ml-3">
    <div class="col-lg-12">
      <div class="heading-section">
        <h4>
          <em>Your</em>
          Contributions
        </h4>
      </div>
      <div class="item" v-for="don in donations">
        <ul>
          <li>
            <img
              :src="backgroundImagePath"
              class="img-fluid"
              style="border-radius: 10px;width: 100%;"
            />
          </li>
          <li>
            <h4>Name</h4>
            <span style="">{{ don.project.name }}</span>
          </li>
          <li>
            <h4>Date</h4>
            <span>
              {{ new Date(don.donationDate * 1000).toLocaleDateString() }}
            </span>
          </li>
          <li>
            <h4>Total</h4>
            <span>{{ don.amount / 10 ** 6 }} TRX</span>
          </li>
          <li>
            <h4>+ Points</h4>
            <span>{{ don.amount / 10 ** 6 }} pts</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImagePath from '~/assets/images/patternCactus.png'
export default {
  name: 'CactusDonations',
  props: {
    donations: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      backgroundImagePath: backgroundImagePath,
    }
  },
}
</script>

<style scoped>
li{
  width: fit-content !important;
  padding: 20px;
}
span{
  width: fit-content !important;
}
</style>
