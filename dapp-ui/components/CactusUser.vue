<template>
  <div class="nftwrappers col-lg-3 col-sm-6">
    <NuxtLink to="/profile">
      <div class="item">
        <li style="text-align: left; color: #ffd700;">
          <span style="color: #ffd700; margin-top: 0;">👑 - #{{user.rank}}</span>
        </li>
        <div
          class="nft-image"
          :style="{
            backgroundImage: `url(${backgroundImagePath})`,
            backgroundSize: 'cover',
            borderRadius: '50px',
          }"
        >
          <img
            :src="'https://robohash.org/' + user.address"
            alt=""
            :style="'border-radius: 23px;'"
          />
        </div>
        <!-- <img class="nft-image" src="~/assets/images/popular-01.jpg" alt="" /> -->
        <h4 class="nft-title">
            {{user.address}}
          <br />
        </h4>
        <br />
        <ul>
          <li style="text-align: left; color: #309050;">
            <span style="color: #309050;">Points: {{user.points}} pts 🌳</span>
          </li>
          <li style="text-align: left; color: #309050;">
            <span style="color: #309050;">Projects Acquired: {{user.projectsAcquired}}</span>
          </li>
          <li style="text-align: left; color: #309050;">
            <span style="color: #309050;">Projects Written: {{user.projectsWritten}}</span>
          </li>
          <li style="text-align: left; color: #309050;">
            <span style="color: #309050;"># Donations: {{user.donations}}</span>
          </li>
          <li style="text-align: left; color: #309050;">
            <span style="color: #309050;"># Spent: {{user.spent}} TRX</span>
          </li>
        </ul>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import backgroundImagePath from '~/assets/images/patternCactus.png'

export default {
  name: 'CactusUser',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      backgroundImagePath,
      address: tronWeb.defaultAddress.base58,
    }
  },
  components: {},
  methods: {},
}
</script>

<style scoped>
.item {
  -webkit-box-shadow: 0px 10px 13px 0px rgb(0, 0, 0);
  -moz-box-shadow: 0px 10px 13px 0px rgba(0, 0, 0);
  box-shadow: 0px 10px 13px 0px rgba(0, 0, 0);
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: aqua;
  -webkit-box-shadow: 0px 0px 20px 1px rgba(45, 255, 196, 0.9) !important;
  -moz-box-shadow: 0px 0px 20px 1px rgba(45, 255, 196, 0.9) !important;
  box-shadow: 0px 0px 20px 1px rgba(45, 255, 196, 0.9) !important;
}
.item:hover .nft-title {
  color: aqua;
}
/* .item:hover img {
  -webkit-box-shadow: 0px 5px 10px 0px #004085;
  -moz-box-shadow: 0px 5px 10px 0px #004085;
  box-shadow: 0px 5px 10px 0px #004085;
} */
.item:hover .nft-subtitle {
  color: white;
}
.item:hover .nft-subtitle:hover {
  color: white;
  /* text-decoration: underline; */
}

.nft-title {
  overflow-wrap: anywhere;
  align-self: center;
  text-align: center;
}

.item {
  background-color: #0e0f19;
}
</style>
