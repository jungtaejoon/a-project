<template>
  <div class="color-list">
    <button @click="ADD_PARAGRAPH_HISTORY">단락 추가</button>
    <paragraph-history
      class="color-item"
      v-for="paragraphHistory in paragraphHistories"
      :key="paragraphHistory.id"
      :id="paragraphHistory.id"
      :initMood="paragraphHistory.mood"
      v-dragging="{ item: paragraphHistory, list: paragraphHistories, group: 'paragraphHistory' }"
      @need-new-paragraph-history="addParagraphHistory"
      @need-new-paragraph-history-by-summary="addParagraphHistoryBySummary"
      @delete-paragraph-history="DELETE_PARAGRAPH_HISTORY"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import ParagraphHistory from './ParagraphHistory'
import VueDND from 'awe-dnd'
import { mapGetters, mapMutations } from 'vuex'
import types from '../mutation-types'

Vue.use(VueDND)

export default {
  components: {
    ParagraphHistory
  },
  computed: {
    ...mapGetters([
      'paragraphHistories'
    ])
  },
  created () {
    this[types.ADD_PARAGRAPH_HISTORY]()
  },
  methods: {
    ...mapMutations([
      types.ADD_PARAGRAPH_HISTORY,
      types.ADD_PARAGRAPH_HISTORY_NEXT_BY,
      types.DELETE_PARAGRAPH_HISTORY
    ]),
    addParagraphHistory (paragraphHistoryId) {
      this.$store.commit(types.FOCUS_ON_SUMMARY_FALSE)
      this[types.ADD_PARAGRAPH_HISTORY_NEXT_BY](paragraphHistoryId)
    },
    addParagraphHistoryBySummary (paragraphHistoryId) {
      this.$store.commit(types.FOCUS_ON_SUMMARY_TRUE)
      this[types.ADD_PARAGRAPH_HISTORY_NEXT_BY](paragraphHistoryId)
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

</style>
