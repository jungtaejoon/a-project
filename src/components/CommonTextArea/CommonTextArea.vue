<template>
  <textarea
    rows="1"
    class="form-control"
    :id="idPrefix + id"
    :class="elemClass"
    :placeholder="placeholder"
    v-model="modifiedContent"
    @focus="onFocusEvent"
    @blur="onBlurEvent"
    @keydown="e => $emit('keydown', e)"
    @keyup="e => $emit('keyup', e)"
  ></textarea>
</template>
<script>
import autosize from 'autosize'

export default {
  props: {
    id: Number,
    content: String,
    placeholder: String,
    idPrefix: String,
    elemClass: String,
    onFocus: Function,
    onBlur: Function,
    useSelection: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      modifiedContent: this.content
    }
  },
  mounted () {
    autosize(this.$el)
  },
  updated () {
    this.$emit('update:content', this.modifiedContent)
  },
  methods: {
    onFocusEvent (e) {
      if (this.useSelection) {
        e.target.select()
      }
      if (this.onFocus) {
        this.onFocus()
      }
      this.$emit('focus', e)
    },
    onBlurEvent (e) {
      if (this.onBlur) {
        this.onBlur()
      }
      this.$emit('blur', e)
    }
  }
}
</script>

<style scoped>
  textarea {
    border: none;
    background-color: transparent;
    padding: 0 0 0 6px;
    margin: 0;
  }
  element.style {
    height: 19px;
  }
</style>
