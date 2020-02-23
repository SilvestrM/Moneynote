<template>
  <div>
    <div v-if="rowData !== null">
      <div class="msection">
        <div class="header">
          <h4>Transaction details</h4>
        </div>
        <div class="level">
          <span
            v-if="!editMode"
            class="subtitle is-size-4 is-flex has-text-centered"
          >{{rowData.text}}</span>
          <b-input
            class="level-item"
            v-model="transaction.text"
            type="text"
            :value="rowData.text"
            v-else
          ></b-input>
          <b-checkbox
            class="level-item"
            v-show="editMode"
            v-model="transaction.type"
            :native-value="rowData.type"
          >Income</b-checkbox>

          <div class="level-right">
            <button v-show="editMode" @click="edit" class="button">
              <span class="icon">
                <i class="mdi mdi-content-save-edit"></i>
              </span>
            </button>
            <button @click="editMode = !editMode" class="button">
              <span class="icon">
                <i :class="{'mdi mdi-pencil':!editMode, 'mdi mdi-close':editMode }"></i>
              </span>
            </button>
          </div>
        </div>
        <table class="table not-bordered is-fullwidth">
          <tr>
            <td>Transaction date:</td>
            <td v-if="!editMode">{{formatDate(rowData.date)}}</td>
            <td v-else>
              <b-input
                size="is-small"
                type="date"
                v-model="transaction.date"
                :value="rowData.date"
                required
              ></b-input>
            </td>
          </tr>
          <tr>
            <td>Amount:</td>
            <td v-if="!editMode">{{rowData.value}}</td>
            <td v-else>
              <b-input
                size="is-small"
                type="number"
                v-model="transaction.value"
                :value="Math.abs(rowData.value)"
              ></b-input>
            </td>
          </tr>
          <tr>
            <td>Account:</td>
            <td v-if="!editMode">{{rowData.account}}</td>
            <td v-else>
              <b-input
                size="is-small"
                type="text"
                v-model="transaction.account"
                :value="rowData.account"
                disabled
              ></b-input>
            </td>
          </tr>
          <tr>
            <td>Location:</td>
            <td v-if="!editMode">{{rowData.location !== "" ? rowData.location : "N/A"}}</td>
            <td v-else>
              <b-input
                size="is-small"
                type="text"
                v-model="transaction.location"
                :value="rowData.location"
              ></b-input>
            </td>
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
          <div v-if="rowData.items.length > 0 || editMode" class="tags">
            <b-taglist v-if="!editMode">
              <b-tag
                type="is-primary"
                class="is-medium is-light"
                v-for="item in rowData.items"
                :key="item"
              >{{item}}</b-tag>
            </b-taglist>

            <b-taginput
              ellipsis
              v-else
              attached
              v-model="transaction.items"
              placeholder="Add an item"
              expanded
            ></b-taginput>
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
import { mapActions } from "vuex";
export default {
  props: ["rowData", "formatDate", "find"],
  data() {
    return {
      editMode: false
    };
  },
  computed: {
    transaction: function() {
      return {
        _id: this.rowData._id,
        date: this.rowData.date,
        text: this.rowData.text,
        category: this.rowData.category,
        items: this.rowData.items,
        location: this.rowData.location,
        value: this.rowData.value,
        type: this.rowData.type,
        account: this.rowData.account
      };
    }
  },
  watch: {
    //deactivate edit mode after row change
    //eslint-disable-next-line
    rowData: function(newRow, oldRow) {
      this.editMode = false;
    }
  },
  methods: {
    ...mapActions(["updateTransaction"]),
    edit() {
      this.updateTransaction(this.transaction);
      this.$emit("saveEdit");
      this.editMode = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.subtitle {
  padding: 0 0.75rem;
  margin-bottom: 0 !important;
  text-align: center;
}
.level {
}
</style>