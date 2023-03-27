<template>
  <div class="board" :class="{ 'sidebar-open' : sideBarOpen }">
    <div class="columns">
      <column
        v-for="column in columns"
        :key="column.id"
        :column="column"
      />
      <div class="column add">
        <button class="btn btn-block">
          + New Column
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import column from '@/components/Column.vue';

export default {
  name: 'Board',
  components: { column },
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
</style>
