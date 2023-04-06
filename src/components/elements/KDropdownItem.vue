<template>
  <div class="k-dropdown-item">
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'KDropdownItem',
};
</script>

<style lang="scss" scoped>
.k-dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  @include body-l;
  color: $grey;
  background-color: inherit;
  transition-property: color, background;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: $body-bg-color;
  }
}
</style>
