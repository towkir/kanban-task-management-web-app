<template>
  <modal
    id="add-or-edit-task"
    :title="modalTitle"
    @close="emitClear"
  >
    <template #body>
      <div class="form-input">
        <label for="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          class="input"
          placeholder="Task Title"
          autocomplete="off"
          v-model="task.title"
        />
      </div>
      <div class="form-input">
        <label for="task-description">Description</label>
        <textarea
          id="task-description"
          class="input"
          placeholder="Task Description"
          autocomplete="off"
          v-model="task.description"
          rows="4"
        ></textarea>
      </div>
      <div class="subtasks form-input">
        <label>Subtasks</label>
        <div class="subtask-list" ref="subtask-list">
          <div
            class="input-box"
            v-for="(input, index) in task.subtasks"
            :key="`subtask-input-${index}`"
          >
            <input
              type="text"
              class="input"
              placeholder="Subtask Title"
              autocomplete="off"
              v-model="input.title"
            >
            <button
              class="btn remove-task"
              @click="removeSubTask(index)"
            >
              <close-icon />
            </button>
          </div>
        </div>
        <p
          v-if="task.subtasks && task.subtasks.length === 0"
          class="message"
        >
          No subtasks added
        </p>
        <button class="btn btn-secondary btn-block" @click="addSubTask">+Add New Subtask</button>
      </div>
      <div class="form-input">
        <label for="task-status">Status</label>
        <k-select
          id="task-status"
          placeholder="Select a Status"
          :value="task.columnId"
          label-key="name"
          value-key="id"
          :options="columnsInCurrentBoard"
          :append="(item) =>
            `<span class='circle' style='background-color: ${item.color}'></span>`"
          @change="updateStatus"
        />
      </div>
    </template>
    <template #footer>
      <button
        class="btn btn-primary btn-block"
        :disabled="!isFormValid"
        @click="addOrUpdateTask"
      >
        {{ modalButtonText }}
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import KSelect from '@/components/elements/KSelect.vue';
import CloseIcon from '@/components/vectors/CloseIcon.vue';

export default {
  name: 'AddOrEditTask',
  props: {
    taskToAddOrEdit: {
      type: Object,
    },
  },
  components: { Modal, KSelect, CloseIcon },
  data() {
    return {
      task: {},
    };
  },
  computed: {
    modalTitle() {
      return this.taskToAddOrEdit.id ? 'Edit Task' : 'Add New Task';
    },
    modalButtonText() {
      return this.taskToAddOrEdit.id ? 'Save' : 'Add';
    },
    isFormValid() {
      return this.task.title !== '' && this.task.columnId !== '';
    },
    columnsInCurrentBoard() {
      return this.$store.state.columns.filter((item) => item.boardId === this.currentBoard.id);
    },
  },
  methods: {
    updateStatus(option) {
      const column = this.$store.state.columns.find((item) => item.id === option);
      if (column) {
        this.task.columnId = column.id;
        this.task.status = column.name;
      }
    },
    addSubTask() {
      const newSubTask = {
        title: '',
        isCompleted: false,
      };
      if (this.task.id) {
        newSubTask.taskId = this.task.id;
      }
      this.task.subtasks.push(newSubTask);
      this.smoothScrollToBottom();
    },
    removeSubTask(index) {
      this.task.subtasks.splice(index, 1);
    },
    smoothScrollToBottom() {
      this.$nextTick(() => {
        const visibleHeightOfElement = this.$refs['subtask-list'].offsetHeight;
        const actualHeightOfElement = this.$refs['subtask-list'].scrollHeight;
        if (actualHeightOfElement > visibleHeightOfElement) {
          this.$refs['subtask-list'].scrollTo({
            top: actualHeightOfElement,
            behavior: 'smooth',
          });
        }
      });
    },
    addOrUpdateTask() {
      // adding or updating subtasks:
      const subTasksToAddOrUpdate = this.task.subtasks.filter((item) => item.title !== '');
      for (let i = 0; i < subTasksToAddOrUpdate.length; i += 1) {
        if (!subTasksToAddOrUpdate[i].id) {
          const allSubTaskIds = this.$store.state.subTasks.map((subTask) => subTask.id);
          subTasksToAddOrUpdate[i].id = this.findNextValidId(allSubTaskIds, 'subtask');
          subTasksToAddOrUpdate[i].taskId = this.task.id;
        }
        this.$store.dispatch('addOrUpdateSubTask', subTasksToAddOrUpdate[i]);
      }
      // deleting subtasks:
      const subTasksToDelete = this.taskToAddOrEdit.subtasks
        .filter((item) => !this.task.subtasks.map((subtask) => subtask.id).includes(item.id));
      for (let i = 0; i < subTasksToDelete.length; i += 1) {
        this.$store.dispatch('deleteSubTask', subTasksToDelete[i]);
      }
      // adding or updating the task:
      if (!this.task.id) {
        const allTaskIds = this.$store.state.tasks.map((item) => item.id);
        this.task.id = this.findNextValidId(allTaskIds, 'task');
      }
      this.task.subtasks = []; // clearing since subtasks are separately added
      this.$store.dispatch('addOrUpdateTask', this.task);
      this.$root.$emit('modal::hide', 'add-or-edit-task');
      this.emitClear();
    },
    emitClear() {
      this.$emit('clearTask');
    },
    prepareForm(taskData) {
      if (taskData.id) {
        this.task = { ...taskData };
        this.task.subtasks = this.$store.state.subTasks
          .filter((item) => item.taskId === this.taskToAddOrEdit.id);
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.task = {
        id: '',
        columnId: '',
        title: '',
        description: '',
        status: '',
        subtasks: [],
      };
    },
  },
  watch: {
    taskToAddOrEdit: {
      deep: true,
      handler(val) {
        this.prepareForm(val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.subtasks {
  margin-bottom: 15px;
  .subtask-list {
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 10px;
    .input-box {
      display: flex;
      align-items: flex-start;
      .btn.remove-task {
        padding: 8px 8px 8px 16px;
        svg {
          height: 12px;
          vertical-align: middle;
        }
      }
    }
  }
  .message {
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>
