<template>
  <textarea
    name=""
    :id="ID_PREFIX + id"
    v-model="content"
    @keydown.prevent.enter="createParagraph"
    @keydown.delete="onContentEmpty"
    @keydown.prevent.enter.shift.exact="newLine"
  ></textarea>
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
    autosize(this.$el)
    this.$el.focus()
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
        this.isLast = false
      }
    },
    newLine () {
      this.content += '\n'
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
</style>
