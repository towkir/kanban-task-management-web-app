export default {
  data() {
    return {
      columnColors: [
        {
          label: 'Color 1',
          color: '#55efc4',
        },
        {
          label: 'Color 2',
          color: '#81ecec',
        },
        {
          label: 'Color 3',
          color: '#74b9ff',
        },
        {
          label: 'Color 4',
          color: '#a29bfe',
        },
        {
          label: 'Color 5',
          color: '#dfe6e9',
        },
        {
          label: 'Color 6',
          color: '#00b894',
        },
        {
          label: 'Color 7',
          color: '#00cec9',
        },
        {
          label: 'Color 8',
          color: '#0984e3',
        },
        {
          label: 'Color 9',
          color: '#6c5ce7',
        },
        {
          label: 'Color 10',
          color: '#b2bec3',
        },
        {
          label: 'Color 11',
          color: '#ffeaa7',
        },
        {
          label: 'Color 12',
          color: '#fab1a0',
        },
        {
          label: 'Color 13',
          color: '#ff7675',
        },
        {
          label: 'Color 14',
          color: '#fd79a8',
        },
        {
          label: 'Color 15',
          color: '#636e72',
        },
        {
          label: 'Color 16',
          color: '#fdcb6e',
        },
        {
          label: 'Color 17',
          color: '#e17055',
        },
        {
          label: 'Color 18',
          color: '#d63031',
        },
        {
          label: 'Color 19',
          color: '#e84393',
        },
        {
          label: 'Color 20',
          color: '#2d3436',
        },
      ],
    };
  },
  computed: {
    sideBarOpen() {
      return this.$store.state.sideBarOpen;
    },
    sideBarHiding() {
      return this.$store.state.sideBarHiding;
    },
    sideBarShowing() {
      return this.$store.state.sideBarShowing;
    },
    currentTheme() {
      return this.$store.state.theme;
    },
    currentBoard() {
      return this.$store.state.currentBoard;
    },
    columnsInCurrentBoard() {
      return this.$store.state.columns.filter((item) => item.boardId === this.currentBoard.id);
    },
  },
  methods: {
    singularOrPlural(number, singularText, pluralText) {
      return number === 1 ? singularText : pluralText;
    },
    findNextValidId(arrayOfStringId, prefix) {
      const arrayOfNumbers = arrayOfStringId.map((item) => Number(item.split('-')[1]));
      arrayOfNumbers.sort((a, b) => a - b);
      const nextIdNumber = arrayOfNumbers[arrayOfNumbers.length - 1] + 1;
      return `${prefix}-${nextIdNumber}`;
    },
    numberOfSubtasks(task) {
      return this.$store.state.subTasks.filter((item) => item.taskId === task.id);
    },
    numberOfCompletedSubTasks(tasks) {
      return tasks.filter((item) => item.isCompleted).length;
    },
  },
};
