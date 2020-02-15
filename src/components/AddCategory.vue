<template>
  <form class="form-content" @submit.prevent="addCategory">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Category</div>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">
          <b-field class="column is-full" label="Name">
            <b-input type="text" maxlength="30" v-model="category.name"></b-input>
          </b-field>

          <b-field position="is-centered" class="column is-full" label="Color">
            <b-field class="column is-full is-flex" style="justify-content:center">
              <color-picker v-model="category.color"></color-picker>
            </b-field>
          </b-field>
        </div>
      </section>
      <section class="modal-card-foot">
        <button class="button is-primary" type="submit">Add category</button>
      </section>
    </div>
  </form>
</template>

<script>
import moment from "moment";
import ColorPicker from "@radial-color-picker/vue-color-picker";
export default {
  data() {
    return {
      category: {
        name: "",
        color: {
          hue: 80,
          saturation: 60,
          luminosity: 60,
          alpha: 1
        }
      }
    };
  },
  methods: {
    addCategory() {
      this.category.color = Math.round(this.category.color);
      this.$ipc.send("addQuery", "category", this.category);
      this.$emit("hide");
      this.$delete;
    }
  },
  updated: function() {},
  components: { ColorPicker }
};
</script>

<style lang="scss" scoped>
@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";
.level {
  .field {
    //width: 100%;
  }
}
</style>
