<template>
  <div>
    <paragraph-history
      v-for="paragraphHistory in paragraphHistories"
      :key="paragraphHistory"
      :id="paragraphHistory"
      @need-new-paragraph="createParagraphHistory"
      @delete-paragraph-history="deleteParagraphHistory"
    />
    <button @click="createParagraphHistory">단락 추가</button>
  </div>
</template>

<script>
import ParagraphHistory from './ParagraphHistory'

export default {
  name: 'paper',
  components: {
    ParagraphHistory
  },
  data () {
    return {
      paragraphHistories: [],
      nextParagraphHistoryId: 0
    }
  },
  created () {
    this.createParagraphHistory()
  },
  methods: {
    createParagraphHistory (paragraphHistoryId) {
      if (typeof paragraphHistoryId === 'number') {
        const targetIndex = this.paragraphHistories.indexOf(paragraphHistoryId)
        this.paragraphHistories.splice(targetIndex + 1, 0, this.nextParagraphHistoryId++)
      } else {
        this.paragraphHistories.push(this.nextParagraphHistoryId++)
      }
    },
    deleteParagraphHistory (paragraphHistoryId) {
      const targetIndex = this.paragraphHistories.indexOf(paragraphHistoryId)
      if (targetIndex !== -1) {
        this.paragraphHistories.splice(targetIndex, 1)
      }
    }
  }
}
</script>

<style scoped>
</style>
