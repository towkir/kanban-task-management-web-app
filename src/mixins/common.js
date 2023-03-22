export default {
  computed: {
    sideBarOpen() {
      return this.$store.state.sideBarOpen;
    },
    currentBoard() {
      return this.$store.state.currentBoard;
    },
  },
};
