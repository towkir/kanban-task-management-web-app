<template>
  <div class="column">
    <div class="title">
      <h4>
        <span class="color" :style="`background-color: ${column.color};`"></span>
        {{ column.name }} ({{tasks.length}})
      </h4>
    </div>
    <div class="task-list">
      <task
        v-for="task in tasks"
        :key="`task-${task.id}`"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';

export default {
  name: 'Column',
  components: { Task },
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
  width: 280px;
  height: 100%;
  .title {
    margin-bottom: 15px;
    padding: 0 12px;
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
  .task-list {
    padding: 0 12px;
    height: calc(100% - 30px);
    overflow-y: auto;
    box-sizing: border-box;
    scrollbar-width: none;
  }
}
</style>
