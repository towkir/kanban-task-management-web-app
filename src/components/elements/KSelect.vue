<template>
  <div class="k-select">
    <div class="value" :class="{ empty : value === '', active : visible }" @click="show">
      {{ value || placeholder }}
    </div>
    <div
      class="options"
      :class="[visible ? 'visible' : 'hidden', { 'fade-in' : showing, 'fade-out' : hiding }]"
    >
      <span
        class="option"
        v-for="option in options"
        :key="option"
        @click="select(option)"
      >
        {{option}}
      </span>
      <span v-if="!options.length" class="option">
        No Matching Options
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KSelect',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: 'Select an Option',
    },
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
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
      this.addEventListenerForCloseOnBlur();
    },
    hide() {
      this.hiding = true;
      this.showing = false;
      setTimeout(() => {
        this.visible = false;
      }, 300);
      this.removeEventListenerForCloseOnBlur();
      // this.$emit('close');
    },
    select(val) {
      this.$emit('change', val);
      this.hide();
    },
    handleBlur(event) {
      if (!(event && event.target && event.target.closest('.k-select'))) {
        this.hide();
      }
    },
    addEventListenerForCloseOnBlur() {
      document.addEventListener('click', this.handleBlur);
    },
    removeEventListenerForCloseOnBlur() {
      document.removeEventListener('click', this.handleBlur);
    },
  },
};
</script>

<style lang="scss" scoped>
.k-select {
  position: relative;
  .value {
    display: block;
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    color: $body-text-color;
    @include body-l;
    padding: 8px 16px;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid transparentize($grey, 0.75);
    transition-property: color, border;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    &.empty {
      color: $grey;
    }
    &.active {
      border: 1px solid $purple;
      outline: none;
    }
  }
  .options {
    position: absolute;
    width: 100%;
    border-radius: 4px;
    background-color: $header-bg-color;
    max-height: 220px;
    overflow-x: auto;
    box-shadow: 0 4px 6px rgba(54, 78, 126, 0.101545);
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
    .option {
      display: block;
      padding: 8px 16px;
      cursor: pointer;
      transition: background 0.3s ease-in-out;
      &:hover {
        background-color: $body-bg-color;
      }
    }
  }
}
</style>
