<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="logo">
        <!-- Add the class icon to your logo image or logo icon to add the margining -->
        <img src="../../assets/img/logo.png" alt="logo"/>
      </router-link>
      <div class="navbar-collapse">
        <!-- Sidebar toggle button -->
        <div>
          <a href="javascript:void(0)" class="navbar-btn sidebar-toggle" @click="toggle_left" role="button">
            <i class="fa fa-fw fa-bars"></i>
          </a>
        </div>
      </div>
      <ul class="navbar-nav mr-auto">
        <!-- Messages dropdown -->
        <div class="message_dropdown">
          <b-dropdown variant="link" size="lg" no-caret>
            <template slot="button-content">
              <i class="ti-email"></i>
              <b-badge pill variant="success">2</b-badge>
            </template>

            <b-dropdown-item href="#">
              <b-dropdown-item class="messages-header">
                New Messages
              </b-dropdown-item>
            </b-dropdown-item>
            <b-dropdown-item href="#" class="message striped-col">
              <img class="message-image rounded-circle" src="../../assets/img/authors/avatar7.jpg" alt="avatar-image">
              <div class="message-body"><strong>Ernest Kerry</strong>
                <br> Can we Meet?
                <br>
                <small>Just Now</small>
                <span class="label label-success label-mini msg-lable">New</span>
              </div>
            </b-dropdown-item>
            <b-dropdown-item class="message striped-col">

              <img class="message-image rounded-circle" src="../../assets/img/authors/avatar7.jpg" alt="avatar-image">
              <div class="message-body"><strong>Ernest Kerry</strong>
                <br> Can we Meet?
                <br>
                <small>Just Now</small>
                <span class="label label-success label-mini msg-lable">New</span>
              </div>
            </b-dropdown-item>
            <b-dropdown-item class="messages-footer"><a href="#">View All messages</a></b-dropdown-item>
          </b-dropdown>
        </div>
        <!-- Messages Dropdown -->
        <!--rightside toggle-->
        <div class="right-toggle btn-group">
          <button type="button" class="btn btn-secondary" @click="toggle_right">
            <i class="fa fa-fw ti-view-list black"></i>
            <b-badge pill variant="danger">2</b-badge>
          </button>
        </div>
        <!--rightside toggle-->
        <!-- User menu -->
        <b-dd class="user-dropdown">
          <template slot="button-content">
            <a href="#">
              <img :src="$store.getters.user.picture" width="35" class="rounded-circle img-responsive float-left"
                   height="35" alt="User Image">
              <span class="user_name_max">
                            {{ $store.getters.user.name }}

                        </span>
            </a>
          </template>
          <div class="dropdown-profile">
            <li class="user-header">
              <img :src="$store.getters.user.picture" class="rounded-circle" alt="User Image">
              <p class="user_name_max" v-text="$store.getters.user.name"></p>
            </li>
            <!-- Menu Body -->
            <b-dropdown-item>
              <router-link to="/user_profile" exact>
                <i class="fa fa-fw ti-user"></i> My Profile
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/edit_user" exact>
                <i class="fa fa-fw ti-settings"></i> Account Settings
              </router-link>
            </b-dropdown-item>
            <!-- Menu Footer-->
            <b-dropdown-item class="dropdown-footer">
              <div class="float-left">
                <router-link to="/lockscreen" exact>
                  <i class="fa fa-fw ti-lock"></i> Lock
                </router-link>
              </div>
              <div class="float-right">
                <router-link to="/login" exact>
                  <i class="fa fa-fw ti-shift-right"></i> Logout
                </router-link>
              </div>
            </b-dropdown-item>
          </div>
        </b-dd>
        <!-- User menu -->
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  methods: {
    toggle_left () {
      this.$store.commit('left_menu', 'toggle')
    },
    toggle_right () {
      this.$store.commit('rightside_bar', 'toggle')
    }
  }
}
</script>
