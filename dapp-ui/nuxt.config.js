
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Green Greet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    NFT_STORAGE: process.env.PUBLIC_KEY,
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/fontawesome.css",
    "~/assets/css/cactusmain.css",
    "~/assets/css/owl.css",
    "~/assets/css/animate.css",
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  // router
  // router: {
  //   base: '/dapp-ui/',
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'mainPage',
  //       path: '/main',
  //       component: resolve(__dirname, 'pages/index.vue')
  //     })
  //     routes.push({
  //       name: 'insidePage',
  //       path: '/inside',
  //       component: resolve(__dirname, 'pages/inside.vue')
  //     })
  //   }
  // },
}
