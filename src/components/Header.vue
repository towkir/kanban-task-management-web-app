<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo-dark.svg" alt="logo">
      <div class="spacer"></div>
    </div>
    <div class="content">
      <h1>{{ currentBoard.name }}</h1>
      <div class="action">
        <button class="btn btn-primary btn-lg">
          + Add New Task
        </button>
        <button class="btn btn-minimal">
          <dots-icon/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DotsIcon from '@/components/vectors/DotsIcon.vue';

export default {
  name: 'Header',
  components: { DotsIcon },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: stretch;
  background-color: $header-bg-color;
  border-bottom: 1px solid $border-color;
  transition-property: background, border;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  .logo {
    width: 200px;
    padding: 20px;
    display: flex;
    align-items: center;
    border-right: 1px solid $border-color;
    box-sizing: border-box;
    transition-property: width, border;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
  .content {
    color: $body-text-color;
    transition: color 0.3s ease-in-out;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    h1 {
      @include heading-xl;
    }
  }
}
</style>
