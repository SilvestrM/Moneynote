<template>
  <div class="app-content">
    <section class="left">
      <b-menu>
        <b-menu-list label="Options">
          <b-menu-item
            :active="$route.path === '/controls/accounts'"
            label="Accounts"
            icon="cash-multiple"
            tag="router-link"
            to="/controls/accounts"
          ></b-menu-item>
          <b-menu-item
            :active="$route.path === '/controls/categories'"
            label="Categories"
            icon="content-copy"
            tag="router-link"
            to="/controls/categories"
          ></b-menu-item>
        </b-menu-list>
      </b-menu>
    </section>
    <section class="right">
      <router-view />
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true
    };
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
}
.app-content {
  grid-template-columns: 20% auto;
}
</style>