<template>
  <div
    class="task-wrapper"
    :class="[{ 'dragging-nearby' : showDropZone }, { dragged : beingDragged },
      showDropZone ? dropZonePosition : null ]"
    @dragenter="addEffect"
    @dragleave="removeEffect"
    @dragend="resetEffect"
  >
    <div class="dropzone top"></div>
    <div
      class="task"
      @click="viewTask"
      draggable="true"
      @dragstart="handleDrag"
      @dragend="resetEffect"
      @dragover="decideTopOrBottom"
    >
      <h5>{{ task.title }}</h5>
      <p>
        {{ numberOfCompletedSubTasks(numberOfSubtasks)}} of {{ numberOfSubtasks.length }}
        {{ singularOrPlural(numberOfSubtasks.length, 'subtask', 'subtasks')}}
      </p>
    </div>
    <div class="dropzone bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
    },
    index: {
      type: Number,
    },
    dropZoneVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      beingDragged: false,
      nearbyDragGoingOn: false,
      dropZonePosition: 'bottom',
      dragNodeLevel: 0,
    };
  },
  computed: {
    numberOfSubtasks() {
      return this.$store.state.subTasks.filter((item) => item.taskId === this.task.id);
    },
    order() {
      return this.task.order;
    },
    showDropZone() {
      return this.nearbyDragGoingOn && this.dropZoneVisible && !this.beingDragged;
    },
  },
  methods: {
    viewTask() {
      this.$root.$emit('task::view', this.task);
    },
    numberOfCompletedSubTasks(tasks) {
      return tasks.filter((item) => item.isCompleted).length;
    },
    handleDrag(event) {
      this.beingDragged = true;
      event.dataTransfer.setData('taskId', this.task.id);
    },
    decideTopOrBottom(event) {
      if (this.index === 0 && event.target === event.currentTarget) {
        this.dropZonePosition = event.offsetY / event.currentTarget.clientHeight > 0.5
          ? 'bottom' : 'top';
      }
    },
    addEffect() {
      this.dragNodeLevel += 1;
      this.nearbyDragGoingOn = true;
      this.$emit('setOrder', this.order + (this.dropZonePosition === 'bottom' ? 1 : 0));
    },
    removeEffect() {
      this.dragNodeLevel -= 1;
      if (this.dragNodeLevel === 0) {
        this.nearbyDragGoingOn = false;
        this.$emit('setOrder', 0);
      }
    },
    resetEffect() {
      this.beingDragged = false;
      this.dragNodeLevel = 0;
      this.nearbyDragGoingOn = false;
      this.$emit('setOrder', 0);
    },
  },
  watch: {
    dropZoneVisible: {
      handler(val) {
        if (!val) {
          this.nearbyDragGoingOn = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.task-wrapper {
  .task {
    background-color: $header-bg-color;
    color: $body-text-color;
    padding: 22px 16px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
    cursor: pointer;
    transition-property: background, color, margin;
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
  .dropzone {
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 0;
    border-style: dashed;
    border-color: $grey;
    width: 100%;
    height: 0;
    //transition-property: height, border-width, margin;
    //transition-duration: 0.3s;
    //transition-timing-function: ease-in-out;
  }
  &.dragged {
    opacity: 0.3;
  }
  &.dragging-nearby {
    &.top {
      .dropzone.top {
        height: 40px;
        border-width: 2px;
        margin-bottom: 20px;
      }
      .dropzone.bottom {
        height: 0;
        border-width: 0;
      }
    }
    &.bottom {
      .dropzone.top {
        height: 0;
        border-width: 0;
      }
      .dropzone.bottom {
        height: 40px;
        border-width: 2px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
