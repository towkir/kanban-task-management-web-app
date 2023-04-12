<template>
  <div class="task">
    <h5>{{ task.title }}</h5>
    <p>
      {{numberOfCompletedSubTasks(numberOfSubtasks)}} of {{ numberOfSubtasks.length }}
      {{singularOrPlural(numberOfSubtasks.length, 'subtask', 'subtasks')}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
    },
  },
  computed: {
    numberOfSubtasks() {
      return this.$store.state.subTasks.filter((item) => item.taskId === this.task.id);
    },
  },
  methods: {
    numberOfCompletedSubTasks(tasks) {
      return tasks.filter((item) => item.isCompleted).length;
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  background-color: $header-bg-color;
  color: $body-text-color;
  padding: 22px 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
  cursor: pointer;
  transition-property: background, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  user-select: none;
  h5 {
    @include heading-m;
    color: $body-text-color;
    margin-bottom: 5px;
    transition: color 0.3s ease-in-out;
  }
  p {
    @include body-m;
    color: $grey;
  }
}
</style>
