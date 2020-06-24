<template>
  <form class="form-content" @submit.prevent="add">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Transaction</div>
      </header>
      <section class="modal-card-body">
        <b-field>
          <b-field class label="Date *">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today"
              v-model="transaction.date"
              required
              validation-message="You need to select a valid date"
              expanded
            ></b-datepicker>
          </b-field>
        </b-field>
        <hr />
        <b-field expanded grouped>
          <b-field style="flex-grow:2" class label="Amount" expanded>
            <b-numberinput
              placeholder="0.00"
              :controls="false"
              step="0.01"
              expanded
              maxlength="10"
              v-model="transaction.value"
            ></b-numberinput>
          </b-field>
          <b-field class label="Account *" expanded>
            <b-select
              required
              expanded
              placeholder="Select an account"
              v-model="transaction.account"
            >
              <option
                :selected="true"
                v-for="account in accounts"
                :key="account._id"
                :value="account._id"
              >{{account.name}}</option>
            </b-select>
          </b-field>
          <b-field class label="Type">
            <b-checkbox v-model="transaction.type">Is Income</b-checkbox>
          </b-field>
        </b-field>
        <hr />
        <b-field grouped>
          <b-field label="Text" expanded>
            <b-input
              placeholder="Grocery shopping"
              type="text"
              maxlength="100"
              v-model="transaction.text"
            ></b-input>
          </b-field>

          <b-field label="Category *" expanded>
            <b-select
              required
              placeholder="Select a category"
              expanded
              v-model="transaction.category"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >{{category.name}}</option>
            </b-select>
          </b-field>
          <b-field label="Location">
            <b-input
              placeholder="Optional"
              type="text"
              maxlength="30"
              v-model="transaction.location"
            ></b-input>
          </b-field>
        </b-field>
        <hr />
        <b-field label="Items">
          <b-taginput
            attached
            maxlength="20"
            placeholder="Add an item"
            v-model="transaction.items"
            maxtags="30"
          ></b-taginput>
        </b-field>
      </section>
      <section style="justify-content:flex-end" class="is-flex modal-card-foot">
        <b-button
          class="button is-primary has-text-weight-semibold"
          native-type="submit"
        >Add transaction</b-button>
      </section>
    </div>
  </form>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      transaction: {
        date: new Date(),
        text: "",
        category: "",
        items: [],
        location: "",
        value: 0,
        type: false,
        account: ""
      }
      //categories: []
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getAccounts"]),
    categories() {
      return this.getCategories;
    },
    accounts() {
      return this.getAccounts;
    }
  },
  methods: {
    ...mapActions(["addTransaction"]),
    parseDate(date) {
      return moment(date);
    },
    add() {
      this.addTransaction(this.transaction);
      this.$emit("hide");
      this.$buefy.toast.open({
        message: `adding transaction...`
      });
      this.$delete;
    }
  },
  mounted: function() {
    //this.date = Date.now;
    //this.find();
  }
};
</script>

<style lang="scss" scoped>
.level {
  .field {
    //width: 100%;
  }
}
</style>
