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
    <section class="section">
      <div class="container">
        <h2 class="title has-text-white">history</h2>
        <b-carousel-list
          v-model="values"
          :data="historyItems"
          :arrow="arrow"
          :arrow-hover="arrowHover"
          :has-drag="isTouchDevice" 
        >
          <template v-slot:item="slotProps">
            <figure class="image">
              <img
                :src="slotProps.list.image"
                :title="slotProps.list.title"
                @click="moveToNicoNicoDouga(slotProps.list.contentId)"
                >
            </figure>
          </template>
        </b-carousel-list>
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
        'GUMI',
        'IA',
        'v_flower'
      ],
      checkboxVocal: ['初音ミク'],
      viewCounterRange: [
        '1000',
        '10000',
        '100000',
        '200000',
        '300000',
        '400000',
        '500000'
      ],
      selectViewCounter: '1000',
      values: 0,
      arrow: true,
      arrowHover: true,
      drag: this.isTouchDevice,
      historyItems: []
    }
  },
  async asyncData({ app }) {
    const baseUrl = process.env.API
    const getUrl = encodeURI(baseUrl)
    const response = await app.$axios.$get(getUrl)
    let srcList = [];
    let history = [];
    for (let key = 0; key < 4; key++) {
      srcList[key] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360';
      response[key]['src'] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360';
      history.push({
        title: response[key]['title'],
        image: response[key]['thumbnailUrl'],
        contentId: response[key]['contentId']
      })
    }
    //set history ----------------------------------------------------------------------------------------------------
    let oldHistory = app.$cookies.get('vodd-history');
    if (oldHistory) {
      history = history.concat(oldHistory);
      // if (history.length > 100) history.splice(100); 
    }
    app.$cookies.set('vodd-history', history);
    //----------------------------------------------------------------------------------------------------------------
    return {
      musicList: response,
      musicSrcList: srcList,
      historyItems: history,
      isLoading: false
    }
  },
  created: function () {
  },
  computed: {
    isTouchDevice: function() {
      return (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches);
    },
  },
  methods: {
    getRandomMusic() {
      this.callNicoNicoApi(['初音ミク'], 1000);
    },
    getSearchRandomMusic() {
      this.callNicoNicoApi(this.checkboxVocal, this.selectViewCounter);
    },
    callNicoNicoApi(checkboxVocal, selectViewCounter) {
      this.isMusicLoading = true;
      let history = [];
      const baseUrl = process.env.API
      const getUrl = encodeURI(baseUrl)
      const response = this.$axios.$get(getUrl, { params: { vocal: checkboxVocal, viewCounter: selectViewCounter }})
        .then(response => {
          let resLength = response.length;
          for (let key = 0; key < resLength; key++) {
            response[key]['src'] = 'https://embed.nicovideo.jp/watch/' + response[key]['contentId'] + '/script?w=640&h=360'
            this.$set(this.musicList, key, response[key]);
            history.push({
              title: response[key]['title'],
              image: response[key]['thumbnailUrl'],
              contentId: response[key]['contentId']
            })
          }
          this.setHistory(history);
          this.isMusicLoading = false;
          scrollTo(0, 0)
        })
    },
    movieSrc(key) {
      return this.musicList[key]['src']
    },
    moveToNicoNicoDouga(contentId) {
      window.open('https://www.nicovideo.jp/watch/' + contentId, '_blank');
    },
    setHistory(history) {
      let oldHistory = this.$cookies.get('vodd-history')
      if (oldHistory) {
        history = history.concat(oldHistory);
        if (history.length > 100) history.splice(100); 
      }
      this.historyItems = history;
      this.$cookies.set('vodd-history', history);
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

@media screen and (min-width: 481px) {
  iframe {
    height: 360px;
  }
}

@media screen and (max-width:480px) { 
  iframe {
    height: auto;
  }
}
</style>>