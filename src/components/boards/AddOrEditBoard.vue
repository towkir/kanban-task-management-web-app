<template>
  <modal
    id="add-or-edit-board"
    :title="modalTitle"
    ok-text="Add"
    :can-press-ok="board.name !== ''"
    @ok="addOrUpdateBoard"
  >
    <template #body>
      <div class="form-input">
        <label for="board-name">Name</label>
        <input
          type="text"
          id="board-name"
          class="input"
          placeholder="e.g. Web Design"
          autocomplete="off"
          v-model="board.name"
        />
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'AddOrEditBoard',
  components: { Modal },
  props: {
    boardToEdit: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      board: {
        id: '',
        name: '',
        columns: [],
      },
    };
  },
  computed: {
    modalTitle() {
      return `${this.boardToEdit.id ? 'Update' : 'Add New'} Board`;
    },
  },
  methods: {
    updateColor(value, index) {
      this.board.columns[index].color = value;
    },
    addOrUpdateBoard() {
      if (!this.board.id) {
        const allBoardIds = this.$store.state.boards.map((item) => item.id);
        this.board.id = this.findNextValidId(allBoardIds, 'board');
      }
      this.$store.commit('addOrUpdateBoard', this.board);
      this.$root.$emit('modal::hide', 'add-or-edit-board');
    },
    prepareForm(boardData) {
      if (boardData.id) {
        this.board = { ...boardData };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.board = {
        id: '',
        name: '',
        columns: [],
      };
    },
  },
  watch: {
    boardToEdit: {
      deep: true,
      handler(val) {
        this.prepareForm(val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  display: flex;
  .form-input {
    width: 50%;
    & + .form-input {
      margin-left: 15px;
    }
  }
}
</style>
