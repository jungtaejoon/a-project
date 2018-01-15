<template>
  <div :id="ID_PREFIX + id">
    <paragraph
      v-for="paragraph in paragraphs"
      :key="paragraph"
      :id="paragraph"
      @need-new-paragraph="$emit('need-new-paragraph', id)"
      @delete-paragraph="deleteParagraph"
    />
  </div>
</template>

<script>
import Paragraph from './Paragraph'
let nextParagraphId = 0
export default {
  props: {
    id: {
      required: true
    }
  },
  components: {
    Paragraph
  },
  data () {
    return {
      ID_PREFIX: 'paragraphHistory-',
      paragraphs: []
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
    }
  }
}
</script>

<style scoped>

</style>
