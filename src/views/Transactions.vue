<template>
  <div>
    <div ref="content" class="content">
      <div class="left">
        <div class="msection">
          <div class="header">
            <h4>Transactions</h4>
          </div>
          <div class="control-panel level">
            <div class="level-left">
              <b-dropdown aria-role="list">
                <button class="button is-primary" slot="trigger">
                  <span>Add</span>
                  <b-icon icon="chevron-down"></b-icon>
                </button>

                <b-dropdown-item @click="addShow = true">Add Transaction</b-dropdown-item>
                <b-dropdown-item @click="addCategoryShow = true">Add Category</b-dropdown-item>
              </b-dropdown>
            </div>
            <button @click="deleteDialog" :disabled="!selectedRow" class="button is-danger">
              <span class="icon is-medium">
                <i class="mdi mdi-delete"></i>
              </span>
              <span>Remove</span>
            </button>
          </div>
          <b-table
            :class="['scrollable', 'transactions']"
            :data="rows"
            default-sort="date"
            :default-sort-direction="'asc'"
            :paginated="true"
            :per-page="pageRows"
            :pagination-size="'is-small'"
            :current-page.sync="currentPage"
            :order="'is-centered'"
            :pagination-simple="true"
            :pagination-position="'bottom'"
            :selected.sync="selectedRow"
            narrowed
            hoverable
            :checked-rows.sync="checkedRows"
            :checkbox-position="'left'"
          >
            <template slot-scope="props">
              <b-table-column field="date" label="Date" sortable>{{ formatDate(props.row.date)}}</b-table-column>

              <b-table-column field="text" label="Text" @click="!searchable">{{ props.row.text }}</b-table-column>

              <b-table-column field="value" label="Value" numeric>
                <span :class="{'has-text-danger': !props.row.type}">{{props.row.value }}</span>
              </b-table-column>
              <b-table-column field="category" label="Category">
                <span
                  class="tag has-text-white"
                  :style="{backgroundColor:`hsl(${props.row.category.color},60%,60%)`}"
                >{{props.row.category.name}}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
      <div class="right">
        <Detail :formatDate="formatDate" :rowData="selectedRow" />
      </div>
    </div>
    <!-- <div class="modal" :class="{'is-active':addShow, 'is-clipping':addShow}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <Add @hide="addShow = false; find()" />
      </div>
    <button class="modal-close is-large" @click="addShow=false" aria-label="close"></button>-->
    <!-- </div> -->
    <b-modal :active.sync="addShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <Add @hide="addShow = false; find()" />
    </b-modal>
    <b-modal :active.sync="addCategoryShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <AddCategory @hide="addCategoryShow = false" />
    </b-modal>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      addShow: false,
      addCategoryShow: false,
      currentPage: 1,
      checkedRows: [],
      selectedRow: null,
      rightSection: "",
      pageRows: 12,
      rows: []
    };
  },
  /*computed: {
    pageRows: function() {
      return Math.round(this.$refs.content.clientHeight / 24);
    }
  },*/
  methods: {
    formatDate(date) {
      return moment(String(date)).format("Do MMM YYYY");
    },
    find() {
      this.$ipc.send("findQuery", "transactions");
      this.$ipc.on("findBackt", (e, result) => {
        this.rows = result;
      });
    },
    remove() {
      this.$ipc.send("removeQuery", "transactions", this.selectedRow);
      this.find();
    },
    deleteDialog() {
      this.$buefy.dialog.confirm({
        title: "Deleting Transaction",
        message:
          "Are you sure you want to <b>delete</b> this transaction? This action cannot be undone.",
        confirmText: "Delete Transaction",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.remove();
          this.$buefy.toast.open("Transaction deleted!");
        }
      });
    }
  },
  mounted: function() {
    this.find();
    this.pageRows = Math.round((this.$refs.content.clientHeight - 200) / 36);
  },
  updated: function() {},
  components: {
    Detail: () => import("../components/TransactionDetail.vue"),
    Add: () => import("../components/AddTransaction.vue"),
    AddCategory: () => import("../components/AddCategory.vue")
  }
};
</script>
<style lang="scss">
.transactions {
  td,
  th {
    /*&:nth-child(1) {
            width:15%;
        }
        &:nth-child(2) {
            width:40%;
        }
        &:nth-child(3) {
            width:25%;
        }
        &:nth-child(4) {
            width:15%;
        }
        &:nth-child(5) {
            width:15%;
        }
        &:nth-child(6) {
            width:0.5rem;
            padding: 0;
        }*/
    @include table-dimensions(15%, 40%, 25%, 15%, 15%, 0.5rem, 0, 0, 0, 0);
  }
}
</style>