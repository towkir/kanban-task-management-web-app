export default {
  data() {
    return {
      columnColors: [
        '#55efc4',
        '#81ecec',
        '#74b9ff',
        '#a29bfe',
        '#dfe6e9',
        '#00b894',
        '#00cec9',
        '#0984e3',
        '#6c5ce7',
        '#b2bec3',
        '#ffeaa7',
        '#fab1a0',
        '#ff7675',
        '#fd79a8',
        '#636e72',
        '#fdcb6e',
        '#e17055',
        '#d63031',
        '#e84393',
        '#2d3436',
      ],
    };
  },
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
  methods: {
    singularOrPlural(number, singularText, pluralText) {
      return number === 1 ? singularText : pluralText;
    },
  },
};
