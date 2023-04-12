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
      :board-to-edit="boardToEdit"
    />
    <delete-board
      :board-to-delete="boardToDelete"
    />
    <view-task :task="taskToView"/>
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
      boardToEdit: {},
      boardToDelete: {},
      taskToView: {},
    };
  },
  methods: {
    showAddOrEditBoardModal(boardData) {
      this.boardToEdit = boardData;
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
