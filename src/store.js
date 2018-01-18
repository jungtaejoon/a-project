import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutation-types'

Vue.use(Vuex)

const state = {
  paragraphHistories: [],
  nextParagraphHistoryId: 0
}

const getters = {
  paragraphHistories: (state) => state.paragraphHistories,
  lastParagraphHistoryMood: (state) => {
    const lastParagraphHistory = state.paragraphHistories[state.paragraphHistories.length - 1] || {}
    return lastParagraphHistory.mood || 'default'
  },
  paragraphs: (state, paragraphHistoryId) => state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).paragraphs
}

const mutations = {
  [types.SET_MOOD] (state, {paragraphHistoryId, mood}) {
    state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).mood = mood
  },
  [types.ADD_PARAGRAPH_HISTORY]: state => state.paragraphHistories.push({id: state.nextParagraphHistoryId++, mood: getters.lastParagraphHistoryMood(state)}),
  [types.ADD_PARAGRAPH_HISTORY_NEXT_BY]: (state, {id, mood}) => state.paragraphHistories.find((paragraphHistory, index, paragraphHistories) => {
    if (paragraphHistory.id === id) paragraphHistories.splice(index + 1, 0, {id: state.nextParagraphHistoryId++, mood})
  }),
  [types.DELETE_PARAGRAPH_HISTORY]: (state, id) => state.paragraphHistories.find((paragraphHistory, index, paragraphHistories) => {
    if (paragraphHistory.id === id) paragraphHistories.splice(index, 1)
  })
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
