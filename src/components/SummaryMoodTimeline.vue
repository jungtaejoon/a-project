<template>
  <div class="ibox-content" id="ibox-content">
    <div id="vertical-timeline" class="vertical-container dark-timeline center-orientation">
      <div v-for="paragraphHistory in paragraphHistories" :key="paragraphHistory.id">
        <a :href="'#' + PARAGRAPH_HISTORY_ID_PREFIX + paragraphHistory.id">
          <div class="vertical-timeline-block">
              <div class="vertical-timeline-icon" :style="{'background-color': moodColor(paragraphHistory.mood)}">
              </div>
              <div class="vertical-timeline-content">
                <h2>{{moodKor(paragraphHistory.mood)}}</h2>
                <p>
                  {{paragraphHistory.summary}}
                </p>
              </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paragraphMoodMeta from './paragraph-mood-meta'
import idPrefixMeta from './id-prefix-meta'

export default {
  computed: {
    ...mapGetters([
      'paragraphHistories'
    ]),
    moodKor: () => mood => {
      if (paragraphMoodMeta[mood]) return paragraphMoodMeta[mood].kor
    },
    moodColor: () => mood => {
      if (paragraphMoodMeta[mood]) return paragraphMoodMeta[mood].color
    }
  },
  data () {
    return {
      ...idPrefixMeta,
      paragraphMoodMeta
    }
  }
}
</script>

<style scoped>

</style>
