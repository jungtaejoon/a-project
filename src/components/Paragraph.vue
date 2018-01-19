<template>
  <div class="paragraph-card">
   <textarea
      name=""
      :id="PARAGRAPH_ID_PREFIX + id"
      v-model="content"
      @mouseover="editingIsTrue"
      @mouseleave="editingIsFalse"
      @keydown.enter.exact.prevent="createParagraph"
      @keydown.delete="onContentEmpty"
    ></textarea>
  </div>
</template>

<script>
import autosize from 'autosize'
import types from '../mutation-types'
import idPrefixMeta from './id-prefix-meta'

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
    if (!this.$store.getters.focusOnSummary) this.$emit('set-focus-target', thisTextareaElement)
    this.$emit('paragraph-mounted')
  },
  data () {
    return {
      ...idPrefixMeta,
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
    },
    editingIsTrue () {
      this.$store.commit(types.EDITING_IS_TRUE)
    },
    editingIsFalse () {
      this.$store.commit(types.EDITING_IS_FALSE)
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
