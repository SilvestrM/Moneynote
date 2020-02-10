<template>
  <div>
    <div class="content">
      <div class="left">
        <div class="msection">
          <div class="header">
            <h4>Transactions</h4>
          </div>
          <div class="control-panel">
            <button class="button" @click="addShow = true; showModal()">Add</button>
            <button @click="remove" class="button">Remove</button>
          </div>
          <table class="table is-hoverable is-narrow scrollable transactions">
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
          </table>
        </div>
      </div>
      <div class="right">
        <Detail />
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
export default {
  data() {
    return {
      addShow: false,
      rightSection: "",
      rows: Array
    };
  },
  methods: {
    find() {
      this.$ipc.send("findQuery", "transactions");
      this.$ipc.on("findBack", (e, result) => {
        this.rows = result;
        console.log(this.rows);
      });
    },
    remove() {
      confirm("Press a button!");
    }
  },
  mounted: function() {
    this.find();
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