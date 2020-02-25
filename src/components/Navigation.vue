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
        <router-link to="/controls">Controls</router-link>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item nav-link">
        <div class="level-item">
          <span class="has-text-white-ter is-size-5 has-text-weight-light is-uppercase">Total:&ensp;</span>
          <span class="has-text-white is-size-4 has-text-weight-semibold">{{ totalWorth}}</span>
          <span class="has-text-white-ter is-size-5 has-text-weight-light">&nbsp;CZK</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["totalWorth"]
};
</script>