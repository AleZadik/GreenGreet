<template>
  <div class="col-lg-4 align-self-center">
    <ul class="main-profile-ul">
      <li>
        Project NFTs Acquired
        <span>{{complete.projectsAcquired}}</span>
      </li>
      <li>
        Project NFTs Created
        <span>{{complete.projectsCreated}}</span>
      </li>
      <li>
        Project NFTs Fully Funded
        <span>{{complete.projectsFullyFunded}}</span>
      </li>
      <li>
        Successful Contributions
        <span>{{complete.successfulDonations}}</span>
      </li>
      <li>
        Pending Contributions
        <span>{{complete.pendingDonations}}</span>
      </li>
      <li>
        Total Contributed
        <span>{{complete.totalDonated}} TRX</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CactusRightBar',
  props: {
    complete: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },
}
</script>
