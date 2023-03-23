<template>
  <div class="board" :class="{ 'sidebar-open' : sideBarOpen }">
    <div class="columns">
      <column
        v-for="column in columns"
        :key="column.id"
        :column="column"
      />
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
  padding: 24px;
  background-color: $body-bg-color;
  transition-property: background-color, margin, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  overflow-x: auto;
  &.sidebar-open {
    margin-left: 300px;
  }
  .columns {
    height: 100%;
    width: max-content;
  }
}
</style>
