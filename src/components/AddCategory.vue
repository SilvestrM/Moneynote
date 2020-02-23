<template>
  <form class="form-content" @submit.prevent="add">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Category</div>
      </header>
      <section class="modal-card-body">
        <b-field class="l" label="Name">
          <b-input type="text" maxlength="30" v-model="category.name" required></b-input>
        </b-field>
        <b-field class label="Description">
          <b-input
            type="textarea"
            maxlength="100"
            v-model="category.description"
            placeholder="Optional"
          ></b-input>
        </b-field>
        <ColorPick @colorChange="changeColor" />
      </section>
      <section class="modal-card-foot">
        <button class="button is-primary" type="submit">Add category</button>
      </section>
    </div>
  </form>
</template>

<script>
import moment from "moment";
import ColorPick from "../components/ColorPick";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      category: {
        name: "",
        description: "",
        color: 80
      }
    };
  },
  methods: {
    ...mapActions(["addCategory"]),
    add() {
      /* this.category.color = Math.round(this.category.color);
      this.$ipc.send("addQuery", "category", this.category); */
      this.addCategory(this.category);
      this.$emit("hide");
      this.$delete;
    },
    changeColor(hue) {
      this.category.color = hue;
    }
  },
  updated: function() {},
  components: { ColorPick }
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
