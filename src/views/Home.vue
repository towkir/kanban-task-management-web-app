<template>
  <div class="home" :class="{ 'sidebar-open' : sidebarOpen }">
    <Header/>
    <side-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'Home',
  components: {
    Header,
    SideBar,
  },
};
</script>

<style lang="scss">
.home {
  &.sidebar-open {
    .logo {
      width: 300px;
    }
  }
}
</style>
