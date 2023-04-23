<template>
  <modal
    id="view-task"
    noFooter
  >
    <template #header>
      {{taskToView.title}}
      <div class="menu">
        <k-dropdown
          id="task-menu"
          position="right"
        >
          <template #text>
            <button class="btn edit-task">
              <DotsVrIcon />
            </button>
          </template>
          <k-dropdown-item @click="editTask">Edit Task</k-dropdown-item>
          <k-dropdown-item @click="deleteTask" variant="danger">Delete Task</k-dropdown-item>
        </k-dropdown>
      </div>
    </template>
    <template #body>
      <p v-if="taskToView.description">{{taskToView.description}}</p>
      <h5 class="subtasks">
        Subtasks ({{numberOfCompletedSubTasks(subtasks)}} of {{subtasks.length}})
      </h5>
      <div class="subtask-list">
        <sub-task
          v-for="subtask in subtasks"
          :key="subtask.id"
          :sub-task="subtask" />
      </div>
      <div class="form-input">
        <label for="task-status">Current Status</label>
        <k-select
          id="task-status"
          placeholder="Select a Status"
          :value="columnOfThisTask ? columnOfThisTask.id : ''"
          label-key="name"
          value-key="id"
          :options="columnsInCurrentBoard"
          :append="(item) =>
            `<span class='circle' style='background-color: ${item.color}'></span>`"
          @change="moveTaskToColumn"
        />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import SubTask from '@/components/tasks/SubTask.vue';
import KSelect from '@/components/elements/KSelect.vue';
import DotsVrIcon from '@/components/vectors/DotsVrIcon.vue';
import KDropdown from '@/components/elements/KDropdown.vue';
import KDropdownItem from '@/components/elements/KDropdownItem.vue';

export default {
  name: 'ViewTask',
  components: {
    DotsVrIcon, KDropdown, KDropdownItem, Modal, SubTask, KSelect,
  },
  props: {
    taskToView: {
      type: Object,
      required: true,
    },
  },
  computed: {
    subtasks() {
      return this.$store.state.subTasks.filter((item) => item.taskId === this.taskToView.id);
    },
    columnOfThisTask() {
      return this.$store.state.columns.find((item) => item.id === this.taskToView.columnId);
    },
  },
  methods: {
    numberOfCompletedSubTasks(tasks) {
      return tasks.filter((item) => item.isCompleted).length;
    },
    moveTaskToColumn(columnId) {
      this.taskToView.columnId = columnId;
      this.$store.dispatch('addOrUpdateTask', this.taskToView);
    },
    editTask() {
      this.$root.$emit('task::add-or-edit', this.taskToView);
    },
    deleteTask() {
      this.$root.$emit('task::delete', this.taskToView);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .modal-header {
  position: relative;
  padding-right: 20px;
  .menu {
    position: absolute;
    top: 0;
    right: 0;
    .btn.edit-task {
      padding: 4px 0 4px 15px;
      line-height: 0;
    }
  }
}

h5.subtasks {
  color: $body-text-color;
  @include body-m;
  margin: 24px 0 16px;
}

.subtask-list {
  margin-bottom: 20px;
}
</style>
