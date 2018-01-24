<template>
<aside class="right-aside">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1 v-html="$route.meta.title">Title</h1>
        <!-- <ol class="breadcrumb" v-html="this.$route.meta.breadcrumb"></ol> -->
        <b-breadcrumb :items="$route.meta.breadcrumb"/>
    </section>
    <!-- Main content -->
    <section class="content">
        <slot></slot>
        <!--rightside bar -->
    <right-side-bar></right-side-bar>
    </section>
    <!-- /.content -->
</aside>
</template>
<script>
import rightSideBar from './right-side-bar'
export default {
  components: {
    rightSideBar
  }
}
</script>
