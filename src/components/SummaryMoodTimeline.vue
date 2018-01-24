<template>
  <li>
    <div
      class="timeline-badge danger wow lightSpeedIn center"
      @click.exact="changeLocationById(paragraphHistoryId)"
      :style="{'background-color': moodColor}"
    >
      <i class="fa fa-fw ti-check-box"></i>
    </div>
    <div class="timeline-panel wow slideInRight" @click.exact="changeLocationById(paragraphHistoryId)">
      <div class="timeline-heading">
        <textarea class="timeline-title" @click.stop="''" v-model="mood"></textarea>
      </div>
      <hr>
      <div class="timeline-body">
        <textarea @click.stop="''" v-model="summary"></textarea>
      </div>
    </div>
  </li>
</template>

<script>
require('imports-loader?this=>window!../vendors/wow/dist/wow.min.js')
import {mapGetters} from 'vuex'
import paragraphMoodMeta from './paragraph-mood-meta'
import idPrefixMeta from './id-prefix-meta'
import animate_css from 'animate.css/animate.min.css'
import autosize from 'autosize'
import types from '../mutation-types'
import $ from 'jquery'

export default {
  props: [
    'paragraphHistoryId',
    'initMood',
    'initSummary'
  ],
  created () {
    this.mood = this.initMood
    this.summary = this.initSummary
  },
  computed: {
    ...mapGetters([
      'paragraphHistories'
    ]),
    mood: {
      get () {
        return this.$store.getters.mood(this.paragraphHistoryId)
      },
      set (value) {
        this.$store.commit(types.UPDATE_MOOD, {paragraphHistoryId: this.paragraphHistoryId, value})
      }
    },
    summary: {
      get () {
        return this.$store.getters.summary(this.paragraphHistoryId)
      },
      set (value) {
        this.$store.commit(types.UPDATE_SUMMARY, {paragraphHistoryId: this.paragraphHistoryId, value})
      }
    },
    moodText () {
      if (paragraphMoodMeta[this.mood]) return paragraphMoodMeta[this.mood].kor
    },
    moodColor () {
      if (paragraphMoodMeta[this.mood]) return paragraphMoodMeta[this.mood].color
    }
  },
  data () {
    return {
      ...idPrefixMeta,
      paragraphMoodMeta
    }
  },
  mounted () {
    const thisTitleTextarea = this.$el.querySelector('textarea.timeline-title')
    const thisSummaryTextarea = this.$el.querySelector('.timeline-body > textarea')
    autosize(thisTitleTextarea)
    autosize(thisSummaryTextarea)
    $(function () {
      new WOW().init()
    })
  },
  methods: {
    changeLocationById (id) {
      location.href = '#' + this.PARAGRAPH_HISTORY_ID_PREFIX + id
    }
  }
}
</script>
<style src="../assets/css/timeline.css"></style>
<style scoped>
  .timeline-badge.danger.wow.lightSpeedIn.center:hover {
    cursor: pointer;
  }
  div.timeline-panel.wow.slideInRight {
    background-color: #fff;
  }
  div.timeline-panel.wow.slideInRight:hover {
    cursor: pointer;
  }

  .timeline > li > .timeline-badge {
    left: 5%;
  }
  .timeline > li > .timeline-panel {
    width: 86%;
  }
  textarea {
    border: none;
    width: 100%;
  }
</style>
