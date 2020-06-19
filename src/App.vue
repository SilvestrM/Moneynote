<template>
  <div id="app">
    <Navigation :totalWorth="totalWorth" />
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import Navigation from "./components/Navigation";
import { mapActions, mapGetters } from "vuex";
import { ipcRenderer as ipc } from "electron-better-ipc";
export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      totalWorth: "getTotal"
    })
  },
  methods: {
    ...mapActions(["updateBalance", "removeTransactions"])
  },
  async created() {
    //database operations
    // this.getTransactions();
    // this.fetchCategories();
    // this.fetchAccounts();

    await this.$store.dispatch("initApp");

    ipc.answerMain("updateBalance", async data => {
      await this.updateBalance(data);
    });

    ipc.answerMain("removeTransactions", async data => {
      await this.removeTransactions(data);
    });
  }
};
</script>

<style lang="scss">
#app {
}
#nav {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  height: $nav-height;
  //max-height: $nav-max;
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
    > * {
      padding: 1vh 1em;
    }
    a {
      font-family: "Barlow", sans-serif;
      color: $primary-invert;
      font-weight: 800;
      font-size: 1.1em;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      transition: all $trans-fast;
      &:hover {
        background: darken($primary, 15);
        text-decoration: underline;
        transition: all $trans-fast;
      }
    }
  }
}
</style>
