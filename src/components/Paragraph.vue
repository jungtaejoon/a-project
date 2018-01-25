<template>
  <div class="paragraph-card">
   <textarea
      name=""
      :id="focus.PARAGRAPH + id"
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
import focus from './focus-target-meta'

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
    this.$emit('paragraph-mounted')
  },
  data () {
    return {
      ...idPrefixMeta,
      confirmedContent: this.initContent,
      content: this.initContent,
      focus
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
  padding: 5px;
}
</style>
