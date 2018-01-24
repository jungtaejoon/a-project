<template>
  <div>
    <clear_header></clear_header>
    <div class="wrapper">
      <left_side v-show="$store.getters.left_open"></left_side>
      <right_side>
        <router-view></router-view>
      </right_side>
    </div>
    <div class="background-overlay" @click="right_close"></div>
  </div>
</template>
<script>
// eslint-disable-next-line
import clear_header from './components/layout/clear_header'
// eslint-disable-next-line
import left_side from './components/layout/left-side/default/left-side'
// eslint-disable-next-line
import right_side from './components/layout/right-side'

export default {
  components: {
    clear_header,
    left_side,
    right_side
  },
  created: function () {
  },
  methods: {
    right_close () {
      this.$store.commit('rightside_bar', 'close')
    }
  },
  mounted () {
    window.onscroll = function (event) {
      var top = (document.getElementById('menu') && document.getElementById('menu').scrollTop) || (document.body && document.body.scrollTop) || 0
      if (top <= 56) {
        document.getElementById('right').style.marginTop = -top + 'px'
      } else {
        document.getElementById('right').style.marginTop = -56 + 'px'
      }
    }
  }
}
</script>
<style src="./assets/css/custom_css/metisMenu.css"></style>
<style lang="scss" src="./assets/sass/dark/custom.scss"></style>
<style>
  body.fixed-header #app .navbar {
    position: relative;
  }

  body.fixed-header #app .header {
    margin-bottom: 0;
  }
</style>
