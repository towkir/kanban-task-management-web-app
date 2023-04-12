<template>
  <label class="sub-task" :for="subTask.id">
    <input
      type="checkbox"
      :id="subTask.id"
      :checked="subTask.isCompleted"
    >
    <span class="checkbox">
      <span class="checked"></span>
      <span class="unchecked"></span>
    </span>
    <span class="text">
      {{subTask.title}}
    </span>
  </label>
</template>

<script>
export default {
  name: 'SubTask',
  props: {
    subTask: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-task {
  display: flex;
  align-items: center;
  color: $grey;
  background-color: $body-bg-color;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  user-select: none;
  input[type="checkbox"] {
    display: none;
    + .checkbox {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 15px;
      span {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background-color: $header-bg-color;
        border: 1px solid transparentize($grey, 0.75);
        transition: opacity 0.3s ease-in-out;
        position: absolute;
        box-sizing: border-box;
        &.checked {
          opacity: 0;
          z-index: 5;
          border-color: transparent;
          background-image: url("~@/assets/icons/icon-checkbox.svg");
          background-position: center;
        }
      }
    }
    &:checked {
      + .checkbox {
        span {
          &.checked {
            opacity: 1;
          }
        }
      }
      ~ .text {
        text-decoration: line-through;
      }
    }
  }
  &:hover {
    color: $body-text-color;
    background-color: transparentize($purple, 0.75);
  }
}
</style>
