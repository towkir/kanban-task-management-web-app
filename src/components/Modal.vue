<template>
  <div
    class="modal-backdrop"
    :class="[visible ? 'visible' : 'hidden', { 'fade-in' : showing, 'fade-out' : hiding }]"
    @click="handleCloseOnBackdrop"
  >
    <div
      class="modal"
      :class="variant"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div id="modal-title" class="modal-header">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div id="modal-description" class="modal-body">
        <slot name="body">
          Modal Body
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <div class="buttons">
            <button
              class="btn"
              :class="`btn-${variant}`"
              @click="onOkay"
              :disabled="!canPressOk"
            >
              {{ okText }}
            </button>
            <button class="btn btn-secondary" @click="hide">Cancel</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
    okText: {
      type: String,
      default: 'Okay',
    },
    canPressOk: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      hiding: true,
      showing: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.showing = true;
        this.hiding = false;
      }, 0);
      this.addEventListenerForCloseOnEsc();
      this.$emit('open');
    },
    hide() {
      this.hiding = true;
      this.showing = false;
      setTimeout(() => {
        this.visible = false;
        this.$emit('close');
      }, 300);
      this.removeEventListenerForCloseOnEsc();
    },
    onOkay() {
      this.$emit('ok');
    },
    handleEsc(e) {
      if (e.keyCode === 27) {
        this.hide();
      }
    },
    handleCloseOnBackdrop(event) {
      if (event.target && event.target.classList.contains('modal-backdrop')
        && this.closeOnBackdrop) {
        this.hide();
      }
    },
    addEventListenerForCloseOnEsc() {
      if (this.closeOnEsc) {
        document.addEventListener('keydown', this.handleEsc);
      }
    },
    removeEventListenerForCloseOnEsc() {
      if (this.closeOnEsc) {
        document.removeEventListener('keydown', this.handleEsc);
      }
    },
  },
  created() {
    this.$root.$on('modal::show', (id) => {
      if (id === this.id) {
        this.show();
      }
    });
    this.$root.$on('modal::hide', (id) => {
      if (id === this.id) {
        this.hide();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: transparentize($black, 0.5);
  transition: opacity 0.3s ease-in-out;
  &.hidden {
    display: none;
  }
  &.visible {
    display: block;
  }
  &.fade-out {
    opacity: 0;
  }
  &.fade-in {
    opacity: 1;
  }
  .modal {
    background-color: $header-bg-color;
    width: 480px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    padding: 30px;
    border-radius: 6px;
    .modal-header {
      @include heading-l;
      margin-bottom: 24px;
      color: $body-text-color;
    }
    .modal-body {
      margin-bottom: 24px;
      @include body-l;
      color: $grey;
    }
    .modal-footer {
      .buttons {
        display: flex;
        justify-content: space-between;
        .btn {
          width: calc(50% - 10px);
        }
      }
    }
    &.danger {
      .modal-header {
        color: $red;
      }
    }
  }
}
</style>
