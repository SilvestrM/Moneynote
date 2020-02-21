<template>
  <section class="msection">
    <div class="header">
      <h4>Categories</h4>
    </div>
    <div class="level control-panel">
      <div class="level-left">
        <button class="button">
          <span>Add</span>
          <b-icon icon="plus"></b-icon>
        </button>
        <button class="button">
          <span>Add</span>
          <b-icon icon="plus"></b-icon>
        </button>
      </div>
      <div class="level-right">
        <button class="button is-danger">
          <span class="icon is-medium">
            <i class="mdi mdi-delete"></i>
          </span>
          <span>Remove</span>
        </button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <b-table
          :class="['scrollable', 'transactions']"
          :data="categories"
          default-sort="name"
          :default-sort-direction="'asc'"
          :order="'is-centered'"
          :selected.sync="selectedRow"
          :paginated="true"
          :per-page="15"
          :pagination-size="'is-small'"
          :pagination-simple="true"
          :pagination-position="'bottom'"
          narrowed
          hoverable
        >
          <template slot-scope="props">
            <b-table-column field="name" label="Name" sortable searchable>
              <span
                class="tag has-text-white"
                :style="{backgroundColor:`hsl(${props.row.color},60%,60%)`}"
              >{{ props.row.name}}</span>
            </b-table-column>
          </template>
        </b-table>
      </div>
      <div class="column is-two-thirds"></div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedRow: null
    };
  },
  computed: {
    ...mapGetters({ categories: "getCategories" })
  }
};
</script>

<style>
</style>