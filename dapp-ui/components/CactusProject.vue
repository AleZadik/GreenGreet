<template>
  <div class="nftwrappers col-lg-3 col-sm-6">
      <nuxt-link :to="{ name: 'project', params: { project: actualProj }}">
      <div class="item"> 
        <img src="~/assets/images/beach-cleanup-1.png" class="nft-image" v-if="actualProj.meta.file.substring(0,1) == '~'"/>
        <img v-else class="nft-image" :src="'https://' + actualProj.meta.file + '.ipfs.nftstorage.link/'" alt="" />
        <h4 class="nft-title">
          {{actualProj.name}}
          <br />
          <span class="nft-subtitle" style="font-size: 70%;">
            {{ trim(actualProj.meta.summary) }}
          </span>
        </h4>
        <br />
        <ul class="mt-2">
          <li class="nft-sus">
            <!-- Show n green icons and 5-n gray icons -->
            {{'ESG: ' + this.actualProj.ESGSCORE}}
            <i class="fa fa-leaf" :style="stars > 0 ? 'color: green;' : 'color: gray;'"></i>
            <i class="fa fa-leaf" :style="stars > 1 ? 'color: green;' : 'color: gray;'"></i>
            <i class="fa fa-leaf" :style="stars > 2 ? 'color: green;' : 'color: gray;'"></i>
            <i class="fa fa-leaf" :style="stars > 3 ? 'color: green;' : 'color: gray;'"></i>
            <i class="fa fa-leaf" :style="stars > 4 ? 'color: green;' : 'color: gray;'"></i>
          </li>
          <li class="nft-pop">
            <i class="fa fa-fire" :style="stars > 1 ? 'color: orangered;' : 'color: gray;'"></i>
            <i class="fa fa-fire" :style="stars > 3 ? 'color: orangered;' : 'color: gray;'"></i>
            <i class="fa fa-fire" :style="stars > 3 ? 'color: orangered;' : 'color: gray;'"></i>
            <i class="fa fa-fire" :style="stars > 3 ? 'color: orangered;' : 'color: gray;'"></i>
            <i class="fa fa-fire" :style="stars > 4 ? 'color: orangered;' : 'color: gray;'"></i>
          </li>
          <li class="nft-goal" v-if="actualProj.status == 2">
            {{actualProj.totalFunds / 10**6}}/{{actualProj.entirePrice / 10**6 }}
            <i class="fa fa-bullseye" style="color: red;"></i>
          </li>
          <li class="nft-goal" v-else-if="actualProj.status == 1">
            100% Funded
            <i class="fa fa-bullseye" style="color: red;"></i>
          </li>
        </ul>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CactusProject',
  props: ['project'],
  data() {
    return {
      actualProj: {
        meta: {
          file: '',
        },
        stars: 0,
      }
    }
  },
  components: {},
  methods: {
    trim() {
      return this.project.meta.summary.substring(0, 50) + '...'
    }
  },
  mounted() {
    this.actualProj = this.project;
    console.log(this.actualProj);
    this.stars = Math.round(this.actualProj.ESGSCORE / 140);
  },
}
</script>

<style scoped>
.item {
  -webkit-box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.45);
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
.item:hover img {
  -webkit-box-shadow: 0px 5px 10px 0px #004085;
  -moz-box-shadow: 0px 5px 10px 0px #004085;
  box-shadow: 0px 5px 10px 0px #004085;
}
.item:hover .nft-subtitle {
  color: white;
}
.item:hover .nft-subtitle:hover {
  color: white;
  /* text-decoration: underline; */
}
</style>
