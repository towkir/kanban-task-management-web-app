<template>
  <div class="column">
    <div class="title">
      <h4>
        <span class="color" :style="`background-color: ${column.color};`"></span>
        {{ column.name }} ({{tasks.length}})
      </h4>
    </div>
    <div class="task-list"></div>
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
  computed: {
    tasks() {
      return this.$store.state.tasks.filter((item) => item.columnId === this.column.id);
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
  .title {
    h4 {
      @include heading-s;
      color: $grey;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      .color {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        margin-right: 12px;
      }
    }
  }
}
</style>
