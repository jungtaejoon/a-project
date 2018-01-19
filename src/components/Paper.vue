<template>
  <div class="color-list">
    <summary-mood-timeline></summary-mood-timeline>
    <button @click="addParagraphHistory">단락 추가</button>
    <button @click="toggleMetaController">단락 컨트롤러 토글</button>
    <draggable v-model="paragraphHistories" :options="{disabled:edit, ghostClass: 'ghost'}" @change="setFocus">
      <transition-group name="paragraph-history-list">
        <paragraph-history
          v-for="paragraphHistory in paragraphHistories"
          :key="paragraphHistory.id"
          :id="paragraphHistory.id"
          :initMood="paragraphHistory.mood"
          :showMetaController="showMetaController"
          @need-new-paragraph-history="addParagraphHistoryNextBy"
          @need-new-paragraph-history-by-summary="addParagraphHistoryBySummary"
          @delete-paragraph-history="DELETE_PARAGRAPH_HISTORY"
          @set-focus-target="setFocusTarget"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import ParagraphHistory from './ParagraphHistory'
import SummaryMoodTimeline from './SummaryMoodTimeline'
import { mapGetters, mapMutations } from 'vuex'
import types from '../mutation-types'
import draggable from 'vuedraggable'

export default {
  components: {
    ParagraphHistory, SummaryMoodTimeline, draggable
  },
  computed: {
    ...mapGetters([
      'edit'
    ]),
    paragraphHistories: {
      get () {
        return this.$store.getters.paragraphHistories
      },
      set (value) {
        this.$store.commit(types.UPDATE_PARAGRAPH_HISTORIES, value)
      }
    }
  },
  created () {
    this[types.ADD_PARAGRAPH_HISTORY]()
  },
  data () {
    return {
      showMetaController: false,
      focusTargetElement: null
    }
  },
  updated () {
    this.$emit('test')
  },

  methods: {
    ...mapMutations([
      types.ADD_PARAGRAPH_HISTORY,
      types.ADD_PARAGRAPH_HISTORY_NEXT_BY,
      types.DELETE_PARAGRAPH_HISTORY
    ]),
    addParagraphHistory () {
      this.$store.commit(types.FOCUS_ON_SUMMARY_FALSE)
      this[types.ADD_PARAGRAPH_HISTORY]()
    },
    addParagraphHistoryNextBy (paragraphHistory) {
      this.$store.commit(types.FOCUS_ON_SUMMARY_FALSE)
      this[types.ADD_PARAGRAPH_HISTORY_NEXT_BY](paragraphHistory)
    },
    addParagraphHistoryBySummary (paragraphHistory) {
      this.$store.commit(types.FOCUS_ON_SUMMARY_TRUE)
      this[types.ADD_PARAGRAPH_HISTORY_NEXT_BY](paragraphHistory)
    },
    toggleMetaController () {
      this.showMetaController = !this.showMetaController
    },
    setFocusTarget (target) {
      this.focusTargetElement = target
    },
    setFocus () {
      this.focusTargetElement.focus()
    }
  }
}
</script>

<style scoped>
.portlet {
  clear: both;
  margin-top: 0;
  margin-bottom: 25px;
  padding: 0;
}

.ui-sortable-handle:not(.notsort),
.portlet.box:not(.notsort) {
  cursor: move;
}

.portlet > .portlet-body {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-top: none;
}

.portlet > .portlet-title {
  padding: 10px 10px 4px 10px;
  color: #fff;
  font-size: 16px;
}

.portlet-placeholder {
  border: 1px dotted #ccc;
  background-color: #dcdcdc;
  margin: 0 1em 1em 0;
  height: 130px;
}

.sortable {
  min-height: 50px;
}
body{font-family:Helvetica,sans-serif}
.playground {
  display: flex;
  margin-top: 4rem;
}
.color-item {
  background: #f5f5f5;
  padding: .5rem;
  color: #5f5f5f;
  transition: transform .3s;
}
.color-item.dragging {
  background-color: #fff;
}
.color-show {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.color-box {
  width: 31%;
  /*background: #efefef;*/
  text-align: center;
  color: #fff;
  transition: transform .3s;
}
@media (min-width: 320px) and (max-width: 425px) {
  .color-show .color-box{
    width: 100% !important;
  }
}
.color-box.dragging {
  transform: scale(1.1);
}
.in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
  transition: all .5s;
}
.in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translate3d(100%, 0, 0);
}
.in-out-translate-fade-leave-active {
  transform: translate3d(-100%, 0, 0);
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.paragraph-history {
  transition: all 1s;
}
.paragraph-history-list-enter, .paragraph-history-list-leave-active {
  display: none;
}

</style>
