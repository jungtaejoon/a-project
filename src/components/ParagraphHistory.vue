<template>
  <div :id="PARAGRAPH_HISTORY_ID_PREFIX + id" class="paragraph-history">
    <div class="color-show">
      <div class="color-box card m-2">
        <div v-show="showMetaController">
          <div class="card-header " :style="{'background-color': moodColor}">
            <span class="float-right fnt_size txt_font">
                                    <i class="fa fa-fw ti-close removecard" @click="$emit('delete-paragraph-history', id)"></i>
                                </span>
            <h3 class="card-title text-light"><i class="ti-menu"></i> {{moodText}}</h3>
            <div class="row">
              <div class="col-4">
                <textarea
                  rows="1"
                  class="form-control mood-input"
                  :id="id"
                  :placeholder="'mood'"
                  v-model="mood"
                  @focus="$event.target.select()"
                ></textarea>
              </div>
              <div class="col-8">
                <textarea
                  rows="1"
                  class="form-control summary-input"
                  :id="focus.PARAGRAPH_HISTORY_SUMMARY + id"
                  :placeholder="'summary'"
                  v-model="summary"
                  @focus="$event.target.select()"
                  @keydown.enter.prevent="$emit('need-new-paragraph-history-by-summary', {paragraphHistoryId: id, mood})"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body text-dark" >
          <paragraph
            v-for="paragraph in paragraphs"
            :key="paragraph.id"
            :id="paragraph.id"
            :initContent="lastContent"
            @need-new-paragraph="$emit('need-new-paragraph-history', {paragraphHistoryId: id, mood})"
            @delete-paragraph="deleteParagraph"
            @content-changed="onContentChanged"
            @paragraph-mounted="lastContent = ''"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Paragraph from './Paragraph'
import paragraphMoodMeta from './paragraph-mood-meta'
import { mapMutations } from 'vuex'
import types from '../mutation-types'
import idPrefixMeta from './id-prefix-meta'
import focus from './focus-target-meta'
import CommonTextArea from './CommonTextArea/CommonTextArea'
import autosize from 'autosize'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    initMood: {
      type: String,
      default: 'default'
    },
    showMetaController: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Paragraph, CommonTextArea
  },
  computed: {
    summary: {
      get () {
        return this.$store.getters.summary(this.id)
      },
      set (value) {
        this.$store.commit(types.UPDATE_SUMMARY, {paragraphHistoryId: this.id, value})
      }
    },
    mood: {
      get () {
        return this.$store.getters.mood(this.id)
      },
      set (value) {
        this.$store.commit(types.UPDATE_MOOD, {paragraphHistoryId: this.id, value})
      }
    },
    moodText () {
      if (paragraphMoodMeta[this.mood]) return paragraphMoodMeta[this.mood].kor
    },
    moodColor () {
      if (paragraphMoodMeta[this.mood]) return paragraphMoodMeta[this.mood].color
    }
  },
  data () {
    return {
      ...idPrefixMeta,
      paragraphs: [],
      lastContent: '',
      editingInput: '',
      focus
    }
  },
  created () {
    this.mood = this.initMood
    this[types.ADD_EMPTY_PARAGRAPH](this.id)
  },
  mounted () {
    this.paragraphs = this.$store.getters.paragraphs(this.id)
    autosize(this.$el.querySelector('.mood-input'))
    autosize(this.$el.querySelector('.summary-input'))
  },
  methods: {
    ...mapMutations([
      types.ADD_EMPTY_PARAGRAPH,
      types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT,
      types.DELETE_PARAGRAPH
    ]),
    deleteParagraph (paragraphId) {
      if (this.paragraphs.length === 1) {
        this.$emit('delete-paragraph-history', this.id)
      } else {
        this[types.DELETE_PARAGRAPH]({paragraphHistoryId: this.id, paragraphId})
      }
    },
    onContentChanged (confirmedContent) {
      this.lastContent = confirmedContent
      this[types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT]({paragraphHistoryId: this.id, confirmedContent})
    },
    editingIsTrue () {
      this.$store.commit(types.EDITING_IS_TRUE)
    },
    editingIsFalse () {
      this.$store.commit(types.EDITING_IS_FALSE)
    }
  },
  updated () {
    if (this.editingInput) {
      this.$el.querySelector('.' + this.editingInput).focus()
    }
  }
}
</script>

<style scoped>
.paragraph-history {
  width: 500px;
}
div.card-body.text-dark {
  padding: 6px;
}
i.fa.fa-fw.ti-close.removecard {
  cursor: pointer;
}
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
