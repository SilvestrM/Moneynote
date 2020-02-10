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

      <b-field label="Account">
        <b-select placeholder="Select an account" v-model="transaction.account">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </b-select>
      </b-field>
      <button class="button" type="submit">Add transaction</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transaction: { date: "", text: "", value: 0, type: false, account: 1 }
    };
  },
  methods: {
    addTransaction() {
      if (!this.type) {
        this.value = -this.value;
      }
      this.$ipc.send("addQuery", "transactions", this.transaction);
      this.$emit("hide");
      this.$destroy;
    }
  }
};
</script>
