<template>
  <div class="column">
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
        <k-dropdown-item @click="edit">Edit</k-dropdown-item>
        <k-dropdown-item>Delete</k-dropdown-item>
      </k-dropdown>
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
import KDropdown from '@/components/elements/KDropdown.vue';
import KDropdownItem from '@/components/elements/KDropdownItem.vue';
import DotsHrIcon from '@/components/vectors/DotsHrIcon.vue';
import Task from '@/components/Task.vue';

export default {
  name: 'Column',
  components: {
    KDropdown, KDropdownItem, DotsHrIcon, Task,
  },
  props: {
    column: {
      type: Object,
    },
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter((item) => item.columnId === this.column.id);
    },
  },
  methods: {
    showContextIcon() {
      this.menuOpen = true;
    },
    hideContextIcon() {
      this.menuOpen = false;
    },
    edit() {
      this.$emit('edit', this.column);
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
  }
}
</style>
