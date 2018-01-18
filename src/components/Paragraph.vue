<template>
  <div class="paragraph-card">
   <textarea
      name=""
      :id="ID_PREFIX + id"
      v-model="content"
      @keydown.enter.exact.prevent="createParagraph"
      @keydown.delete="onContentEmpty"
    ></textarea>
  </div>
</template>

<script>
import autosize from 'autosize'

export default {
  name: 'paragraph',
  props: {
    id: {
      required: true
    },
    initContent: {
      required: false
    }
  },
  mounted () {
    const thisTextareaElement = this.$el.querySelector('textarea')
    autosize(thisTextareaElement)
    if (!this.$store.getters.focusOnSummary) thisTextareaElement.focus()
    this.$emit('paragraph-mounted')
  },
  data () {
    return {
      ID_PREFIX: 'paragraph-',
      confirmedContent: this.initContent,
      content: this.initContent
    }
  },
  methods: {
    onContentEmpty () {
      if (!this.content) {
        this.$emit('delete-paragraph', this.id)
      }
    },
    createParagraph () {
      if (!this.confirmedContent || this.confirmedContent === this.content) {
        this.confirmedContent = this.content
        this.$emit('need-new-paragraph')
      } else if (this.confirmedContent !== this.content) {
        this.$emit('content-changed', this.content)
        this.content = this.confirmedContent
      }
    }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
  width: 100%;
  padding: 3px;
  border: 0px;
}
textarea:focus {
  outline: none !important;
}
.paragraph-card {
  border-radius: 10px;
  border: 1px solid #9cc2cb;
  width: 100%;
  padding: 10px;
}
</style>
