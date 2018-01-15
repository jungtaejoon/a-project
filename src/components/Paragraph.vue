<template>
  <textarea
    name=""
    :id="ID_PREFIX + id"
    v-model="content"
    :class="{dived:!isFocused}"
    @keydown.prevent.enter="$emit('need-new-paragraph')"
    @focus="isFocused = true"
    @blur="isFocused = false"
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
    }
  },
  mounted () {
    autosize(this.$el)
    this.$el.focus()
  },
  data () {
    return {
      ID_PREFIX: 'paragraph-',
      content: '',
      isFocused: false
    }
  },
  methods: {
    onContentEmpty () {
      if (!this.content) {
        this.$emit('delete-paragraph', this.id)
      }
    }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
  .dived {
    border: 0px;
  }
</style>
