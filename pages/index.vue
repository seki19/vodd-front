<template>
  <section class="section">
    <div class="container" v-if="!isLoading">
      <h1 class="title has-text-white">music</h1>
      <div class="columns">
        <div class="column is-half" v-if="!isMusicLoading">
          <script type="application/javascript" v-bind:src=movieSrc(0)></script><noscript><a href="https://www.nicovideo.jp/watch/sm32385009">{{musicList[0]['title']}}</a></noscript>
        </div>
        <div class="column is-half" v-if="!isMusicLoading">
          <script type="application/javascript" v-bind:src=movieSrc(1)></script><noscript><a href="https://www.nicovideo.jp/watch/sm32385009">{{musicList[1]['title']}}</a></noscript>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half" v-if="!isMusicLoading">
          <script type="application/javascript" v-bind:src=movieSrc(2)></script><noscript><a href="https://www.nicovideo.jp/watch/sm32385009">{{musicList[1]['title']}}</a></noscript>
        </div>
        <div class="column is-half" v-if="!isMusicLoading">
          <script type="application/javascript" v-bind:src=movieSrc(3)></script><noscript><a href="https://www.nicovideo.jp/watch/sm32385009">{{musicList[3]['title']}}</a></noscript>
        </div>
      </div>
      <b-button :loading=isMusicLoading expanded @click="getRandomMusic()" type="is-primary" outlined>音楽を再読み込み.....</b-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      isMusicLoading: false,
      musicList: [],
    }
  },
  async asyncData({ app }) {
    const baseUrl = process.env.API
    const getUrl = encodeURI(baseUrl)
    const response = await app.$axios.$get(getUrl)
    let srcList = [];
    for (let key = 0; key < 4; key++) {
      srcList[key] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360'
      response[key]['src'] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360'
    }
    return {
      musicList: response,
      musicSrcList: srcList,
      isLoading: false
    }
  },
  methods: {
    getRandomMusic() {
      this.isMusicLoading = true;
      const baseUrl = process.env.API
      const getUrl = encodeURI(baseUrl)
      const response = this.$axios.$get(getUrl)
        .then(response => {
          let resLength = response.length;
          for (let key = 0; key < resLength; key++) {
            response[key]['src'] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360'
            this.$set(this.musicList, key, response[key]);
          }
          this.isMusicLoading = false;
          scrollTo(0, 0)
        })
    },
    movieSrc(key) {
      return this.musicList[key]['src']
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
}
</style>>