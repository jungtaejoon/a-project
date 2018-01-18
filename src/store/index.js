import Vue from 'vue'
import Vuex from 'vuex'
import paper from './modules/paper'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    paper
  }
})
