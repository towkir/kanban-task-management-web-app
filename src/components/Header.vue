<template>
  <div class="header">
    <div class="logo">
      <logo />
    </div>
    <div class="content">
      <h1>
        {{ currentBoard.name }} <down-arrow-icon />
      </h1>
      <div class="action">
        <button
          :disabled="columnsInCurrentBoard.length === 0"
          class="btn btn-primary btn-lg"
          @click="addTask"
        >
          <span>+ Add New Task</span>
          <plus-icon />
        </button>
        <k-dropdown
          id="board-context-dropdown"
          position="right"
        >
          <template #text>
            <button class="btn btn-minimal btn-lg">
              <dots-vr-icon/>
            </button>
          </template>
          <k-dropdown-item @click="editBoard">Edit Board</k-dropdown-item>
          <k-dropdown-item @click="deleteBoard" variant="danger">Delete Board</k-dropdown-item>
        </k-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/vectors/Logo.vue';
import DotsVrIcon from '@/components/vectors/DotsVrIcon.vue';
import KDropdown from '@/components/elements/KDropdown.vue';
import KDropdownItem from '@/components/elements/KDropdownItem.vue';
import PlusIcon from '@/components/vectors/PlusIcon.vue';
import DownArrowIcon from '@/components/vectors/DownArrowIcon.vue';

export default {
  name: 'Header',
  components: {
    Logo, DotsVrIcon, KDropdown, KDropdownItem, PlusIcon, DownArrowIcon,
  },
  methods: {
    addTask() {
      this.$root.$emit('task::add-or-edit', {});
    },
    editBoard() {
      this.$emit('editBoard', this.currentBoard);
    },
    deleteBoard() {
      this.$emit('deleteBoard', this.currentBoard);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: stretch;
  background-color: $header-bg-color;
  border-bottom: 1px solid $border-color;
  transition-property: background, border;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  .logo {
    width: 200px;
    padding: 20px;
    display: flex;
    align-items: center;
    border-right: 1px solid $border-color;
    box-sizing: border-box;
    transition-property: width, border;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
  .content {
    color: $body-text-color;
    transition: color 0.3s ease-in-out;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    h1 {
      @include heading-xl;
      svg {
        margin-left: 8px;
        display: none;
        transition: 0.3s ease-in-out;
        vertical-align: middle;
      }
    }
    .action {
      .btn-primary {
        svg {
          display: none;
        }
      }
      .btn-minimal {
        padding: 14px 10px 14px 20px;
        svg {
          vertical-align: top;
        }
      }
    }
  }
}

@include tab-sm {
  .header {
    border-bottom-color: transparent;
    .logo {
      width: auto;
      border-right-color: transparent;
      padding: 16px 0 16px 16px;
    }
    .content {
      padding: 16px;
      h1 {
        @include heading-l;
        svg {
          display: inline-block;
        }
        &.drawer-open {
          svg {
            transform: rotate(180deg);
          }
        }
      }
      .action {
        .btn-primary {
          padding: 6px 18px;
          span {
            display: none;
          }
          svg {
            display: inline-block;
          }
        }
        .btn-minimal {
          padding: 6px 10px 6px 16px;
        }
      }
    }
  }
}
</style>
