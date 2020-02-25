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
            <b-table-column field="name" label="Name" sortable>
              <b>{{ props.row.name}}</b>
            </b-table-column>
            <b-table-column field="type" label="Type" sortable>{{ props.row.type}}</b-table-column>
            <b-table-column field="balance" label="Balance" sortable numeric>{{ props.row.balance}}</b-table-column>
          </template>
        </b-table>
      </div>
      <div class="column is-two-thirds">
        <div class="level control-panel">
          <div class="level-left">
            <button @click="addShow = true" class="button">
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
    <b-modal :active.sync="addShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <AddAccount @hide="addShow = false; $buefy.toast.open('Account added!');" />
    </b-modal>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AddAccount from "../components/AddAccount";
export default {
  data() {
    return {
      selectedRow: null,
      addShow: false
    };
  },
  computed: {
    ...mapGetters(["getAccounts"]),
    accounts() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["removeAccount"]),
    remove() {
      this.removeAccount(this.selectedRow);
    },
    deleteDialog() {
      this.$buefy.dialog.confirm({
        title: "Deleting Account",
        message: `Are you sure you want to <b>delete</b> account <b>${this.selectedRow.name}</b>? This action cannot be undone.`,
        confirmText: `Delete`,
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.remove();
          this.$buefy.toast.open("Account deleted!");
        }
      });
    }
  },
  components: {
    AddAccount
  }
};
</script>

<style>
</style>