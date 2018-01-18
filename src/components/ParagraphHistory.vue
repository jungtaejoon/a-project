<template>
  <div :id="ID_PREFIX + id" class="paragraph-history">
    <div class="color-show">
      <div class="color-box card m-2">
        <div class="card-header " :style="{'background-color': moodColor}">
          <h3 class="card-title text-light"><i class="ti-menu"></i> {{moodText}}</h3>
          <input type="text" v-model="mood">
          <textarea
            name="summary"
            cols="30" rows="2"
            v-model="summary"
            @keydown.enter.prevent="$emit('need-new-paragraph-history-by-summary', {paragraphHistoryId: id, mood})"
          ></textarea>
        </div>
        <div class="card-body text-dark" >
          <paragraph
            v-for="paragraph in paragraphs"
            :key="paragraph.id"
            :id="paragraph.id"
            :initContent="lastContent"
            @need-new-paragraph="$emit('need-new-paragraph-history', {paragraphHistoryId: id, mood})"
            @delete-paragraph="deleteParagraph"
            @content-changed="onContentChanged"
            @paragraph-mounted="lastContent = ''"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Paragraph from './Paragraph'
import paragraphMoodMeta from './paragraph-mood-meta'
import { mapMutations } from 'vuex'
import types from '../mutation-types'
import autosize from 'autosize'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    initMood: {
      type: String,
      default: 'default',
      required: false
    }
  },
  components: {
    Paragraph
  },
  computed: {
    summary: {
      get () {
        return this.$store.getters.findParagraphHistory(this.id).summary
      },
      set (value) {
        this.$store.commit(types.UPDATE_SUMMARY, {paragraphHistoryId: this.id, value})
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
      paragraphs: [],
      ID_PREFIX: 'paragraphHistory-',
      mood: this.initMood,
      lastContent: ''
    }
  },
  created () {
    this[types.ADD_EMPTY_PARAGRAPH](this.id)
  },
  mounted () {
    this.paragraphs = this.$store.getters.paragraphs(this.id)
    const thisTextareaElement = this.$el.querySelector('textarea')
    autosize(thisTextareaElement)
    if (this.$store.getters.focusOnSummary) thisTextareaElement.focus()
  },
  methods: {
    ...mapMutations([
      types.ADD_EMPTY_PARAGRAPH,
      types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT,
      types.DELETE_PARAGRAPH
    ]),
    deleteParagraph (paragraphId) {
      this[types.DELETE_PARAGRAPH]({paragraphHistoryId: this.id, paragraphId})
      if (this.paragraphs.length === 0) {
        this.$emit('delete-paragraph-history', this.id)
      }
    },
    onContentChanged (confirmedContent) {
      this.lastContent = confirmedContent
      this[types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT]({paragraphHistoryId: this.id, confirmedContent})
    }
  }
}
</script>

<style scoped>
.paragraph-history {
  width: 500px;
}
</style>
