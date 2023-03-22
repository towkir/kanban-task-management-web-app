<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo-dark.svg" alt="logo">
      <div class="spacer"></div>
    </div>
    <div class="content">
      <h1>Platform Launch</h1>
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
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  background-color: $header-bg-color;
  border-bottom: 1px solid $border-color;
  .logo {
    padding: 20px;
  }
  .content {
    border-left: 1px solid $border-color;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
  h1 {
    @include heading-xl;
  }
}
</style>
