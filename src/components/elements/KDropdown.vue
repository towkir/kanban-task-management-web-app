<template>
  <div class="k-dropdown" @click="toggle">
    <slot v-if="!text" name="text"></slot>
    <template v-else>{{text}}</template>
    <div
      class="k-dropdown-items"
      :class="[visible ? 'visible' : 'hidden',
        { 'fade-in' : showing, 'fade-out' : hiding }, position]"
    >
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KDropdown',
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'left',
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
    toggle() {
      if (this.visible) {
        this.$root.$emit('k-dropdown::hide', this.id);
      } else {
        this.$root.$emit('k-dropdown::show', this.id);
      }
    },
    show() {
      this.visible = true;
      setTimeout(() => {
        this.showing = true;
        this.hiding = false;
      }, 0);
      this.addEventListenerForClose();
    },
    hide() {
      this.hiding = true;
      this.showing = false;
      setTimeout(() => {
        this.visible = false;
      }, 300);
      this.removeEventListenerForClose();
    },
    handleBlur(event) {
      if (!(event && event.target && event.target.closest('.k-dropdown'))) {
        this.$root.$emit('k-dropdown::hide', this.id);
      }
    },
    handleEsc(e) {
      if (e.keyCode === 27) {
        this.hide();
      }
    },
    addEventListenerForClose() {
      document.addEventListener('click', this.handleBlur);
      document.addEventListener('keydown', this.handleEsc);
    },
    removeEventListenerForClose() {
      document.removeEventListener('click', this.handleBlur);
      document.removeEventListener('keydown', this.handleEsc);
    },
  },
  created() {
    this.$root.$on('k-dropdown::show', (id) => {
      if (id === this.id) {
        this.show();
      } else {
        // showing other dropdown should hide this one;
        this.hide();
      }
    });
    this.$root.$on('k-dropdown::hide', (id) => {
      if (id === this.id) {
        this.hide();
      }
    });
  },
};
</script>

<style lang="scss">
.k-dropdown {
  display: inline-block;
  position: relative;
  .k-dropdown-items {
    position: absolute;
    background-color: $header-bg-color;
    min-width: 150px;
    border-radius: 8px;
    overflow: hidden;
    top: calc(100% + 10px);
    box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
    &.left {
      left: 0;
      right: unset;
    }
    &.right {
      right: 0;
      left: unset;
    }
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
  }
}
</style>
