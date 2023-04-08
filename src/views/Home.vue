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
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SideBar from '@/components/SideBar.vue';
import Board from '@/components/boards/Board.vue';
import AddOrEditBoard from '@/components/boards/AddOrEditBoard.vue';

export default {
  name: 'Home',
  components: {
    Header,
    SideBar,
    Board,
    AddOrEditBoard,
  },
  data() {
    return {
      boardToEdit: {},
      boardToDelete: {},
    };
  },
  methods: {
    showAddOrEditBoardModal(boardData) {
      this.boardToEdit = boardData;
      this.$root.$emit('modal::show', 'add-or-edit-board');
    },
    showDeleteBoardModal() {
      this.$root.$emit('modal::show', 'delete-board');
    },
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
