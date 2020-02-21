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
      <div class="nav-link level-item">
        <router-link to="/transactions">{{$route.path}}</router-link>
      </div>
    </div>
    <div class="level-right">
      <div class="nav-link level-item">
        <router-link to="/">Settings</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>