<template>
  <div :id="ID_PREFIX + id" class="paragraph-history">
    <div class="color-show">
      <div class="color-box card m-2">
        <div class="card-header " :style="{'background-color': moodColor}">
          <h3 class="card-title text-light"><i class="ti-menu"></i> {{moodText}}</h3>
        </div>
        <div class="card-body text-dark" >
          <paragraph-container
            v-for="paragraph in paragraphIds"
            :key="paragraph"
            :id="paragraph"
            :initContent="lastContent"
            @need-new-paragraph="$emit('need-new-paragraph-history', {id, mood})"
            @delete-paragraph="deleteParagraph"
            @content-changed="onContentChanged"
            @paragraph-mounted="lastContent = ''"
          ></paragraph-container>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ParagraphContainer from './ParagraphContainer'
import paragraphMoodMeta from './paragraph-mood-meta'

let nextParagraphId = 1
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
    ParagraphContainer
  },
  computed: {
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
      paragraphIds: [],
      lastContent: ''
    }
  },
  created () {
    this.createParagraph()
  },
  methods: {
    createParagraph () {
      this.paragraphIds.push(nextParagraphId++)
    },
    deleteParagraph (paragraphId) {
      const targetIndex = this.paragraphIds.indexOf(paragraphId)
      if (targetIndex !== -1) {
        this.paragraphIds.splice(targetIndex, 1)
      }
      if (!this.paragraphIds.length) {
        this.$emit('delete-paragraph-history', this.id)
      }
    },
    onContentChanged (newContent) {
      this.lastContent = newContent
      this.createParagraph()
    }
  }
}
</script>

<style scoped>
.paragraph-history {
  width: 500px;
}
</style>
