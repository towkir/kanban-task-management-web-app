<template>
  <div class="home" :class="{ 'sidebar-open' : sideBarOpen }">
    <Header
      @editBoard="showAddOrEditBoardModal"
      @deleteBoard="showDeleteBoardModal"
    />
    <side-bar
      @addBoard="showAddOrEditBoardModal"
    />
    <board/>
    <add-or-edit-board
      :board-to-add-or-edit="boardToAddOrEdit"
    />
    <delete-board
      :board-to-delete="boardToDelete"
    />
    <view-task :task-to-view="taskToView"/>
    <add-or-edit-task
      :task-to-add-or-edit="taskToAddOrEdit"
      @clearTask="clearTask"
    />
    <delete-task :task-to-delete="taskToDelete" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Board from '@/components/boards/Board.vue';
import AddOrEditBoard from '@/components/boards/AddOrEditBoard.vue';
import DeleteBoard from '@/components/boards/DeleteBoard.vue';
import ViewTask from '@/components/tasks/ViewTask.vue';
import AddOrEditTask from '@/components/tasks/AddOrEditTask.vue';
import DeleteTask from '@/components/tasks/DeleteTask.vue';

export default {
  name: 'Home',
  components: {
    Header,
    SideBar,
    Board,
    AddOrEditBoard,
    DeleteBoard,
    ViewTask,
    AddOrEditTask,
    DeleteTask,
  },
  data() {
    return {
      boardToAddOrEdit: {},
      boardToDelete: {},
      taskToView: {},
      taskToAddOrEdit: {},
      taskToDelete: {},
    };
  },
  methods: {
    showAddOrEditBoardModal(boardData) {
      this.boardToAddOrEdit = boardData;
      this.$root.$emit('modal::show', 'add-or-edit-board');
    },
    showDeleteBoardModal(boardData) {
      this.boardToDelete = boardData;
      this.$root.$emit('modal::show', 'delete-board');
    },
    clearTask() {
      this.taskToAddOrEdit = {};
    },
  },
  created() {
    this.$root.$on('task::view', (task) => {
      this.taskToView = task;
      this.$root.$emit('modal::show', 'view-task');
    });
    this.$root.$on('task::add-or-edit', (task) => {
      this.taskToAddOrEdit = task;
      this.$root.$emit('modal::hide', 'view-task');
      this.$root.$emit('modal::show', 'add-or-edit-task');
    });
    this.$root.$on('task::delete', (task) => {
      this.taskToDelete = task;
      this.$root.$emit('modal::hide', 'view-task');
      this.$root.$emit('modal::show', 'delete-task');
    });
  },
};
</script>

<style lang="scss">
.home {
  &.sidebar-open {
    .logo {
      width: 300px;
    }
  }
}

@include tab-lg {
  .home {
    &.sidebar-open {
      .logo {
        width: 260px;
      }
    }
  }
}
</style>
