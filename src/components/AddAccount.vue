<template>
  <form class="form-content" @submit.prevent="add">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Account</div>
      </header>
      <section class="modal-card-body">
        <b-field grouped>
          <b-field class="l" label="Name" expanded>
            <b-input
              placeholder="Default"
              type="text"
              maxlength="30"
              v-model="account.name"
              expanded
              required
            ></b-input>
          </b-field>
          <!-- <b-field class="l" label="Currency">
            <b-input placeholder="CZK" type="text" maxlength="3" v-model="account.currency" reqired></b-input>
          </b-field>-->
        </b-field>
        <b-field grouped>
          <b-field label="Initial balance" expanded>
            <b-numberinput :controls="false" maxlength="30" v-model="account.balance" expanded></b-numberinput>
          </b-field>
          <b-field label-for="type" position="is-centered" custom-class="control" expanded>
            <b-radio
              required
              v-model="account.type"
              name="type"
              native-value="bank"
              native-checked
            >Bank</b-radio>
            <b-radio required v-model="account.type" name="type" native-value="cash">Cash</b-radio>
            <b-radio required v-model="account.type" name="type" native-value="debt">Debt</b-radio>
          </b-field>
        </b-field>
        <b-field class label="Description">
          <b-input
            type="textarea"
            maxlength="100"
            v-model="account.description"
            placeholder="Optional"
            expanded
          ></b-input>
        </b-field>
      </section>
      <section style="justify-content:flex-end" class="is-flex modal-card-foot">
        <button class="button is-primary" type="submit">Add account</button>
      </section>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      account: {
        name: "",
        type: "",
        currency: "",
        description: "",
        balance: 0
      }
    };
  },
  methods: {
    ...mapActions(["addAccount"]),
    add() {
      this.addAccount(this.account);
      this.$emit("hide");
      this.$delete;
    }
  }
};
</script>

<style>
</style>