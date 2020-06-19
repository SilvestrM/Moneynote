<template>
  <div id="nav" class="level">
    <div class="level-left">
      <div class="nav-link level-item">
        <router-link to="/">Overview</router-link>
      </div>
      <div class="nav-link level-item">
        <router-link to="/transactions">Transactions</router-link>
      </div>
      <div class="nav-link level-item">
        <router-link to="/controls">Settings</router-link>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item nav-link">
        <div class="level-item">
          <span class="has-text-white-ter is-size-5 has-text-weight-light is-uppercase">Year:&nbsp;</span>
          <b-numberinput
            controls-position="compact"
            v-model="year"
            :editable="false"
            :max="new Date().getFullYear()+1"
            :min="new Date().getFullYear()-20"
            type="is-light"
            class="transparent-year"
          ></b-numberinput>
        </div>
      </div>
      <div class="level-item nav-link">
        <div class="level-item">
          <span class="has-text-white-ter is-size-5 has-text-weight-light is-uppercase">Total:&ensp;</span>
          <span class="has-text-white is-size-4 has-text-weight-semibold">{{ totalWorth}}</span>
          <span
            class="has-text-white-ter is-size-5 has-text-weight-light"
          >&nbsp;{{$store.state.currency}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["totalWorth"],
  computed: {
    year: {
      get() {
        return this.$store.state.year;
      },
      set(year) {
        this.$store.commit("SET_YEAR", year);
      }
    }
  }
};
</script>
<style lang="scss">
.transparent-year {
  align-items: center;
  &:hover p {
    visibility: visible;
    opacity: 1;
    width: unset;
    transition: opacity $speed * 1.5, width $speed;
  }
  p {
    width: 0;
    visibility: hidden;
    will-change: display;
    opacity: 0;
    transition: opacity $speed * 1.5, width $speed;
  }
  input {
    font-weight: bold;
    padding: 0;
    height: auto;
    width: auto;
    font-size: $size-4;
    border: none;
    background: transparent !important;
    color: $primary-invert;
  }
}
</style>