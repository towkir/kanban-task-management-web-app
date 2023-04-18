<template>
  <div class="board" :class="{ 'sidebar-open' : sideBarOpen }">
    <div
      v-if="columns.length > 0"
      class="columns"
    >
      <column
        v-for="column in columns"
        :key="column.id"
        :column="column"
        @editColumn="showAddOrEditColumnModal"
        @deleteColumn="showDeleteColumnModal"
      />
      <div class="column add">
        <button
          class="btn btn-block"
          @click="showAddOrEditColumnModal({})"
        >
          + New Column
        </button>
      </div>
    </div>
    <div
      v-else
      class="empty-board"
    >
      <div>
        <p class="message">This board is empty. Create a new column to get started.</p>
        <p>
          <button
            class="btn btn-primary btn-lg"
            @click="showAddOrEditColumnModal({})"
          >
            +Add New Column
          </button>
        </p>
      </div>
    </div>
    <add-or-edit-column
      :board-id="boardId"
      :column-to-add-or-edit="columnToAddOrEdit"
      @clearColumn="clearColumn"
    />
    <delete-column
      :column-to-delete="columnToDelete"
    />
  </div>
</template>

<script>
import Column from '@/components/columns/Column.vue';
import AddOrEditColumn from '@/components/columns/AddOrEditColumn.vue';
import DeleteColumn from '@/components/columns/DeleteColumn.vue';

export default {
  name: 'Board',
  components: { Column, AddOrEditColumn, DeleteColumn },
  data() {
    return {
      columnToAddOrEdit: {},
      columnToDelete: {},
    };
  },
  methods: {
    showAddOrEditColumnModal(columnData) {
      this.columnToAddOrEdit = columnData;
      this.$root.$emit('modal::show', 'add-or-edit-column');
    },
    showDeleteColumnModal(columnData) {
      this.columnToDelete = columnData;
      this.$root.$emit('modal::show', 'delete-column');
    },
    clearColumn() {
      this.columnToAddOrEdit = {};
    },
  },
  computed: {
    boardId() {
      return this.currentBoard.id;
    },
    columns() {
      return this.$store.state.columns.filter((item) => item.boardId === this.boardId);
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  box-sizing: border-box;
  height: calc(100vh - 92px);
  padding: 24px 12px;
  background-color: $body-bg-color;
  transition-property: background-color, margin, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  overflow-x: auto;
  scrollbar-width: none;
  &.sidebar-open {
    margin-left: 300px;
  }
  .empty-board {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .message {
      @include heading-l;
      color: $grey;
      margin-bottom: 2rem;
    }
  }
  .columns {
    height: 100%;
    width: max-content;
    .column.add {
      display: inline-block;
      padding: 30px 12px 0 12px;
      box-sizing: border-box;
      width: 280px;
      vertical-align: top;
      height: 100%;
      .btn {
        height: 100%;
        padding: 0;
        border-radius: 6px;
        background: $new-column-btn-bg;
        color: $grey;
        @include heading-xl;
        transition: background 0.3s ease-in-out;
      }
    }
  }
}

@include tab-lg {
  .board {
    &.sidebar-open {
      margin-left: 260px;
    }
  }
}
</style>
