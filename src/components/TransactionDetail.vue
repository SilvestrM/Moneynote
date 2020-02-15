<template>
  <div>
    <div v-if="rowData !== null">
      <div class="msection">
        <div class="header">
          <h4>Transaction details</h4>
        </div>
        <table class="not-bordered is-fullwidth">
          <tr>
            <td>Transaction date:</td>
            <td>{{rowData.date}}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>London</td>
          </tr>
        </table>
      </div>
      <div class="msection">
        <div class="header">
          <h4>Items</h4>
        </div>
        <div class="table-container">
          <table class="table is-narrow is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th style="text-align:right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bread</td>
                <td>Groceries</td>
                <td>10.00</td>
              </tr>
              <tr>
                <td>Dry Shampoo</td>
                <td>Groceries</td>
                <td>5.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <p
        class="notification has-text-grey has-text-centered is-centered"
      >Select a transaction to view its details</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rowData"],
  updated: function() {
    console.log(this.rowData);
  }
};
</script>