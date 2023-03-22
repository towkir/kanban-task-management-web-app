export default {
  computed: {
    sideBarOpen() {
      return this.$store.state.sideBarOpen;
    },
    currentTheme() {
      return this.$store.state.theme;
    },
    currentBoard() {
      return this.$store.state.currentBoard;
    },
  },
};
