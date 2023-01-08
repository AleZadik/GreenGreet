<template>
  <div>
    <div class="container">
      <!-- onclick, route to /main -->
      <h1 class="title"><NuxtLink to="/browse" >Green Greet</NuxtLink></h1>
    </div>
    <div class="background">
      <span value="-20"></span>
      <span value="20"></span>
      <span value="-4"></span>
      <span value="12"></span>
      <span value="0"></span>
      <span value="-2"></span>
      <span value="4"></span>
      <span value="8"></span>
      <span value="10"></span>
      <span value="3"></span>
      <span value="5"></span>
      <span value="1"></span>
      <span value="6"></span>
      <span value="9"></span>
      <span value="2"></span>
      <span value="11"></span>
    </div>
  </div>
</template>

<script>
import card from '~/components/card.vue'
import {
  fetchAllProjects,
  setCactusContract,
  getTronWeb,
} from '~/plugins/utils'
import { sampleTx } from '~/plugins/walletConnect'

export default {
  components: {
    card,
  },
  async mounted() {
    // get tronWeb object
    getTronWeb()

    // Wait a while to ensure tronweb object has already injected
    setTimeout(async () => {
      await setCactusContract()
      // const projects = await fetchAllProjects();
      // this.posts = projects;
      // console.log('The total number of projects: ' + projects.length);
    }, 50)
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    async sendTx() {
      await sampleTx()
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 10;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #000000;
  letter-spacing: 1px;
  border-radius: 50px;
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.523);
  z-index: inherit;
}
.title > a{
  color: inherit;
  text-decoration: none;
}
.title:hover{
  background-color: rgb(0, 0, 0);
  color: #206537;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 20px 1px rgb(45 255 196 / 90%);
    -moz-box-shadow: 0px 0px 20px 1px rgba(45,255,196,0.9);
    box-shadow: 0px 0px 20px 1px rgb(45 255 196 / 90%);
  font-weight: 400;
}
.subtitle {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 150;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #206537;
  overflow: hidden;
  z-index: 0;
}

.background span {
  width: 12vmin;
  height: 12vmin;
  border-radius: 12vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: move;
  animation-duration: 1;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.background span:nth-child(0) {
  color: #f5f5f5;
  top: 59%;
  left: 80%;
  animation-duration: 377s;
  animation-delay: -442s;
  transform-origin: -2vw -12vh;
  box-shadow: -24vmin 0 3.0783982690469935vmin currentColor;
}
.background span:nth-child(1) {
  color: #000000;
  top: 51%;
  left: 45%;
  animation-duration: 86s;
  animation-delay: -291s;
  transform-origin: -11vw -9vh;
  box-shadow: -24vmin 0 3.927097317939218vmin currentColor;
}
.background span:nth-child(2) {
  color: #f5f5f5;
  top: 49%;
  left: 55%;
  animation-duration: 213s;
  animation-delay: -64s;
  transform-origin: 21vw -19vh;
  box-shadow: -24vmin 0 3.3426335618739085vmin currentColor;
}
.background span:nth-child(3) {
  color: #000000;
  top: 58%;
  left: 34%;
  animation-duration: 284s;
  animation-delay: -46s;
  transform-origin: -5vw 5vh;
  box-shadow: -24vmin 0 3.6103450566786712vmin currentColor;
}
.background span:nth-child(4) {
  color: #000000;
  top: 82%;
  left: 7%;
  animation-duration: 106s;
  animation-delay: -69s;
  transform-origin: -8vw 8vh;
  box-shadow: -24vmin 0 3.9023990750551607vmin currentColor;
}
.background span:nth-child(5) {
  color: #000000;
  top: 25%;
  left: 50%;
  animation-duration: 146s;
  animation-delay: -244s;
  transform-origin: 11vw -10vh;
  box-shadow: -24vmin 0 3.5885372113007827vmin currentColor;
}
.background span:nth-child(6) {
  color: #000000;
  top: 40%;
  left: 19%;
  animation-duration: 97s;
  animation-delay: -403s;
  transform-origin: -12vw -16vh;
  box-shadow: 24vmin 0 3.724553069674368vmin currentColor;
}
.background span:nth-child(7) {
  color: #f5f5f5;
  top: 76%;
  left: 50%;
  animation-duration: 177s;
  animation-delay: -304s;
  transform-origin: 5vw 8vh;
  box-shadow: 24vmin 0 3.851157535311945vmin currentColor;
}
.background span:nth-child(8) {
  color: #000000;
  top: 46%;
  left: 90%;
  animation-duration: 92s;
  animation-delay: -283s;
  transform-origin: -24vw 23vh;
  box-shadow: 24vmin 0 3.41312630451834vmin currentColor;
}
.background span:nth-child(9) {
  color: #000000;
  top: 1%;
  left: 1%;
  animation-duration: 293s;
  animation-delay: -461s;
  transform-origin: 3vw -1vh;
  box-shadow: -24vmin 0 3.5355102370026055vmin currentColor;
}
.background span:nth-child(10) {
  color: #f5f5f5;
  top: 71%;
  left: 15%;
  animation-duration: 155s;
  animation-delay: -9s;
  transform-origin: -4vw -15vh;
  box-shadow: -24vmin 0 3.8104537245146592vmin currentColor;
}
.background span:nth-child(11) {
  color: #000000;
  top: 38%;
  left: 46%;
  animation-duration: 22s;
  animation-delay: -240s;
  transform-origin: -20vw -12vh;
  box-shadow: -24vmin 0 3.944826442960953vmin currentColor;
}
.background span:nth-child(12) {
  color: #000000;
  top: 32%;
  left: 93%;
  animation-duration: 84s;
  animation-delay: -110s;
  transform-origin: 16vw -18vh;
  box-shadow: -24vmin 0 3.711919364337827vmin currentColor;
}
.background span:nth-child(13) {
  color: #f5f5f5;
  top: 24%;
  left: 61%;
  animation-duration: 413s;
  animation-delay: -173s;
  transform-origin: -8vw -7vh;
  box-shadow: -24vmin 0 3.865793213056191vmin currentColor;
}
.background span:nth-child(14) {
  color: #f5f5f5;
  top: 87%;
  left: 36%;
  animation-duration: 71s;
  animation-delay: -375s;
  transform-origin: -5vw -1vh;
  box-shadow: 24vmin 0 3.587341370530155vmin currentColor;
}
.background span:nth-child(15) {
  color: #f5f5f5;
  top: 47%;
  left: 89%;
  animation-duration: 182s;
  animation-delay: -70s;
  transform-origin: 25vw -6vh;
  box-shadow: 24vmin 0 3.43875751742667vmin currentColor;
}
.background span:nth-child(16) {
  color: #f5f5f5;
  top: 99%;
  left: 52%;
  animation-duration: 453s;
  animation-delay: -323s;
  transform-origin: -23vw 3vh;
  box-shadow: -24vmin 0 3.167167978306404vmin currentColor;
}
.background span:nth-child(17) {
  color: #f5f5f5;
  top: 85%;
  left: 48%;
  animation-duration: 27s;
  animation-delay: -398s;
  transform-origin: 12vw 25vh;
  box-shadow: 24vmin 0 3.4845464503309724vmin currentColor;
}
.background span:nth-child(18) {
  color: #000000;
  top: 91%;
  left: 47%;
  animation-duration: 475s;
  animation-delay: -257s;
  transform-origin: 15vw 20vh;
  box-shadow: 24vmin 0 3.593916501249823vmin currentColor;
}
.background span:nth-child(19) {
  color: #000000;
  top: 67%;
  left: 67%;
  animation-duration: 153s;
  animation-delay: -288s;
  transform-origin: 24vw -10vh;
  box-shadow: -24vmin 0 3.2109223056504046vmin currentColor;
}
.background span:nth-child(20) {
  color: #000000;
  top: 58%;
  left: 19%;
  animation-duration: 76s;
  animation-delay: -490s;
  transform-origin: 1vw -22vh;
  box-shadow: 24vmin 0 3.362614968611924vmin currentColor;
}
</style>
