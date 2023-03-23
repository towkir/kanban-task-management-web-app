<template>
  <div class="theme-toggler">
    <sun-icon/>
    <label for="theme-switch">
      <input
        type="checkbox"
        id="theme-switch"
        v-model="darkThemeEnabled"
        @change="toggleTheme"
      >
      <span class="toggler">
        <span class="toggler-button"></span>
      </span>
    </label>
    <moon-icon/>
  </div>
</template>

<script>
import SunIcon from '@/components/vectors/SunIcon.vue';
import MoonIcon from '@/components/vectors/MoonIcon.vue';

export default {
  name: 'ThemeToggler',
  components: { SunIcon, MoonIcon },
  data() {
    return {
      darkThemeEnabled: false,
    };
  },
  methods: {
    toggleTheme() {
      this.$store.commit('toggleTheme');
      document.documentElement.setAttribute('theme', this.currentTheme);
    },
    retrieveTheme() {
      this.darkThemeEnabled = this.$store.state.theme === 'dark';
      document.documentElement.setAttribute('theme',
        this.darkThemeEnabled ? 'dark' : 'light');
    },
  },
  mounted() {
    this.retrieveTheme();
  },
};
</script>

<style lang="scss" scoped>
.theme-toggler {
  background-color: $body-bg-color;
  padding: 14px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;

  label[for="theme-switch"] {
    line-height: 0;
    input[type="checkbox"] {
      display: none;
      & + span.toggler {
        display: inline-block;
        position: relative;
        width: 40px;
        height: 20px;
        border-radius: 10px;
        background-color: $purple;
        margin: 0 24px;
        cursor: pointer;
        span.toggler-button {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          left: 3px;
          top: 3px;
          background-color: $white;
          transition: left 0.3s ease-in-out;
        }
      }
      &:checked {
        & + span.toggler {
          span.toggler-button {
            left: 23px;
          }
        }
      }
    }
  }
}
</style>
