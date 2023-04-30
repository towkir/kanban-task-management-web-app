<template>
  <div
    class="column"
    @drop="receiveTaskFromDrop"
    @dragover="allowDrop"
    @dragenter="showDropZone"
    @dragleave="hideDropZone"
    @dragend="resetDropZone"
  >
    <div class="title" :class="{ open : menuOpen }">
      <h4>
        <span class="color" :style="`background-color: ${column.color};`"></span>
        {{ column.name }} ({{tasks.length}})
      </h4>
      <k-dropdown
        :id="`${column.id}-dropdown`"
        position="right"
        @open="showContextIcon"
        @close="hideContextIcon"
      >
        <template #text>
          <button class="btn edit-column">
            <DotsHrIcon />
          </button>
        </template>
        <k-dropdown-item @click="editColumn">Edit</k-dropdown-item>
        <k-dropdown-item @click="deleteColumn" variant="danger">Delete</k-dropdown-item>
      </k-dropdown>
    </div>
    <div class="task-list">
      <task
        v-for="(task, t) in tasks"
        :key="`task-${task.id}`"
        :index="t"
        :task="task"
        :drop-zone-visible-from-column="dropZoneVisible"
        :dragged-task="draggedTaskLocal"
        @setOrder="setOrderForIncomingTask"
      />
      <template v-if="commonDropZoneVisible">
        <div class="task-wrapper dragging-nearby" :class="{ bottom : dropZoneVisible }">
          <div class="dropzone bottom">
            <!-- TODO: move to component -->
            <template v-if="draggedTask.id">
              <h5>{{ draggedTask.title }}</h5>
              <p>
                {{ numberOfCompletedSubTasks(numberOfSubtasks(draggedTaskLocal))}}
                of {{ numberOfSubtasks(draggedTaskLocal).length }}
                {{ singularOrPlural(numberOfSubtasks(draggedTaskLocal).length, 'subtask',
                  'subtasks')}}
              </p>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import KDropdown from '@/components/elements/KDropdown.vue';
import KDropdownItem from '@/components/elements/KDropdownItem.vue';
import DotsHrIcon from '@/components/vectors/DotsHrIcon.vue';
import Task from '@/components/tasks/Task.vue';

export default {
  name: 'Column',
  components: {
    KDropdown, KDropdownItem, DotsHrIcon, Task,
  },
  props: {
    column: {
      type: Object,
    },
    draggedTask: {
      type: Object,
    },
  },
  data() {
    return {
      menuOpen: false,
      dragNodeLevel: 0,
      dropZoneVisible: false,
      toBeDroppedTaskOrder: 0,
      draggedTaskLocal: {},
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
        .filter((item) => item.columnId === this.column.id)
        .sort((a, b) => a.order - b.order);
    },
    commonDropZoneVisible() {
      const lastTaskInColumn = this.tasks[this.tasks.length - 1];
      const draggedTaskIsTheLastTask = lastTaskInColumn && this.draggedTask.id
        ? this.draggedTask.id === lastTaskInColumn.id : false;
      return this.toBeDroppedTaskOrder === 0 && !draggedTaskIsTheLastTask;
    },
  },
  methods: {
    showContextIcon() {
      this.menuOpen = true;
    },
    hideContextIcon() {
      this.menuOpen = false;
    },
    editColumn() {
      this.$emit('editColumn', this.column);
    },
    deleteColumn() {
      this.$emit('deleteColumn', this.column);
    },
    setOrderForIncomingTask(order) {
      this.toBeDroppedTaskOrder = order;
    },
    allowDrop(event) {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.dataTransfer.dropEffect = 'move';
    },
    receiveTaskFromDrop(event) {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('taskId');
      const task = { ...this.$store.state.tasks.find((item) => item.id === taskId) };
      let tasksInThisColumn = [...this.$store.state.tasks
        .filter((item) => item.columnId === this.column.id)
        .sort((a, b) => a.order - b.order)];
      const taskIsInTheSameColumn = tasksInThisColumn.map((item) => item.id).includes(taskId);
      const order = this.toBeDroppedTaskOrder === 0
        ? this.tasks.length + (!taskIsInTheSameColumn ? 1 : 0) : this.toBeDroppedTaskOrder;
      task.columnId = this.column.id;
      if (taskIsInTheSameColumn) {
        const temporaryTaskListWithoutDraggedOne = tasksInThisColumn
          .filter((item) => item.order !== this.draggedTask.order);
        const taskMovingUp = this.draggedTaskLocal.order > this.toBeDroppedTaskOrder;
        temporaryTaskListWithoutDraggedOne.splice(order - (1 + (taskMovingUp ? 0 : 1)),
          0, task);
        tasksInThisColumn = temporaryTaskListWithoutDraggedOne;
      } else {
        tasksInThisColumn.splice(order - 1, 0, task);
      }
      for (let i = 0; i < tasksInThisColumn.length; i += 1) {
        tasksInThisColumn[i].order = i + 1;
        this.$store.dispatch('addOrUpdateTask', tasksInThisColumn[i]);
      }
      this.$root.$emit('task::dropped');
      this.resetDropZone();
    },
    showDropZone() {
      this.dragNodeLevel += 1;
      this.dropZoneVisible = true;
      this.draggedTaskLocal = { ...this.draggedTask };
    },
    hideDropZone() {
      this.dragNodeLevel -= 1;
      if (this.dragNodeLevel === 0) {
        this.dropZoneVisible = false;
        this.toBeDroppedTaskOrder = 0;
        this.draggedTaskLocal = {};
      }
    },
    resetDropZone() {
      this.dragNodeLevel = 0;
      this.dropZoneVisible = false;
      this.toBeDroppedTaskOrder = 0;
      this.draggedTaskLocal = {};
    },
  },
  watch: {
    draggedTask: {
      deep: true,
      handler(val) {
        if (!val.id) {
          this.resetDropZone();
        }
      },
    },
  },
};
</script>

<style lang="scss">
.column {
  display: inline-block;
  width: 280px;
  height: 100%;
  .title {
    padding: 0 12px 15px 12px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover, &.open {
      .btn.edit-column {
        opacity: 1;
      }
    }
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
    .btn.edit-column {
      padding: 0 12px;
      line-height: 1.2;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      &:focus-visible {
        opacity: 1;
      }
      svg {
        margin-bottom: 2px;
      }
    }
  }
  .task-list {
    padding: 0 12px;
    height: calc(100% - 30px);
    overflow-y: auto;
    box-sizing: border-box;
    scrollbar-width: none;
    @import "~@/assets/styles/task-styles.scss";
  }
}

@include tab-sm {
  .column {
    .title {
      .btn.edit-column {
        opacity: 1;
      }
    }
  }
}
</style>
