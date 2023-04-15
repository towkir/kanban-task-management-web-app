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

export default {
  name: 'Home',
  components: {
    Header,
    SideBar,
    Board,
    AddOrEditBoard,
    DeleteBoard,
    ViewTask,
  },
  data() {
    return {
      boardToAddOrEdit: {},
      boardToDelete: {},
      taskToView: {},
      taskToAddOrEdit: {}, // add or edit
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
</style>
