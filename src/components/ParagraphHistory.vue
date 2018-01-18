<template>
  <div :id="ID_PREFIX + id" class="paragraph-history">
    <div class="color-show">
      <div class="color-box card m-2">
        <div class="card-header " :style="{'background-color': moodColor}">
          <h3 class="card-title text-light"><i class="ti-menu"></i> {{moodText}}</h3>
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
          ></paragraph>
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

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    mood: {
      type: String,
      default: 'default',
      required: false
    }
  },
  components: {
    Paragraph
  },
  computed: {
    paragraphs () {
      return this.$store.getters.paragraphs(this.id)
    },
    moodText () {
      return paragraphMoodMeta[this.mood].kor
    },
    moodColor () {
      return paragraphMoodMeta[this.mood].color
    }
  },
  data () {
    return {
      ID_PREFIX: 'paragraphHistory-',
      lastContent: ''
    }
  },
  created () {
    this[types.ADD_EMPTY_PARAGRAPH](this.id)
  },
  methods: {
    ...mapMutations([
      types.ADD_EMPTY_PARAGRAPH,
      types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT,
      types.DELETE_PARAGRAPH
    ]),
    deleteParagraph (paragraphId) {
      console.log(paragraphId)
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
