import types from '../../mutation-types'
import focus from '../../components/focus-target-meta'

const state = {
  paragraphHistories: [],
  nextParagraphHistoryId: 0,
  nextParagraphId: 0,
  focusTarget: {},
  focusTargetType: focus.PARAGRAPH,
  editing: false
}

const getters = {
  paragraphHistories: state => state.paragraphHistories,
  findParagraphHistory: state => paragraphHistoryId => state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId),
  nextParagraphHistoryId: state => state.nextParagraphHistoryId,
  mood: state => paragraphHistoryId => state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).mood,
  summary: state => paragraphHistoryId => state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).summary,
  lastParagraphHistoryMood: state => {
    const lastParagraphHistory = state.paragraphHistories[state.paragraphHistories.length - 1] || {}
    return lastParagraphHistory.mood || 'default'
  },
  paragraphs: state => paragraphHistoryId => {
    const paragraphHistory = state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId)
    return paragraphHistory.paragraphs
  },
  focusTarget: state => state.focusTarget,
  focusTargetType: state => state.focusTargetType,
  edit: state => state.editing
}

const mutations = {
  [types.UPDATE_PARAGRAPH_HISTORIES] (state, value) {
    state.paragraphHistories = value
  },
  [types.ADD_PARAGRAPH_HISTORY] (state) {
    state.paragraphHistories.push({
      id: state.nextParagraphHistoryId++,
      mood: getters.lastParagraphHistoryMood(state),
      summary: ''
    })
  },
  [types.ADD_PARAGRAPH_HISTORY_NEXT_BY] (state, {paragraphHistoryId, mood}) {
    state.paragraphHistories.find((paragraphHistory, index, paragraphHistories) => {
      if (paragraphHistory.id === paragraphHistoryId) {
        paragraphHistories.splice(index + 1, 0, {
          id: state.nextParagraphHistoryId++,
          mood,
          summary: ''
        })
      }
    })
  },
  [types.DELETE_PARAGRAPH_HISTORY] (state, paragraphHistoryId) {
    let targetIndex
    state.paragraphHistories.find((paragraphHistory, index) => {
      if (paragraphHistory.id === paragraphHistoryId) targetIndex = index
    })
    state.paragraphHistories.splice(targetIndex, 1)
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
    let targetIndex
    paragraphHistory.paragraphs.find((paragraph, index) => {
      if (paragraph.id === paragraphId) {
        targetIndex = index
      }
    })
    paragraphHistory.paragraphs.splice(targetIndex, 1)
  },
  [types.UPDATE_SUMMARY] (state, {paragraphHistoryId, value}) {
    state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).summary = value
  },
  [types.UPDATE_MOOD] (state, {paragraphHistoryId, value}) {
    state.paragraphHistories.find(paragraphHistory => paragraphHistory.id === paragraphHistoryId).mood = value
  },
  [types.SET_FOCUS_TARGET] (state, value) {
    state.focusTarget = value
  },
  [types.SET_FOCUS_TARGET_TYPE] (state, value) {
    state.focusTargetType = value
  },
  [types.EDITING_IS_TRUE] (state) {
    state.editing = true
  },
  [types.EDITING_IS_FALSE] (state) {
    state.editing = false
  }
}

export default {
  state,
  getters,
  mutations
}
