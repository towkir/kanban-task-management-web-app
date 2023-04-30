<template>
  <div
    class="task-wrapper"
    :class="[{ 'dragging-nearby' : dropZoneVisible }, { dragged : beingDragged },
      dropZoneVisible ? dropZonePosition : null ]"
    @dragenter="showDropZone"
    @dragleave="hideDropZone"
  >
    <div class="dropzone top">
      <drop-preview
        v-if="draggedTaskLocal.id"
        :task-to-preview="draggedTaskLocal"
      />
    </div>
    <div
      class="task"
      @click="viewTask"
      draggable="true"
      @dragstart="handleDrag"
      @dragend="resetDropZone"
      @dragover="decideTopOrBottom"
    >
      <h5>{{ task.title }}</h5>
      <p>
        {{ numberOfCompletedSubTasks(numberOfSubtasks(task))}}
        of {{ numberOfSubtasks(task).length }}
        {{ singularOrPlural(numberOfSubtasks(task).length, 'subtask', 'subtasks')}}
      </p>
    </div>
    <div class="dropzone bottom">
      <drop-preview
        v-if="draggedTaskLocal.id"
        :task-to-preview="draggedTaskLocal"
      />
    </div>
  </div>
</template>

<script>
import DropPreview from '@/components/tasks/DropPreview.vue';

export default {
  name: 'Task',
  components: { DropPreview },
  props: {
    task: {
      type: Object,
    },
    index: {
      type: Number,
    },
    dropZoneVisibleFromColumn: {
      type: Boolean,
      default: false,
    },
    draggedTask: {
      type: Object,
    },
  },
  data() {
    return {
      beingDragged: false,
      nearbyDragGoingOn: false,
      draggedTaskLocal: {},
      dropZonePosition: '',
      dragNodeLevel: 0,
    };
  },
  computed: {
    order() {
      return this.task.order;
    },
    dropZoneVisible() {
      return this.nearbyDragGoingOn && this.dropZoneVisibleFromColumn && !this.beingDragged;
    },
  },
  methods: {
    viewTask() {
      this.$root.$emit('task::view', this.task);
    },
    handleDrag(event) {
      this.beingDragged = true;
      this.draggedTaskLocal = {};
      event.dataTransfer.setData('taskId', this.task.id);
      this.$root.$emit('task::dragged', this.task);
    },
    decideTopOrBottom(event) {
      const draggedOneIsNextTaskInSameColumn = this.task.columnId === this.draggedTask.columnId
        && this.task.order + 1 === this.draggedTask.order;
      const firstTaskInColumn = this.index === 0;
      const bottomOrNoDropZone = draggedOneIsNextTaskInSameColumn ? '' : 'bottom';
      this.dropZonePosition = firstTaskInColumn
        && event.offsetY / event.currentTarget.clientHeight < 0.5 ? 'top' : bottomOrNoDropZone;
    },
    showDropZone() {
      this.dragNodeLevel += 1;
      this.nearbyDragGoingOn = true;
      this.draggedTaskLocal = { ...this.draggedTask };
      this.$emit('setOrder', this.index + 1 + (this.dropZonePosition === 'bottom'
        && !this.beingDragged ? 1 : 0));
    },
    hideDropZone() {
      this.dragNodeLevel -= 1;
      if (this.dragNodeLevel === 0) {
        this.nearbyDragGoingOn = false;
        this.draggedTaskLocal = {};
        // this.$emit('setOrder', 0);
      }
    },
    resetDropZone() {
      this.beingDragged = false;
      this.dragNodeLevel = 0;
      this.nearbyDragGoingOn = false;
      this.draggedTaskLocal = {};
      // this.$emit('setOrder', 0);
    },
  },
  watch: {
    dropZoneVisibleFromColumn: {
      handler(val) {
        if (!val) {
          this.nearbyDragGoingOn = false;
        }
      },
    },
  },
};
</script>
