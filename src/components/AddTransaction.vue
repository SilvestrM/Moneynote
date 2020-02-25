<template>
  <form class="form-content" @submit.prevent="add">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Transaction</div>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">
          <b-field grouped group-multiline>
            <b-field class="column is-half" label="Date">
              <b-datepicker
                placeholder="Click to select..."
                icon="calendar-today"
                v-model="transaction.date"
                required
                validation-message="You need to select a valid date"
                expanded
              ></b-datepicker>
            </b-field>
            <b-field class="column is-marginless is-one-third" label="Category" expanded>
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
            <b-field class="column is-two-fifths" label="Value" expanded>
              <b-numberinput
                :step="'.1'"
                controls-position="compact"
                expanded
                maxlength="10"
                v-model="transaction.value"
              ></b-numberinput>
            </b-field>
            <b-field class="column is-narrow" label="Account" expanded>
              <b-select
                required
                expanded
                placeholder="Select an account"
                v-model="transaction.account"
              >
                <option
                  v-for="account in accounts"
                  :key="account._id"
                  :value="account._id"
                >{{account.name}}</option>
              </b-select>
            </b-field>
            <b-field class="column is-narrow is-marginless" label="Type">
              <b-checkbox v-model="transaction.type">Is Income</b-checkbox>
            </b-field>
            <b-field class="column is-one-third" label="Location" expanded>
              <b-input type="text" maxlength="30" v-model="transaction.location"></b-input>
            </b-field>
          </b-field>
        </div>
        <b-field label="Text">
          <b-input type="text" maxlength="100" v-model="transaction.text"></b-input>
        </b-field>
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
      <section class="modal-card-foot">
        <button class="button is-primary is-pulled-right" type="submit">Add transaction</button>
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
        date: [],
        text: "",
        category: "",
        items: [],
        location: "",
        value: 0,
        type: false,
        account: "default"
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
