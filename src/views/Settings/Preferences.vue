<template>
  <section class="msection">
    <div class="header">
      <h4>Preferences</h4>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <form>
          <b-field message="Should be 3 letter currency abbreviation." horizontal label="Currency">
            <b-input type="text" minlength="3" maxlength="3" v-model.lazy="currency" required></b-input>
          </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currency: {
      get() {
        return this.$store.state.currency;
      },
      set(currency) {
        this.$store.dispatch("setCurrency", currency.toUpperCase());
      }
    }
  }
};
</script>

<style>
</style>