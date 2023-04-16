import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false, encryptionSecret: 's3cr3tEncrypti0n' });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    sideBarOpen: true,
    theme: 'light',
    currentBoard: {
      id: 'board-1',
      name: 'Platform Launch',
      columns: [],
    },
    boards: [
      {
        id: 'board-1',
        name: 'Platform Launch',
        columns: [],
      },
      {
        id: 'board-2',
        name: 'Marketing Plan',
        columns: [],
      },
      {
        id: 'board-3',
        name: 'Roadmap',
        columns: [],
      },
    ],
    columns: [
      {
        id: 'column-1',
        boardId: 'board-1',
        color: '#74b9ff',
        name: 'Todo',
        tasks: [],
      },
      {
        id: 'column-2',
        boardId: 'board-1',
        color: '#0984e3',
        name: 'Doing',
        tasks: [],
      },
      {
        id: 'column-3',
        boardId: 'board-1',
        color: '#a29bfe',
        name: 'Done',
        tasks: [],
      },
      {
        id: 'column-4',
        boardId: 'board-2',
        name: 'Todo',
        color: '#fd79a8',
        tasks: [],
      },
      {
        id: 'column-5',
        boardId: 'board-2',
        color: '#636e72',
        name: 'Doing',
        tasks: [],
      },
      {
        id: 'column-6',
        boardId: 'board-2',
        color: '#ffeaa7',
        name: 'Done',
        tasks: [],
      },
      {
        id: 'column-7',
        boardId: 'board-3',
        color: '#81ecec',
        name: 'Now',
        tasks: [],
      },
      {
        id: 'column-8',
        boardId: 'board-3',
        color: '#55efc4',
        name: 'Next',
        tasks: [],
      },
      {
        id: 'column-9',
        boardId: 'board-3',
        color: '#e17055',
        name: 'Later',
        tasks: [],
      },
    ],
    tasks: [
      {
        id: 'task-1',
        columnId: 'column-1',
        title: 'Build UI for onboarding flow',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
      {
        id: 'task-2',
        columnId: 'column-1',
        title: 'Build UI for search',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
      {
        id: 'task-3',
        columnId: 'column-1',
        title: 'Build settings UI',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
      {
        id: 'task-4',
        columnId: 'column-1',
        title: 'QA and test all major user journeys',
        description: 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
        status: 'Todo',
        subtasks: [],
      },
      {
        id: 'task-5',
        columnId: 'column-2',
        title: 'Design settings and search pages',
        description: '',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-6',
        columnId: 'column-2',
        title: 'Add account management endpoints',
        description: '',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-7',
        columnId: 'column-2',
        title: 'Design onboarding flow',
        description: '',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-8',
        columnId: 'column-2',
        title: 'Add search endpoints',
        description: '',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-9',
        columnId: 'column-2',
        title: 'Add authentication endpoints',
        description: '',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-10',
        columnId: 'column-2',
        title: 'Research pricing points of various competitors and trial different business models',
        description: 'We know what we\'re planning to build for version one. Now we need to finalise the first pricing model we\'ll use. Keep iterating the subtasks until we have a coherent proposition.',
        status: 'Doing',
        subtasks: [],
      },
      {
        id: 'task-11',
        columnId: 'column-3',
        title: 'Conduct 5 wireframe tests',
        description: 'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-12',
        columnId: 'column-3',
        title: 'Create wireframe prototype',
        description: 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-13',
        columnId: 'column-3',
        title: 'Review results of usability tests and iterate',
        description: 'Keep iterating through the subtasks until we\'re clear on the core concepts for the app.',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-14',
        columnId: 'column-3',
        title: 'Create paper prototypes and conduct 10 usability tests with potential customers',
        description: '',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-15',
        columnId: 'column-3',
        title: 'Market discovery',
        description: 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-16',
        columnId: 'column-3',
        title: 'Competitor analysis',
        description: '',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-17',
        columnId: 'column-3',
        title: 'Research the market',
        description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
        status: 'Done',
        subtasks: [],
      },
      {
        id: 'task-18',
        columnId: 'column-4',
        title: 'Plan Product Hunt launch',
        description: '',
        status: 'Todo',
        subtasks: [],
      },
      {
        id: 'task-19',
        columnId: 'column-4',
        title: 'Share on Show HN',
        description: '',
        status: '',
        subtasks: [],
      },
      {
        id: 'task-20',
        columnId: 'column-4',
        title: 'Write launch article to publish on multiple channels',
        description: '',
        status: '',
        subtasks: [],
      },
      {
        id: 'task-21',
        columnId: 'column-7',
        title: 'Launch version one',
        description: '',
        status: '',
        subtasks: [],
      },
      {
        id: 'task-22',
        columnId: 'column-7',
        title: 'Review early feedback and plan next steps for roadmap',
        description: 'Beyond the initial launch, we\'re keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.',
        status: '',
        subtasks: [],
      },
    ],
    subTasks: [
      {
        id: 'subtask-1',
        taskId: 'task-1',
        title: 'Sign up page',
        isCompleted: true,
      },
      {
        id: 'subtask-2',
        taskId: 'task-1',
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        id: 'subtask-3',
        taskId: 'task-1',
        title: 'Welcome page',
        isCompleted: false,
      },
      {
        id: 'subtask-4',
        taskId: 'task-2',
        title: 'Search page',
        isCompleted: false,
      },
      {
        id: 'subtask-5',
        taskId: 'task-3',
        title: 'Account page',
        isCompleted: false,
      },
      {
        id: 'subtask-6',
        taskId: 'task-3',
        title: 'Billing page',
        isCompleted: false,
      },
      {
        id: 'subtask-7',
        taskId: 'task-4',
        title: 'Internal testing',
        isCompleted: false,
      },
      {
        id: 'subtask-8',
        taskId: 'task-4',
        title: 'External testing',
        isCompleted: false,
      },
      {
        id: 'subtask-9',
        taskId: 'task-5',
        title: 'Settings - Account page',
        isCompleted: true,
      },
      {
        id: 'subtask-10',
        taskId: 'task-5',
        title: 'Settings - Billing page',
        isCompleted: true,
      },
      {
        id: 'subtask-11',
        taskId: 'task-5',
        title: 'Search page',
        isCompleted: false,
      },
      {
        id: 'subtask-12',
        taskId: 'task-6',
        title: 'Upgrade plan',
        isCompleted: true,
      },
      {
        id: 'subtask-13',
        taskId: 'task-6',
        title: 'Cancel plan',
        isCompleted: true,
      },
      {
        id: 'subtask-14',
        taskId: 'task-6',
        title: 'Update payment method',
        isCompleted: false,
      },
      {
        id: 'subtask-15',
        taskId: 'task-7',
        title: 'Sign up page',
        isCompleted: true,
      },
      {
        id: 'subtask-16',
        taskId: 'task-7',
        title: 'Sign in page',
        isCompleted: false,
      },
      {
        id: 'subtask-17',
        taskId: 'task-7',
        title: 'Welcome page',
        isCompleted: false,
      },
      {
        id: 'subtask-18',
        taskId: 'task-8',
        title: 'Add search endpoint',
        isCompleted: true,
      },
      {
        id: 'subtask-19',
        taskId: 'task-8',
        title: 'Define search filters',
        isCompleted: false,
      },
      {
        id: 'subtask-20',
        taskId: 'task-9',
        title: 'Define user model',
        isCompleted: true,
      },
      {
        id: 'subtask-21',
        taskId: 'task-9',
        title: 'Add auth endpoints',
        isCompleted: false,
      },
      {
        id: 'subtask-22',
        taskId: 'task-10',
        title: 'Research competitor pricing and business models',
        isCompleted: true,
      },
      {
        id: 'subtask-23',
        taskId: 'task-10',
        title: 'Outline a business model that works for our solution',
        isCompleted: false,
      },
      {
        id: 'subtask-24',
        taskId: 'task-10',
        title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
        isCompleted: false,
      },
      {
        id: 'subtask-25',
        taskId: 'task-11',
        title: 'Complete 5 wireframe prototype tests',
        isCompleted: true,
      },
      {
        id: 'subtask-26',
        taskId: 'task-12',
        title: 'Create clickable wireframe prototype in Balsamiq',
        isCompleted: true,
      },
      {
        id: 'subtask-27',
        taskId: 'task-13',
        title: 'Meet to review notes from previous tests and plan changes',
        isCompleted: true,
      },
      {
        id: 'subtask-28',
        taskId: 'task-13',
        title: 'Make changes to paper prototypes',
        isCompleted: true,
      },
      {
        id: 'subtask-29',
        taskId: 'task-13',
        title: 'Conduct 5 usability tests',
        isCompleted: true,
      },
      {
        id: 'subtask-30',
        taskId: 'task-14',
        title: 'Create paper prototypes for version one',
        isCompleted: true,
      },
      {
        id: 'subtask-31',
        taskId: 'task-14',
        title: 'Complete 10 usability tests',
        isCompleted: true,
      },
      {
        id: 'subtask-32',
        taskId: 'task-15',
        title: 'Interview 10 prospective customers',
        isCompleted: true,
      },
      {
        id: 'subtask-33',
        taskId: 'task-16',
        title: 'Find direct and indirect competitors',
        isCompleted: true,
      },
      {
        id: 'subtask-34',
        taskId: 'task-16',
        title: 'SWOT analysis for each competitor',
        isCompleted: true,
      },
      {
        id: 'subtask-35',
        taskId: 'task-17',
        title: 'Write up research analysis',
        isCompleted: true,
      },
      {
        id: 'subtask-36',
        taskId: 'task-17',
        title: 'Calculate TAM',
        isCompleted: true,
      },
      {
        id: 'subtask-37',
        taskId: 'task-18',
        title: 'Find hunter',
        isCompleted: false,
      },
      {
        id: 'subtask-38',
        taskId: 'task-18',
        title: 'Gather assets',
        isCompleted: false,
      },
      {
        id: 'subtask-39',
        taskId: 'task-18',
        title: 'Draft product page',
        isCompleted: false,
      },
      {
        id: 'subtask-40',
        taskId: 'task-18',
        title: 'Notify customers',
        isCompleted: false,
      },
      {
        id: 'subtask-41',
        taskId: 'task-18',
        title: 'Notify network',
        isCompleted: false,
      },
      {
        id: 'subtask-42',
        taskId: 'task-18',
        title: 'Launch!',
        isCompleted: false,
      },
      {
        id: 'subtask-43',
        taskId: 'task-19',
        title: 'Draft out HN post',
        isCompleted: false,
      },
      {
        id: 'subtask-44',
        taskId: 'task-19',
        title: 'Get feedback and refine',
        isCompleted: false,
      },
      {
        id: 'subtask-45',
        taskId: 'task-19',
        title: 'Publish post',
        isCompleted: false,
      },
      {
        id: 'subtask-46',
        taskId: 'task-20',
        title: 'Write article',
        isCompleted: false,
      },
      {
        id: 'subtask-47',
        taskId: 'task-20',
        title: 'Publish on LinkedIn',
        isCompleted: false,
      },
      {
        id: 'subtask-48',
        taskId: 'task-20',
        title: 'Publish on Inndie Hackers',
        isCompleted: false,
      },
      {
        id: 'subtask-49',
        taskId: 'task-20',
        title: 'Publish on Medium',
        isCompleted: false,
      },
      {
        id: 'subtask-50',
        taskId: 'task-21',
        title: 'Launch privately to our waitlist',
        isCompleted: false,
      },
      {
        id: 'subtask-51',
        taskId: 'task-21',
        title: 'Launch publicly on PH, HN, etc.',
        isCompleted: false,
      },
      {
        id: 'subtask-52',
        taskId: 'task-22',
        title: 'Interview 10 customers',
        isCompleted: false,
      },
      {
        id: 'subtask-53',
        taskId: 'task-22',
        title: 'Review common customer pain points and suggestions',
        isCompleted: false,
      },
      {
        id: 'subtask-54',
        taskId: 'task-22',
        title: 'Outline next steps for our roadmap',
        isCompleted: false,
      },
    ],
  },
  mutations: {
    toggleSidebar(state, data) {
      state.sideBarOpen = data;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    selectBoard(state, data) {
      state.currentBoard = data;
    },
    addBoard(state, data) {
      state.boards.push(data);
    },
    updateBoard(state, data) {
      state.boards.splice(data.index, 1, data.board);
    },
    updateCurrentBoard(state, data) {
      state.currentBoard = data;
    },
    deleteBoard(state, index) {
      state.boards.splice(index, 1);
    },
    addColumn(state, data) {
      state.columns.push(data);
    },
    updateColumn(state, data) {
      state.columns.splice(data.index, 1, data.column);
    },
    deleteColumn(state, index) {
      state.columns.splice(index, 1);
    },
    addTask(state, data) {
      state.tasks.push(data);
    },
    updateTask(state, data) {
      state.tasks.splice(data.index, 1, data.task);
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
    },
    addSubTask(state, data) {
      state.subTasks.push(data);
    },
    updateSubTask(state, data) {
      state.subTasks.splice(data.index, 1, data.subTask);
    },
    deleteSubTask(state, index) {
      state.subTasks.splice(index, 1);
    },
  },
  actions: {
    addOrUpdateBoard(context, data) {
      const boardIndex = context.state.boards.findIndex((item) => item.id === data.id);
      if (boardIndex < 0) {
        context.commit('addBoard', data);
      } else {
        context.commit('updateBoard', { index: boardIndex, board: data });
      }
      context.commit('updateCurrentBoard', data);
    },
    deleteBoard({ state, commit, dispatch }, data) {
      const boardId = data.id;
      const boardIndex = state.boards.findIndex((item) => item.id === boardId);
      if (boardIndex >= 0) {
        commit('deleteBoard', boardIndex);
      }
      commit('updateCurrentBoard', state.boards[0]);
      // deleting board deletes all columns in it:
      const columnsToBeDeleted = state.columns.filter((column) => column.boardId === boardId);
      for (let i = 0; i < columnsToBeDeleted.length; i += 1) {
        dispatch('deleteColumn', columnsToBeDeleted[i]);
      }
    },
    addOrUpdateColumn(context, data) {
      const columnIndex = context.state.columns.findIndex((item) => item.id === data.id);
      if (columnIndex < 0) {
        context.commit('addColumn', data);
      } else {
        context.commit('updateColumn', { index: columnIndex, column: data });
      }
    },
    deleteColumn({ state, commit, dispatch }, data) {
      const columnId = data.id;
      const columnIndex = state.columns.findIndex((item) => item.id === columnId);
      if (columnIndex >= 0) {
        commit('deleteColumn', columnIndex);
      }
      // deleting column deletes all tasks in it:
      const tasksToBeDeleted = state.tasks.filter((item) => item.columnId === columnId);
      for (let i = 0; i < tasksToBeDeleted.length; i += 1) {
        dispatch('deleteTask', tasksToBeDeleted[i]);
      }
    },
    addOrUpdateTask(context, data) {
      const taskIndex = context.state.tasks.findIndex((item) => item.id === data.id);
      if (taskIndex < 0) {
        context.commit('addTask', data);
      } else {
        context.commit('updateTask', { index: taskIndex, task: data });
      }
    },
    deleteTask({ state, commit, dispatch }, data) {
      const taskId = data.id;
      const taskIndex = state.tasks.findIndex((item) => item.id === taskId);
      if (taskIndex >= 0) {
        commit('deleteTask', taskIndex);
      }
      // deleting task deletes all subtasks in it:
      const subTasksToBeDeleted = state.subTasks.filter((subtask) => subtask.taskId === taskId);
      for (let i = 0; i < subTasksToBeDeleted.length; i += 1) {
        dispatch('deleteSubTask', subTasksToBeDeleted[i]);
      }
    },
    addOrUpdateSubTask(context, data) {
      const subTaskIndex = context.state.subTasks.findIndex((item) => item.id === data.id);
      if (subTaskIndex < 0) {
        context.commit('addSubTask', data);
      } else {
        context.commit('updateSubTask', { index: subTaskIndex, subTask: data });
      }
    },
    deleteSubTask(context, data) {
      const subTaskIndex = context.state.subTasks.findIndex((item) => item.id === data.id);
      if (subTaskIndex >= 0) {
        context.commit('deleteSubTask', subTaskIndex);
      }
    },
  },
  modules: {},
});
