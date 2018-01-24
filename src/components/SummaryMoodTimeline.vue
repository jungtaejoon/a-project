<template>
  <li>
    <div
      class="timeline-badge danger wow lightSpeedIn center"
      @click.exact="changeLocationById(paragraphHistoryId)"
      :style="{'background-color': moodColor}"
    >
      <i class="fa fa-fw ti-check-box"></i>
    </div>
    <div class="timeline-panel wow slideInRight">
      <div class="timeline-heading">
        <input
          v-show="editingInput === 'mood-input'"
          class="form-control mood-input"
          type="text"
          placeholder="mood"
          v-model="mood"
          @keydown.enter="editingInput = ''"
          @blur="editingInput = ''"
          @focus="$event.target.select()"
        />
        <span
          v-show="editingInput !== 'mood-input'"
          @click="editingInput = 'mood-input'"
        >{{mood}}</span>
      </div>
      <hr>
      <div class="timeline-body">
        <input
          v-show="editingInput === 'summary-input'"
          class="form-control summary-input"
          placeholder="summary"
          name="summary"
          v-model="summary"
          @keydown.enter.prevent="addParagraphHistoryNextBy"
          @keydown.enter="editingInput = ''"
          @blur="editingInput = ''"
          @focus="$event.target.select()"
        />
        <span
          v-show="editingInput !== 'summary-input'"
          @click="editingInput = 'summary-input'"
        >{{summary || 'summary'}}</span>
      </div>
    </div>
  </li>
</template>

<script>
import paragraphMoodMeta from './paragraph-mood-meta'
import idPrefixMeta from './id-prefix-meta'
import types from '../mutation-types'
import focus from './focus-target-meta'

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
      ...idPrefixMeta,
      paragraphMoodMeta,
      editingInput: ''
    }
  },
  mounted () {
    if (this.$store.getters.focusTarget === focus.TIMELINE_SUMMARY) {
      console.log(this.$el.querySelector('.summary-input'))
      setTimeout(() => {
        this.editingInput = 'summary-input'
        this.$el.querySelector('.summary-input').focus()
      }, 100)
    }
  },
  methods: {
    changeLocationById (id) {
      location.href = '#' + this.PARAGRAPH_HISTORY_ID_PREFIX + id
    },
    addParagraphHistoryNextBy () {
      this.$store.commit(types.SET_FOCUS_TARGET, focus.TIMELINE_SUMMARY)
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
  .timeline-badge.danger.wow.lightSpeedIn.center:hover {
    cursor: pointer;
  }
  div.timeline-panel.wow.slideInRight {
    background-color: #fff;
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
