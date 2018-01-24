const state = {
  left_open: true,
  right_open: false,
  preloader: true,
  user: {
    name: 'Addison',
    picture: '/static/a1.jpg',
    job: 'Project Manager'
  }
}

const getters = {
  left_open: state => state.left_open,
  right_open: state => state.right_open,
  preloader: state => state.preloader,
  user: state => state.user
}

const mutations = {
  left_menu (state, option) {
    if (option === 'open') {
      state.left_open = true
    } else if (option === 'close') {
      state.left_open = false
    } else if (option === 'toggle') {
      state.left_open = !state.left_open
    }
    if (state.left_open) {
      document.getElementsByTagName('body')[0].classList.remove('left-hidden')
    } else {
      document.getElementsByTagName('body')[0].classList.add('left-hidden')
    }
  },
  rightside_bar (state, option) {
    if (option === 'open') {
      state.right_open = true
    } else if (option === 'close') {
      state.right_open = false
    } else if (option === 'toggle') {
      state.right_open = !state.right_open
    }
    if (state.right_open) {
      document.getElementsByTagName('body')[0].classList.add('sidebar-right-opened')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('sidebar-right-opened')
    }
  },
  routeChange (state, loader) {
    if (loader === 'start') {
      state.preloader = true
    } else if (loader === 'end') {
      state.preloader = false
    }
  }
}

export default {
  state,
  getters,
  mutations
}
