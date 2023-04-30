<template>
  <div>
    <h5>{{ taskToPreview.title }}</h5>
    <p>
      {{ numberOfCompletedSubTasks(numberOfSubtasks(taskToPreview))}}
      of {{ numberOfSubtasks(taskToPreview).length }}
      {{ singularOrPlural(numberOfSubtasks(taskToPreview).length, 'subtask', 'subtasks')}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'DropPreview',
  props: {
    taskToPreview: {
      type: Object,
      required: true,
    },
  },
};
</script>
