<template>
  <div
    class="k-dropdown-item"
    tabindex="0"
    ref="k-dropdown-item"
    @click="emitClick"
    @keypress="handleEnter"
  >
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'KDropdownItem',
  methods: {
    emitClick() {
      this.$emit('click');
    },
    handleEnter(e) {
      if (e.keyCode === 13) {
        this.$refs['k-dropdown-item'].click();
      }
    },
  },
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
  &:hover, &:focus {
    background-color: $body-bg-color;
  }
  &:focus {
    outline: none;
  }
}
</style>
