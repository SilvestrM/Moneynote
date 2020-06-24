<template>
  <section class="msection">
    <div class="header">
      <h4>Preferences</h4>
    </div>
    <div class="columns">
      <div class="column is-one-third">
        <form action>
          <b-field message="Should be 3 letter currency abbreviation." horizontal label="Currency">
            <b-input type="text" minlength="3" maxlength="3" v-model.lazy="currency" required></b-input>
          </b-field>
          <b-field message="Start the application maximized." horizontal label="Fullscreen">
            <b-switch v-model="fullscreen"></b-switch>
          </b-field>
          <b-field
            message="Application will minimize to tray when closed."
            horizontal
            label="Minimize to tray"
          >
            <b-switch v-model="trayMinimize"></b-switch>
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
        return this.$store.state.settings.currency;
      },
      async set(currency) {
        await this.$store.dispatch("updateSettings", {
          currency: currency.toUpperCase()
        });
      }
    },
    fullscreen: {
      get() {
        return this.$store.state.settings.fullscreen;
      },
      async set(bool) {
        await this.$store.dispatch("updateSettings", { fullscreen: bool });
      }
    },
    trayMinimize: {
      get() {
        return this.$store.state.settings.trayMinimize;
      },
      async set(bool) {
        await this.$store.dispatch("updateSettings", { trayMinimize: bool });
      }
    }
  }
};
</script>

<style>
</style>