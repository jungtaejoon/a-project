import types from '../../mutation-types'

const state = {
  paragraphHistories: [],
  paragraphsTable: {},
  nextParagraphHistoryId: 0,
  nextParagraphId: 0
}

const getters = {
  paragraphHistories: (state) => state.paragraphHistories,
  lastParagraphHistoryMood: (state) => {
    const lastParagraphHistory = state.paragraphHistories[state.paragraphHistories.length - 1] || {}
    return lastParagraphHistory.mood || 'default'
  },
  paragraphs: state => paragraphHistoryId => {
    const paragraphHistory = state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId)
    return paragraphHistory.paragraphs
  }
}

const mutations = {
  [types.SET_MOOD] (state, {paragraphHistoryId, mood}) {
    state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).mood = mood
  },
  [types.ADD_PARAGRAPH_HISTORY] (state) {
    state.paragraphHistories.push({
      id: state.nextParagraphHistoryId++,
      mood: getters.lastParagraphHistoryMood(state)
    })
  },
  [types.ADD_PARAGRAPH_HISTORY_NEXT_BY] (state, {paragraphHistoryId, mood}) {
    state.paragraphHistories.find((paragraphHistory, index, paragraphHistories) => {
      if (paragraphHistory.id === paragraphHistoryId) {
        paragraphHistories.splice(index + 1, 0, {
          id: state.nextParagraphHistoryId++,
          mood
        })
      }
    })
  },
  [types.DELETE_PARAGRAPH_HISTORY] (state, paragraphHistoryId) {
    state.paragraphHistories.find((paragraphHistory, index, paragraphHistories) => {
      if (paragraphHistory.id === paragraphHistoryId) paragraphHistories.splice(index, 1)
    })
  },
  [types.ADD_EMPTY_PARAGRAPH] (state, paragraphHistoryId) {
    const paragraphHistory = state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId)
    paragraphHistory['paragraphs'] = []
    paragraphHistory.paragraphs.push({id: state.nextParagraphId++})
  },
  [types.ADD_PARAGRAPH_WITH_CONFIRMED_CONTENT] (state, {paragraphHistoryId, confirmedContent}) {
    const paragraphHistory = state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId)
    paragraphHistory.paragraphs.push({id: state.nextParagraphId++, content: confirmedContent})
  },
  [types.DELETE_PARAGRAPH] (state, {paragraphHistoryId, paragraphId}) {
    const paragraphHistory = state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId)
    paragraphHistory.paragraphs.find((paragraph, index, paragraphs) => {
      if (paragraph.id === paragraphId) {
        paragraphs.splice(index, 1)
        console.log(paragraphs)
      }
    })
  }
}

export default {
  state,
  getters,
  mutations
}
