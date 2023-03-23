<template>
  <div class="home" :class="{ 'sidebar-open' : sideBarOpen }">
    <Header/>
    <side-bar/>
    <board/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Board from '@/components/Board.vue';

export default {
  name: 'Home',
  components: {
    Header,
    SideBar,
    Board,
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
