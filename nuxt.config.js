
require('dotenv').config();
const {API, GA_ID} = process.env;

export default {
  env: {
    API,
    GA_ID
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'VODD',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'VODDとは、VOCALOIDの音楽をランダムで表示するサイトです。楽曲の発掘などにお役立てください。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'VODD' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://vodd.site' },
      { hid: 'og:title', property: 'og:title', content: 'VODD' },
      { hid: 'og:description', property: 'og:description', content: 'VODDとは、VOCALOIDの音楽をランダムで表示するサイトです。楽曲の発掘などにお役立てください。' },
      { hid: 'og:image', property: 'og:image', content: '/og_img.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@s_k_1_9' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    ['nuxt-buefy', {
      css: false,
      // materialDesignIcons: false
    }],
    ['@nuxtjs/google-analytics', 
    {
      id: process.env.GA_ID,
    }]
  ],
  axios: {
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
  },
}
