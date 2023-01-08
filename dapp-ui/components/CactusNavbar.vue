<template>
    <header class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              <a href="/" class="logo">
                <h3><img src="~/assets/images/grgr.png" alt=""/></h3>
              </a>
              <ul class="nav">
                <li><NuxtLink to="/browse" :class="active==='browse' ? 'active' : ''">Browse</NuxtLink></li>
                <li><NuxtLink to="/mint" :class="active==='mint' ? 'active' : ''">Mint</NuxtLink></li>
                <li><NuxtLink to="/users" :class="active==='users' ? 'active' : ''">All Users</NuxtLink></li>
                <li>
                    <NuxtLink :to="'/profile'" :class="active==='profile' ? 'active' : ''">
                        <span id="connected">{{address}}</span>
                        <img
                        :src="'https://robohash.org/' + address"
                        style="background-color: #000; border-radius: 50%; width: 30px; height: 30px;"
                        alt=""
                        />
                    </NuxtLink>
                </li>
              </ul>
              <a class="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: 'browse',
    }
  },
  data() {
    return {
        address: tronWeb.defaultAddress.base58,
    }
  },
  components: {
  },
  methods: {
  }
};
</script>

<style>

</style>