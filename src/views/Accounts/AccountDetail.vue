<template>
  <div>
    <div v-if="rowData !== null">
      <b-tabs class="is-tab-paddingless" type="is-boxed" vertical :animated="false">
        <b-tab-item label="Overview">
          <div class="msection">
            <div class v-if="!editMode">
              <div class="header">
                <h4>{{rowData.name}}</h4>
              </div>
              <button @click="editMode = !editMode" class="button is-pulled-right">
                <span class="icon">
                  <i :class="{'mdi mdi-pencil':!editMode, 'mdi mdi-close':editMode }"></i>
                </span>
              </button>
            </div>
            <div class="level" v-else>
              <span v-if="!editMode" class="subtitle is-size-4 is-flex has-text-centered"></span>
              <b-input
                class="level-item"
                v-model="account.name"
                type="text"
                :value="rowData.name"
                v-else
              ></b-input>

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
            <div class="columns is-clearfix">
              <div class="column is-full-width">
                <table class="table bolded is-narrow is-fullwidth not-bordered">
                  <tr>
                    <td>Balance:</td>
                    <td>{{$formatNumberDecimal(rowData.balance)}}</td>
                  </tr>
                  <!-- <tr>
                    <td>Currency:</td>
                    <td v-if="!editMode">
                      <span
                        v-if="!editMode"
                        class="has-text-weight-normal is-italic"
                      >{{ rowData.currency}}</span>
                    </td>
                    <td v-else>
                      <b-input
                        type="text"
                        maxlength="3"
                        v-model="account.currency"
                        :value="rowData.currency"
                        placeholder="CZK"
                      ></b-input>
                    </td>
                  </tr>-->
                  <tr>
                    <td>Type:</td>
                    <td>
                      <span class="has-text-weight-normal is-italic">{{ rowData.type}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td v-if="!editMode">
                      <p>{{rowData.description.length > 0 ? rowData.description : "No description found" }}</p>
                    </td>
                    <td v-else>
                      <b-input
                        type="textarea"
                        maxlength="255"
                        v-model="account.description"
                        :value="rowData.description"
                        placeholder="Optional"
                      ></b-input>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- <b-field label="Balance" horizontal>
                <div>
                  <span class="has-text-weight-normal is-italic">{{ rowData.balance}}</span>
                </div>
              </b-field>
              <b-field label="Currency" horizontal>
                <span
                  v-if="!editMode"
                  class="has-text-weight-normal is-italic"
                >{{ rowData.currency}}</span>
                <b-input
                  v-else
                  type="text"
                  maxlength="3"
                  v-model="account.currency"
                  :value="rowData.currency"
                  placeholder="CZK"
                ></b-input>
              </b-field>
              <b-field label="Type" horizontal>
                <span class="has-text-weight-normal is-italic">{{ rowData.type}}</span>
              </b-field>
              <b-field class label="Description" horizontal>
                <p
                  v-if="!editMode"
                >{{rowData.description.length > 0 ? rowData.description : "No description found" }}</p>
                <b-input
                  v-else
                  type="textarea"
                  maxlength="255"
                  v-model="account.description"
                  :value="rowData.description"
                  placeholder="Optional"
                ></b-input>
              </b-field>-->
            </div>
          </div>
        </b-tab-item>
        <b-tab-item label="Transactions">
          <div class="msection">
            <div class="header">
              <h4>Account Transactions</h4>
            </div>
            <b-table
              :data="transactions"
              :paginated="true"
              :per-page="12"
              :pagination-size="'is-small'"
              :pagination-position="'bottom'"
              height="400px"
              narrowed
              sticky-header
            >
              <template slot="empty">
                <p
                  class="notification has-text-grey has-text-centered is-centered"
                >No transactions found.</p>
              </template>
              <template slot-scope="props">
                <b-table-column field="date" label="Date" sortable>{{ $formatDate(props.row.date)}}</b-table-column>
                <b-table-column field="text" label="Text">{{ props.row.text}}</b-table-column>
                <b-table-column field="category" label="Category">
                  <span
                    class="tag has-text-white"
                    :style="{backgroundColor:`hsl(${getCategory(props.row.category).color},${$tagColor.s},${$tagColor.l})`}"
                  >{{getCategory(props.row.category).name}}</span>
                </b-table-column>
                <b-table-column field="value" label="Amount" sortable numeric>
                  <span
                    :class="{'has-text-danger': !props.row.type}"
                  >{{$formatNumberDecimal(props.row.value)}}</span>
                </b-table-column>
              </template>
            </b-table>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
    <div v-else>
      <p
        class="notification has-text-grey has-text-centered is-centered"
      >Select an account to view its details</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["selectedRow"],
  data() {
    return {
      editMode: false
    };
  },
  computed: {
    ...mapGetters(["getAccount", "getTransactionsByAccount", "getCategory"]),
    rowData() {
      return this.selectedRow !== null
        ? this.getAccount(this.selectedRow._id)
        : this.selectedRow;
    },
    transactions() {
      return this.selectedRow !== null
        ? this.getTransactionsByAccount(this.selectedRow._id)
        : this.selectedRow;
    },
    account() {
      return {
        _id: this.rowData._id,
        name: this.rowData.name,
        type: this.rowData.type,
        currency: this.rowData.currency,
        description: this.rowData.description,
        balance: this.rowData.balance
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
    ...mapActions(["updateAccount"]),
    edit() {
      this.updateAccount(this.account);
      this.$emit("saveEdit");
      this.editMode = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.field-label {
  text-align: left !important;
}
.subtitle {
  padding: 0 0.75rem;
  margin-bottom: 0 !important;
  text-align: center;
}
</style>