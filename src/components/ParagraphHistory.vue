<template>
  <div :id="ID_PREFIX + id" class="paragraph-history">
    <div class="color-show">
      <div class="color-box card m-2">
        <div class="card-header " :style="{'background-color': '#6699cc'}">
          <h3 class="card-title text-light"><i class="ti-menu"></i> 테스트</h3>
        </div>
        <div class="card-body text-dark" >
          <paragraph-container
            v-for="paragraph in paragraphs"
            :key="paragraph"
            :id="paragraph"
            :initContent="lastContent"
            @need-new-paragraph="$emit('need-new-paragraph', id)"
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
import ParagraphContainer from './ParagraphContainer'

let nextParagraphId = 0
export default {
  props: {
    id: {
      required: true
    }
  },
  components: {
    ParagraphContainer
  },
  data () {
    return {
      ID_PREFIX: 'paragraphHistory-',
      paragraphs: [],
      lastContent: ''
    }
  },
  created () {
    this.createParagraph()
  },
  methods: {
    createParagraph () {
      this.paragraphs.push(nextParagraphId++)
    },
    deleteParagraph (paragraphId) {
      const targetIndex = this.paragraphs.indexOf(paragraphId)
      if (targetIndex !== -1) {
        this.paragraphs.splice(targetIndex, 1)
      }
      if (!this.paragraphs.length) {
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

}
</style>
