<template>
  <div class="column">
    <h4>{{ column.name }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Column',
  props: {
    column: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  display: inline-block;
  overflow-y: auto;
  margin-right: 24px;
  width: 280px;
  height: 100%;
  h4 {
    @include heading-s;
    color: $grey;
    text-transform: uppercase;
  }
}
</style>
