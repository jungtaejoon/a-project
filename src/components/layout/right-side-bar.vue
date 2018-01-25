<template>
  <div id="right" :class="{ open: $store.getters.right_open }">
    <div id="right-slim">
      <div class="rightsidebar-right">
        <b-tabs ref="tabs" card>
          <b-tab title="<i class='ti-comments'></i>" active>
            <div id="slim_t1">
              <div>
                <h5 class="rightsidebar-right-heading text-uppercase text-xs">
                  <i class="menu-icon  fa fa-fw ti-user"></i>
                  Summary
                </h5>
                <div class="row">
                  <div class="col-md-12 timeline_card">
                    <div class="card-body">
                      <!--timeline-->
                      <div>
                        <ul class="timeline">
                          <draggable v-model="paragraphHistories" :options="{ghostClass: 'ghost'}">
                            <transition-group name="paragraph-history-list">
                              <summary-mood-timeline
                                class="timeline-inverted"
                                v-for="paragraphHistory in paragraphHistories"
                                :key="paragraphHistory.id"
                                :paragraphHistoryId="paragraphHistory.id"
                                :initMood="paragraphHistory.mood"
                                :initSummary="paragraphHistory.summary"
                              ></summary-mood-timeline>
                            </transition-group>
                          </draggable>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import SummaryMoodTimeline from '../SummaryMoodTimeline'
import draggable from 'vuedraggable'
import types from '../../mutation-types'

export default {
  components: {
    SummaryMoodTimeline, draggable
  },
  computed: {
    paragraphHistories: {
      get () {
        return this.$store.getters.paragraphHistories
      },
      set (value) {
        this.$store.commit(types.UPDATE_PARAGRAPH_HISTORIES, value)
      }
    }
  },
  mounted: function () {

  },
  destroyed: function () {
  },
  methods: {
    change_skin () {
    }
  }
}
</script>
<style src="../../assets/css/timeline.css"></style>
<style scoped>
  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }
  .timeline-inverted {
    transition: all .5s;
  }
  .paragraph-history-list-enter, .paragraph-history-list-leave-active {
    display: none;
  }
</style>
