<template>
  <div class="k-select">
    <div
      class="value"
      :class="{ empty : value === '', active : visible }"
      @click="emitShow"
      v-html="selectedOptionText"
    />
    <div
      class="options"
      :class="[visible ? 'visible' : 'hidden', { 'fade-in' : showing, 'fade-out' : hiding }]"
    >
      <span
        class="option"
        v-for="(option, index) in options"
        :key="option + index"
        @click="select(option)"
        v-html="labelText(option)"
      />
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
    id: {
      type: String,
      required: true,
    },
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
    append: {
      type: [Function, undefined],
      default: undefined, // (label) => label
    },
    labelKey: {
      type: String,
      default: '',
    },
    valueKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
      hiding: true,
      showing: false,
    };
  },
  computed: {
    selectedOptionText() {
      if (!this.value) {
        return this.placeholder;
      }
      if (this.valueKey) {
        const selectedItem = this.options.find((item) => item[this.valueKey] === this.value);
        return selectedItem ? this.labelText(selectedItem) : this.placeholder;
      }
      return this.value;
    },
  },
  methods: {
    emitShow() {
      this.$root.$emit('k-select::show', this.id);
    },
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
    },
    select(val) {
      this.$emit('change', this.valueKey ? val[this.valueKey] : val);
      this.hide();
    },
    labelText(option) {
      const optionText = this.labelKey ? option[this.labelKey] : option;
      return this.append ? `${this.append(option)} ${optionText}` : optionText;
    },
    handleBlur(event) {
      if (!(event && event.target && event.target.closest('.k-select'))) {
        this.$root.$emit('k-select::hide', this.id);
      }
    },
    addEventListenerForCloseOnBlur() {
      document.addEventListener('click', this.handleBlur);
    },
    removeEventListenerForCloseOnBlur() {
      document.removeEventListener('click', this.handleBlur);
    },
  },
  created() {
    this.$root.$on('k-select::show', (id) => {
      if (id === this.id) {
        this.show();
      } else {
        // showing other select input should hide this one;
        this.hide();
      }
    });
    this.$root.$on('k-select::hide', (id) => {
      if (id === this.id) {
        this.hide();
      }
    });
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
    z-index: 5;
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
