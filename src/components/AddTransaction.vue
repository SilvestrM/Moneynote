<template>
  <div class="box container">
    <form @submit.prevent="addTransaction">
      <b-field label="Date">
        <b-datepicker
          placeholder="Click to select..."
          icon="calendar-today"
          v-model="transaction.date"
        ></b-datepicker>
      </b-field>

      <b-field label="Text">
        <b-input type="text" maxlength="30" v-model="transaction.text"></b-input>
      </b-field>

      <b-field label="Value">
        <b-numberinput
          :step="'.1'"
          controls-position="compact"
          maxlength="30"
          v-model="transaction.value"
        ></b-numberinput>
      </b-field>

      <b-field label="Type">
        <b-checkbox v-model="transaction.type">Is Income</b-checkbox>
      </b-field>

      <b-field label="Category">
        <b-select placeholder="Select a category" v-model="transaction.category">
          <option
            v-for="category in categories"
            :key="category.name"
            value="category.name"
          >{{category.name}}</option>
        </b-select>
      </b-field>
      <button class="button" type="submit">Add transaction</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      transaction: {
        date: [],
        text: "",
        category: "",
        value: 0,
        type: false,
        account: 1
      },
      categories: []
    };
  },
  methods: {
    find() {
      this.$ipc.send("findQuery", "category");
      this.$ipc.on("findBackc", (e, result) => {
        this.categories = result;
      });
    },
    addTransaction() {
      if (this.type == false) {
        this.transaction.value = -this.transaction.value;
      }
      /*this.transaction.date = moment(String(this.transaction.date)).format(
        "Do MMM YYYY"
      );*/
      this.$ipc.send("addQuery", "transactions", this.transaction);
      this.$emit("hide");
      this.$delete;
    }
  },
  mounted: function() {
    this.find();
  }
};
</script>
