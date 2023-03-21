<template>
  <div class="sidebar-container">
    <div class="sidebar" :class="{ open : sideBarOpen}">
      <div class="logo">
        <img src="@/assets/logo-dark.svg" alt="logo">
      </div>
      <div class="board-list">
        <label>ALL BOARDS (3)</label>
        <button class="btn btn-lg btn-block active"><board-icon/>Platform Launch</button>
        <button class="btn btn-lg btn-block"><board-icon/>Marketing Plan</button>
        <button class="btn btn-lg btn-block"><board-icon/>Roadmap</button>
        <button class="btn btn-lg btn-block cta"><board-icon/>+ Create New Board</button>
      </div>
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

export default {
  name: 'SideBar',
  components: { BoardIcon, HideIcon, ShowIcon },
  data() {
    return {
      sideBarOpen: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.sideBarOpen = !this.sideBarOpen;
    },
  },
};
</script>

<style scoped lang="scss">
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
    transition: 0.3s ease-in-out;
    box-sizing: border-box;
    &.open {
      left: 0;
      border-right: 1px solid $border-color;
    }

    div.logo {
      padding: 30px 20px;
    }

    div.board-list {
      height: calc(100% - 180px);
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
