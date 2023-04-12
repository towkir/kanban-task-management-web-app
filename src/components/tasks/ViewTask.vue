<template>
  <modal
    id="view-task"
    :title="task.title"
  >
    <template #body>
      <p v-if="task.description">{{task.description}}</p>
      <h5 class="subtasks">
        Subtasks ({{numberOfCompletedSubTasks(subtasks)}} of {{subtasks.length}})
      </h5>
      <sub-task
        v-for="subtask in subtasks"
        :key="subtask.id"
        :sub-task="subtask" />
      <div class="form-input">
        <label for="task-status">Status</label>
        <k-select
          id="task-status"
          placeholder="Select a Status"
          :value="columnOfThisTask.id"
          label-key="name"
          value-key="id"
          :options="columnsInCurrentBoard"
          :append="(item) =>
            `<span class='circle' style='background-color: ${item.color}'></span>`"
          @change="updateColumn"
        />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import SubTask from '@/components/tasks/SubTask.vue';
import KSelect from '@/components/elements/KSelect.vue';

export default {
  name: 'ViewTask',
  components: { Modal, SubTask, KSelect },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    subtasks() {
      return this.$store.state.subTasks.filter((item) => item.taskId === this.task.id);
    },
    columnOfThisTask() {
      return this.$store.state.columns.find((item) => item.id === this.task.columnId);
    },
    columnsInCurrentBoard() {
      return this.$store.state.columns.filter((item) => item.boardId === this.currentBoard.id);
    },
  },
  methods: {
    numberOfCompletedSubTasks(tasks) {
      return tasks.filter((item) => item.isCompleted).length;
    },
    updateColumn() {
      // update task status or column here;
    },
  },
};
</script>

<style lang="scss" scoped>
h5.subtasks {
  @include body-m;
  margin: 24px 0 16px;
}
</style>
