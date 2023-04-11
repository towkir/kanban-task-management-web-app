<template>
  <modal
    id="delete-board"
    title="Delete Board"
    ok-text="Delete"
    variant="danger"
    @ok="deleteBoard"
  >
    <template #body>
      <p>
        Are you sure you want to delete the board <b>{{ boardName }}</b> ? <br>
        This action will delete all the columns, tasks and sub tasks in this board
        and can not be reversed.
      </p>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'DeleteBoard',
  components: { Modal },
  props: {
    boardToDelete: {
      type: Object,
      required: true,
    },
  },
  computed: {
    boardName() {
      return this.boardToDelete.name;
    },
  },
  methods: {
    deleteBoard() {
      this.$store.dispatch('deleteBoard', this.boardToDelete);
      this.$root.$emit('modal::hide', 'delete-board');
    },
  },
};
</script>

<style lang="scss">

</style>
