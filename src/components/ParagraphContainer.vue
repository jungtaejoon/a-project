<template>
  <div class="paragraph-card">
    <paragraph
      :id="id"
      :initContent="initContent"
      @need-new-paragraph="$emit('need-new-paragraph')"
      @content-changed="onContentChanged"
      @delete-paragraph="emitDelete"
      @paragraph-mounted="$emit('paragraph-mounted')"
    />
  </div>
</template>

<script>
import Paragraph from './Paragraph'

export default {
  props: {
    id: {
      required: true
    },
    initContent: {
      required: false
    }
  },
  components: {
    Paragraph
  },
  methods: {
    emitDelete (data) {
      this.$emit('delete-paragraph', data)
    },
    onContentChanged (newContent) {
      this.$emit('content-changed', newContent)
    }
  }
}
</script>

<style scoped>
.paragraph-card {
  border-radius: 10px;
  border: 1px solid;
  max-width:500px;
  margin: 10px;
  padding: 10px;
}
</style>
