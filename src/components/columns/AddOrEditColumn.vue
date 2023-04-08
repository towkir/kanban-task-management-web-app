<template>
  <modal
    id="add-or-edit-column"
    :title="modalTitle"
  >
    <template #body>
      <div class="form-input">
        <label for="column-name">Name</label>
        <input
          type="text"
          id="column-name"
          class="input"
          placeholder="e.g. Todo"
          autocomplete="off"
          v-model="column.name"
        />
      </div>
      <div class="form-input">
        <label for="column-label">Label</label>
        <k-select
          id="column-label"
          placeholder="Select a Label"
          :value="column.color"
          label-key="label"
          value-key="color"
          :options="columnColors"
          :append="(item) =>
            `<span class='circle' style='background-color: ${item.color}'></span>`"
          @change="updateColor"
        />
      </div>
    </template>
    <template #footer>
      <button
        class="btn btn-primary btn-block"
        :disabled="!isFormValid"
        @click="addOrUpdateColumn"
      >
        {{ modalButtonText }}
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
import KSelect from '@/components/elements/KSelect.vue';

export default {
  name: 'AddOrEditColumn',
  components: { Modal, KSelect },
  props: {
    boardId: {
      type: String,
      required: true,
    },
    columnToEdit: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      column: {
        id: '',
        boardId: '',
        name: '',
        color: '',
        tasks: [],
      },
    };
  },
  computed: {
    modalTitle() {
      return `${this.columnToEdit.id ? 'Edit' : 'Add New'} Column`;
    },
    modalButtonText() {
      return this.columnToEdit.id ? 'Save' : 'Add';
    },
    isFormValid() {
      return this.column.name !== '' && this.column.color !== '';
    },
  },
  methods: {
    updateColor(val) {
      this.column.color = val;
    },
    addOrUpdateColumn() {
      if (!this.column.id) {
        const allColumnIds = this.$store.state.columns.map((item) => item.id);
        this.column.id = this.findNextValidId(allColumnIds, 'column');
      }
      this.$store.commit('addOrUpdateColumn', this.column);
      this.$root.$emit('modal::hide', 'add-or-edit-column');
    },
    prepareForm(columData) {
      if (columData.id) {
        this.column = { ...columData };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.column = {
        id: '',
        boardId: this.boardId,
        name: '',
        color: '',
        tasks: [],
      };
    },
  },
  watch: {
    columnToEdit: {
      deep: true,
      handler(val) {
        this.prepareForm(val);
      },
    },
  },
};
</script>

<style lang="scss">
.modal-body {
  .form-input {
    .k-select {
      .value, .option {
        span.circle {
          display: inline-block;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 5px;
          margin-bottom: 2px;
        }
      }
    }
  }
}
</style>
