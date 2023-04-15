<template>
  <modal
    id="delete-task"
    title="Delete Task"
    ok-text="Delete"
    variant="danger"
    @ok="deleteTask"
  >
    <template #body>
      <p>
        Are you sure you want to delete this task? <br>
        This action will delete all the sub tasks in this task and can not be reversed.
      </p>
    </template>
  </modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'DeleteTask',
  components: { Modal },
  props: {
    taskToDelete: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch('deleteTask', this.taskToDelete);
      this.$root.$emit('modal::hide', 'delete-task');
    },
  },
};
</script>

<style lang="scss">

</style>
