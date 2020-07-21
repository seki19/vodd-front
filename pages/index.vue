<template>
  <div id="body">
    <section class="section">
    <div class="container" v-if="!isLoading">
      <h2 class="title has-text-white">music</h2>
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
  <section class="section">
    <div class="container">
      <h2 class="title has-text-white">search</h2>
      <b-field label="ボーカロイド">
        <div class="block">
          <b-checkbox v-for="vocal in vocaloids" :key="vocal"
            class="has-text-white vocal"
            v-model="checkboxVocal"
            :native-value="vocal">
            {{vocal}}
          </b-checkbox>
        </div>
      </b-field>
      <b-field label="再生回数">
        <b-select placeholder="1000~" v-model="selectViewCounter">
          <option
              v-for="viewCounter in viewCounterRange"
              :value="viewCounter"
              :key="viewCounter">
              {{ viewCounter }}~
          </option>
        </b-select>
      </b-field>
      <b-button :loading=isMusicLoading expanded @click="getSearchRandomMusic()" type="is-primary" outlined>検索</b-button>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      isMusicLoading: false,
      musicList: [],
      vocaloids: [
        '初音ミク',
        '鏡音リン',
        '鏡音レン',
        '巡音ルカ',
        'MEIKO',
        'KAITO',
      ],
      checkboxVocal: ['初音ミク'],
      viewCounterRange: [
        '1000',
        '10000',
        '100000'
      ],
      selectViewCounter: '1000'
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
    getSearchRandomMusic() {
      this.isMusicLoading = true;
      const baseUrl = process.env.API
      const getUrl = encodeURI(baseUrl)
      const response = this.$axios.$get(getUrl, { params: { vocal: this.checkboxVocal, viewCounter: this.selectViewCounter }})
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
#body {
  min-height: 100vh;
}
.vocal {
  margin-right: 10px;
}
.label {
  color: white;
}
</style>>