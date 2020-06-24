<template>
  <div class="app-content">
    <!-- <section class="left">
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
    </section>-->
    <b-tabs class="is-tab-paddingless" type="is-boxed">
      <b-tab-item label="Accounts">
        <Accounts />
      </b-tab-item>
      <b-tab-item label="Categories">
        <Categories />
      </b-tab-item>
      <b-tab-item label="Preferences">
        <Settings />
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
export default {
  components: {
    Accounts: () => import("./Accounts/Accounts"),
    Categories: () => import("./Categories/Categories"),
    Settings: () => import("./Settings/Preferences")
  },
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
  grid-template-columns: auto;
}
</style>