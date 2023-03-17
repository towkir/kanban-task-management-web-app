<template>
  <div class="header">
    <img src="@/assets/logo-dark.svg" alt="logo">
    <h1>Platform Launch</h1>
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
  h1 {
    @include heading-xl;
  }
}
</style>
