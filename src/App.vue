<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Overview</router-link>
      </div>
      <div>
        <router-link to="/transactions">Transactions</router-link>
      </div>
      <div>
        <router-link to="/transactions">Accounts</router-link>
      </div>
      <div>
        <router-link to="/transactions">Analysis</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import screen from "electron";
export default {};
</script>

<style lang="scss">
#app {
}
#nav {
  font-family: "Barlow", sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  height: $nav-height;
  background: $gradient-main;
  div {
    display: flex;
    height: 100%;
    align-items: center;
    a {
      color: $primary-invert;
      font-weight: 800;
      font-size: 1.1em;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1rem;
      transition: $trans-fast;
      &:hover {
        background: #528196;
        transition: $trans-fast;
      }
    }
  }
}
</style>
