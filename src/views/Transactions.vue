<template>
  <div>
    <div ref="content" class="content">
      <div class="left">
        <div class="msection">
          <div class="header">
            <h4>Transactions</h4>
          </div>
          <div class="control-panel level">
            <button class="button" @click="addShow = true; showModal()">Add</button>
            <button @click="deleteDialog" class="button is-danger">Remove</button>
          </div>
          <b-table
            :class="['scrollable', 'transactions']"
            :data="rows"
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
            checkable
            :checked-rows.sync="checkedRows"
            :checkbox-position="'left'"
          >
            <template slot-scope="props">
              <b-table-column field="date" label="Date">{{ props.row.date}}</b-table-column>

              <b-table-column field="text" label="Text">{{ props.row.text }}</b-table-column>

              <b-table-column field="value" label="Value" numeric>
                <span :class="{'has-text-danger': !props.row.type}">{{props.row.value }}</span>
              </b-table-column>

              <b-table-column field="account" label="Account">{{props.row.account}}</b-table-column>
            </template>
          </b-table>
          <!-- <table class="table is-hoverable is-narrow scrollable transactions">
            <thead>
              <tr>
                <th>Date</th>
                <th>Text</th>
                <th>Category</th>
                <th>Account</th>
                <th style="text-align:right">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in rows" :key="transaction.date">
                <td>{{transaction.date | formatDate}}</td>
                <td>{{transaction.text}}</td>
                <td>Groceries</td>
                <td>{{transaction.account}}</td>
                <td :class="{'has-text-danger': !transaction.type}">{{transaction.value}}</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>-->
        </div>
      </div>
      <div class="right">
        <Detail :rowData="selectedRow" />
      </div>
    </div>
    <div class="modal" :class="{'is-active':addShow, 'is-clipping':addShow}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <Add @hide="addShow = false; find()" />
      </div>
      <button class="modal-close is-large" @click="addShow=false" aria-label="close"></button>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      addShow: false,
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
        result.forEach(each => {
          each.date = this.formatDate(each.date);
        });
        this.rows = result;
      });
    },
    remove() {
      this.$ipc.send("removeQuery", "transactions", this.checkedRows);
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
  components: {
    Detail: () => import("../components/TransactionDetail.vue"),
    Add: () => import("../components/AddTransaction.vue")
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