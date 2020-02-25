<template>
  <div id="app">
    <Navigation />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import screen from "electron";
import Navigation from "./components/Navigation";
import { mapActions } from "vuex";
export default {
  components: {
    Navigation
  },
  methods: {
    ...mapActions(["getTransactions", "fetchCategories", "fetchAccounts"])
  },
  created() {
    this.getTransactions();
    this.fetchCategories();
    this.fetchAccounts();
  }
};
</script>

<style lang="scss">
#app {
}
#nav {
  font-family: "Barlow", sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  height: $nav-height;
  background: $gradient-main;
  margin: 0;
  .level-left {
    justify-content: flex-start;
  }
  .nav-link {
    display: flex;
    height: 100%;
    align-items: center;
    margin: 0;
    a {
      color: $primary-invert;
      font-weight: 800;
      font-size: 1.1em;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0.5em 1.5em;
      transition: $trans-fast;
      &:hover {
        background: #528196;
        transition: $trans-fast;
      }
    }
  }
}
</style>
