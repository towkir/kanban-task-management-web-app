<template>
  <div
    class="sidebar-container"
    :class="[sideBarOpen
      ? 'visible' : 'hidden', { 'fade-in' : sideBarShowing, 'fade-out' : sideBarHiding }]"
  >
    <div class="sidebar" :class="{ open : sideBarOpen }">
      <div class="logo">
        <logo />
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
        <button
          class="btn btn-lg btn-block cta"
          @click="addBoard"
        >
          <board-icon/>+ Create New Board
        </button>
      </div>
      <theme-toggler/>
      <button class="btn btn-lg btn-block hide-sidebar" @click="toggleSideBar">
        <hide-icon/>Hide Sidebar
      </button>
    </div>
    <button class="btn btn-primary btn-eye" @click="toggleSideBar">
      <show-icon/>
    </button>
  </div>
</template>

<script>
import Logo from '@/components/vectors/Logo.vue';
import BoardIcon from '@/components/vectors/BoardIcon.vue';
import HideIcon from '@/components/vectors/HideIcon.vue';
import ShowIcon from '@/components/vectors/ShowIcon.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';

export default {
  name: 'SideBar',
  components: {
    Logo,
    BoardIcon,
    HideIcon,
    ShowIcon,
    ThemeToggler,
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    selectBoard(boardId) {
      const board = this.$store.state.boards.find((item) => item.id === boardId);
      this.$store.commit('selectBoard', board);
    },
    addBoard() {
      this.$emit('addBoard', {});
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
    transition-property: background, left, border, width;
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

@include tab-lg {
  .sidebar-container {
    .sidebar {
      width: 260px;
    }
  }
}

@include tab-sm {
  .sidebar-container {
    &.hidden {
      display: none;
    }
    &.visible {
      display: block;
    }
    &.fade-out {
      opacity: 0;
    }
    &.fade-in {
      opacity: 1;
    }
    width: 100%;
    height: 100%;
    background-color: transparentize($black, 0.5);
    position: fixed;
    z-index: 5;
    transition: opacity 0.3s ease-in-out;
    .sidebar {
      &.open {
        left: 50px;
      }
      top: 80px;
      height: auto;
      padding-right: 0;
      border-right: 0;
      border-radius: 8px;
      div.logo, .btn.hide-sidebar {
        display: none;
      }
      div.board-list {
        padding-right: 24px;
        label {
          padding: 14px 24px 18px;
        }
      }
      .theme-toggler {
        margin: 16px;
      }
    }
  }
  .btn-eye {
    display: none;
  }
}
</style>
