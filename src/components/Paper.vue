<template>
  <div class="color-list">
    <button @click="createParagraphHistory">단락 추가</button>
    <paragraph-history
      class="color-item"
      v-for="paragraphHistoryId in paragraphHistoryIds"
      :key="paragraphHistoryId"
      :id="paragraphHistoryId"
      :mood="'sadness'"
      v-dragging="{ item: paragraphHistoryId, list: paragraphHistoryIds, group: 'paragraphHistory' }"
      @need-new-paragraph-history="createParagraphHistory"
      @delete-paragraph-history="deleteParagraphHistory"
    ></paragraph-history>
  </div>
</template>

<script>
import Vue from 'vue'
import ParagraphHistory from './ParagraphHistory'
import VueDND from 'awe-dnd'

Vue.use(VueDND)

export default {
  components: {
    ParagraphHistory
  },
  data () {
    return {
      paragraphHistoryIds: [],
      nextParagraphHistoryId: 1
    }
  },
  created () {
    this.createParagraphHistory()
  },
  methods: {
    createParagraphHistory (paragraphHistoryId) {
      if (typeof paragraphHistoryId === 'number') {
        const targetIndex = this.paragraphHistoryIds.indexOf(paragraphHistoryId)
        this.paragraphHistoryIds.splice(targetIndex + 1, 0, this.nextParagraphHistoryId++)
      } else {
        this.paragraphHistoryIds.push(this.nextParagraphHistoryId++)
      }
    },
    deleteParagraphHistory (paragraphHistoryId) {
      const targetIndex = this.paragraphHistoryIds.indexOf(paragraphHistoryId)
      if (targetIndex !== -1) {
        this.paragraphHistoryIds.splice(targetIndex, 1)
      }
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
