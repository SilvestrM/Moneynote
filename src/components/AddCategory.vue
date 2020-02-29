<template>
  <form class="form-content" @submit.prevent="add">
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="title modal-card-title">Add Category</div>
      </header>
      <section class="modal-card-body">
        <b-field class="l" label="Name">
          <b-input
            placeholder="Groceries"
            type="text"
            maxlength="30"
            v-model="category.name"
            required
          ></b-input>
        </b-field>
        <b-field class label="Description">
          <b-input
            type="textarea"
            maxlength="100"
            v-model="category.description"
            placeholder="Optional"
          ></b-input>
        </b-field>
        <!-- <ColorPick @colorChange="changeColor" /> -->
        <button
          type="button"
          :style="{backgroundColor:`hsl(${category.color},60%,60%)`}"
          @click="showColorModal = true"
          class="button is-fullwidth level-item has-text-white"
        >Select color</button>
      </section>
      <section class="modal-card-foot">
        <button class="button is-primary" type="submit">Add category</button>
      </section>
    </div>
    <b-modal :active.sync="showColorModal" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <ColorPick @colorChange="changeColor" />
    </b-modal>
  </form>
</template>

<script>
import ColorPick from "../components/ColorPick";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showColorModal: false,
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
