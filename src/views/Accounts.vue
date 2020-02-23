<template>
  <section class="msection">
    <div class="header">
      <h4>Accounts</h4>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <b-table
          :class="['scrollable', 'transactions']"
          :data="accounts"
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
              <span class="tag has-text-white">{{ props.row.name}}</span>
            </b-table-column>
          </template>
        </b-table>
      </div>
      <div class="column is-two-thirds">
        <div class="level control-panel">
          <div class="level-left">
            <button @click="addCategoryShow = true" class="button">
              <span>Add</span>
              <b-icon icon="plus"></b-icon>
            </button>
          </div>
          <div class="level-right">
            <button @click.prevent="deleteDialog" :disabled="!selectedRow" class="button is-danger">
              <span class="icon is-medium">
                <i class="mdi mdi-delete"></i>
              </span>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
    ...mapGetters(["getAccounts"]),
    categories() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["removeCategory"]),
    remove() {
      this.removeCategory(this.selectedRow);
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
          this.$buefy.toast.open("Category deleted!");
        }
      });
    }
  },
  components: {}
};
</script>

<style>
</style>