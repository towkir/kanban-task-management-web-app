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
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
