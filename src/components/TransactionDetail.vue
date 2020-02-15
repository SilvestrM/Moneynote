<template>
  <div>
    <div v-if="rowData !== null">
      <div class="msection">
        <div class="header">
          <h4>Transaction details</h4>
        </div>
        <div class="level">
          <span class="subtitle is-size-4 is-flex has-text-centered">> {{rowData.text}}</span>
          <button class="button">
            <span class="icon">
              <i class="mdi mdi-pencil"></i>
            </span>
          </button>
        </div>
        <table class="not-bordered is-fullwidth">
          <tr>
            <td>Transaction date:</td>
            <td>{{formatDate(rowData.date)}}</td>
          </tr>
          <tr>
            <td>Amount:</td>
            <td>{{rowData.value}}</td>
          </tr>
          <tr>
            <td>Account:</td>
            <td>{{rowData.account}}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{{rowData.location !== "" ? rowData.location : "N/A"}}</td>
          </tr>
          <tr>
            <td>Category:</td>
            <td>
              <span
                class="tag has-text-white"
                :style="{backgroundColor:`hsl(${rowData.category.color},60%,60%)`}"
              >{{rowData.category.name}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="msection">
        <div class="header">
          <h4>Items</h4>
        </div>
        <section class="items-container">
          <div v-if="rowData.items.length > 0" class="tags">
            <b-tag class="is-medium" v-for="item in rowData.items" :key="item">{{item}}</b-tag>
          </div>
          <div v-else>
            <p class="notification has-text-grey has-text-centered is-centered">No items found.</p>
          </div>
        </section>
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
  props: ["rowData", "formatDate"],
  updated: function() {
    console.log(this.rowData.items);
  }
};
</script>
<style lang="scss" scoped>
.subtitle {
  padding: 0 0.75rem;
  margin-bottom: 0 !important;
  text-align: center;
}
</style>