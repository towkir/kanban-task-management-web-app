<template>
  <div class="sidebar-container">
    <div class="sidebar" :class="{ open : sideBarOpen}">
      <div class="logo">
        <img src="@/assets/logo-dark.svg" alt="logo">
      </div>
      <div class="board-list">
        <label>ALL BOARDS ({{ boards.length }})</label>
        <button
          class="btn btn-lg btn-block"
          :class="{ active : board.id === currentBoard.id }"
          v-for="board in boards"
          :key="`menu-${board.id}`"
          @click="selectBoard(board.id)"
        >
          <board-icon/>{{ board.name }}
        </button>
        <button class="btn btn-lg btn-block cta"><board-icon/>+ Create New Board</button>
      </div>
      <theme-toggler/>
      <button class="btn btn-lg btn-block" @click="toggleSideBar">
        <hide-icon/>Hide Sidebar
      </button>
    </div>
    <button class="btn btn-primary btn-eye" @click="toggleSideBar">
      <show-icon/>
    </button>
  </div>
</template>

<script>
import BoardIcon from '@/components/vectors/BoardIcon.vue';
import HideIcon from '@/components/vectors/HideIcon.vue';
import ShowIcon from '@/components/vectors/ShowIcon.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';

export default {
  name: 'SideBar',
  components: {
    BoardIcon,
    HideIcon,
    ShowIcon,
    ThemeToggler,
  },
  methods: {
    toggleSideBar() {
      this.$store.commit('toggleSidebar', !this.sideBarOpen);
    },
    selectBoard(boardId) {
      const board = this.$store.state.boards.find((item) => item.id === boardId);
      this.$store.commit('selectBoard', board);
    },
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  .sidebar {
    background-color: $header-bg-color;
    border-right: 1px solid transparent;
    padding-right: 25px;
    position: fixed;
    width: 300px;
    height: 100%;
    left: -300px;
    top: 0;
    z-index: 10;
    transition-property: background, left, border;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    box-sizing: border-box;
    &.open {
      left: 0;
      border-right: 1px solid $border-color;
    }

    div.logo {
      padding: 30px 20px;
    }

    div.board-list {
      height: calc(100% - 240px);
      label {
        display: block;
        padding: 18px 24px;
        color: $grey;
        @include heading-s;
      }
    }

    button.btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: $grey;
      text-align: left;
      padding: 14px 24px;
      ::v-deep svg {
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
      }
      &:hover {
        color: $purple;
        background-color: transparentize($purple, 0.9);
        ::v-deep svg {
          path {
            fill: $purple;
          }
        }
      }
      &.active {
        color: $white;
        background-color: $purple;
        ::v-deep svg {
          path {
            fill: $white;
          }
        }
      }
      &.cta {
        color: $purple;
        ::v-deep svg {
          path {
            fill: $purple;
          }
        }
      }
    }
    .theme-toggler {
      margin-left: 24px;
      margin-bottom: 10px;
    }
  }

  .btn-eye {
    border-radius: 0 24px 24px 0;
    padding: 11px 20px;
    position: fixed;
    bottom: 40px;
    left: 0;
    z-index: 5;
  }
}
</style>
