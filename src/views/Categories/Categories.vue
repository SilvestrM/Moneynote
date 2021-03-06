<template>
  <section class="msection">
    <div class="header">
      <h4>Category Management</h4>
    </div>
    <div class="columns">
      <div class="column is-one-third is-aligned-left">
        <div class="level control-panel">
          <div class="level-left">
            <span class="subtitle">Categories</span>
          </div>
          <div class="level-right">
            <button @click="addCategoryShow = true" class="button is-primary">
              <span>Add</span>
              <b-icon icon="plus"></b-icon>
            </button>
            <button @click.prevent="deleteDialog" :disabled="!selectedRow" class="button">
              <span class="icon is-medium">
                <i class="mdi mdi-delete"></i>
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>
        <b-table
          :data="categories"
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
          <template slot="empty">
            <p
              class="notification has-text-grey has-text-centered is-centered"
            >No categories added yet...</p>
          </template>
          <template slot-scope="props">
            <b-table-column field="name" label="Name" sortable searchable>
              <span
                class="is-flex has-text-centered has-text-white has-text-weight-medium"
                style="padding:.2rem"
                :style="{backgroundColor:`hsl(${props.row.color},${$tagColor.s},${$tagColor.l})`}"
              >{{ props.row.name}}</span>
            </b-table-column>
          </template>
        </b-table>
      </div>
      <div class="column is-two-thirds">
        <!-- <div class="level control-panel">
          <div class="level-left"></div>
          <div class="level-right">
            <button @click="addCategoryShow = true" class="button is-info">
              <span>Add</span>
              <b-icon icon="plus"></b-icon>
            </button>
            <button @click.prevent="deleteDialog" :disabled="!selectedRow" class="button">
              <span class="icon is-medium">
                <i class="mdi mdi-delete"></i>
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>-->
        <CategoryDetail :selectedRow="selectedRow" />
      </div>
    </div>
    <b-modal :active.sync="addCategoryShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <AddCategory @hide="addCategoryShow = false;" />
    </b-modal>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedRow: null,
      addCategoryShow: false
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getCategory"]),
    categories() {
      return this.getCategories;
    }
  },
  methods: {
    ...mapActions(["removeCategory"]),
    remove() {
      this.removeCategory(this.selectedRow);
      this.selectedRow = null;
    },
    deleteDialog() {
      this.$buefy.dialog.confirm({
        title: "Deleting Category",
        message: `Are you sure you want to <b>delete</b> category <b>${this.selectedRow.name}</b>? This action cannot be undone.`,
        confirmText: `Delete`,
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.remove();
        }
      });
    }
  },
  components: {
    AddCategory: () => import("@/components/AddCategory.vue"),
    CategoryDetail: () => import("./CategoryDetail")
  }
};
</script>

<style lang="scss" scoped>
</style>