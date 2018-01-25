<template>
  <li>
    <div
      class="timeline-badge lightSpeedIn center"
      @click.exact="changeLocationById(paragraphHistoryId)"
      :style="{'background-color': moodColor}"
    >
      <i class="fa fa-fw ti-check-box"></i>
    </div>
    <div class="timeline-panel wow slideInRight">
      <div class="timeline-heading">
        <textarea
          rows="1"
          class="form-control mood-input"
          :id="this.paragraphHistoryId"
          :placeholder="'mood'"
          v-model="mood"
          @focus="$event.target.select()"
        ></textarea>
      </div>
      <hr>
      <div class="timeline-body">
        <textarea
          rows="1"
          class="form-control summary-input"
          :id="focus.TIMELINE_SUMMARY + this.paragraphHistoryId"
          :placeholder="'summary'"
          v-model="summary"
          @focus="$event.target.select()"
          @keydown.enter.prevent="addParagraphHistoryNextBy"
        ></textarea>
      </div>
    </div>
  </li>
</template>

<script>
import CommonTextArea from './CommonTextArea/CommonTextArea'
import paragraphMoodMeta from './paragraph-mood-meta'
import idPrefixMeta from './id-prefix-meta'
import types from '../mutation-types'
import focus from './focus-target-meta'
import autosize from 'autosize'

export default {
  components: {
    CommonTextArea
  },
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
    paragraphHistories: {
      get () {
        return this.$store.getters.paragraphHistories
      },
      set (value) {
        this.$store.commit(types.UPDATE_PARAGRAPH_HISTORIES, value)
      }
    },
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
      idPrefixMeta,
      paragraphMoodMeta,
      editingInput: '',
      focus
    }
  },
  mounted () {
    autosize(this.$el.querySelector('.mood-input'))
    autosize(this.$el.querySelector('.summary-input'))
  },
  methods: {
    changeLocationById (id) {
      location.href = '#' + idPrefixMeta.PARAGRAPH_HISTORY_ID_PREFIX + id
    },
    addParagraphHistoryNextBy () {
      this.$store.commit(types.SET_FOCUS_TARGET_TYPE, focus.TIMELINE_SUMMARY)
      this.$store.commit(types.ADD_PARAGRAPH_HISTORY_NEXT_BY, {paragraphHistoryId: this.paragraphHistoryId, mood: this.mood})
    }
  },
  updated () {
    if (this.editingInput) {
      this.$el.querySelector('.' + this.editingInput).focus()
    }
  }
}
</script>
<style src="../assets/css/timeline.css"></style>
<style scoped>
  .timeline-badge.lightSpeedIn.center:hover {
    cursor: pointer;
  }
  div.timeline-panel.wow.slideInRight {
    background-color: #fff;
  }
  .timeline li > .timeline-badge {
    left: 5%;
  }
  .timeline li > .timeline-panel {
    width: 86%;
  }
  textarea {
    border: none;
    width: 100%;
  }
</style>
