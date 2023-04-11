<template>
  <modal
    id="delete-column"
    title="Delete Column"
    ok-text="Delete"
    variant="danger"
    @ok="deleteColumn"
  >
    <template #body>
      <p>
        Are you sure you want to delete the column <b>{{ columnName }}</b> ? <br>
        This action will delete all the tasks and sub tasks in this column and can not be reversed.
      </p>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'DeleteColumn',
  components: { Modal },
  props: {
    columnToDelete: {
      type: Object,
      required: true,
    },
  },
  computed: {
    columnName() {
      return this.columnToDelete.name;
    },
  },
  methods: {
    deleteColumn() {
      this.$store.dispatch('deleteColumn', this.columnToDelete);
      this.$root.$emit('modal::hide', 'delete-column');
    },
  },
};
</script>

<style lang="scss">

</style>
