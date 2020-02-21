<template>
  <div class="app-content">
    <section class="left">
      <b-menu>
        <b-menu-list label="Menu">
          <b-menu-item
            :active="true"
            label="Accounts"
            icon="cash-multiple"
            tag="router-link"
            to="/controls/accounts"
          ></b-menu-item>
          <b-menu-item
            label="Categories"
            icon="account"
            tag="router-link"
            to="/controls/categories"
          ></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item label="Logout"></b-menu-item>
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