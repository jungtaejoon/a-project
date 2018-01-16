<template>
  <textarea
    name=""
    :id="ID_PREFIX + id"
    v-model="content"
    @keydown.prevent.enter="createParagraph"
    @keydown.delete="onContentEmpty"
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
    if (!this.initContent) {
      this.$el.focus()
    }
    this.$emit('paragraph-mounted')
  },
  data () {
    return {
      ID_PREFIX: 'paragraph-',
      confirmedContent: '',
      content: this.initContent,
      isLast: true
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
