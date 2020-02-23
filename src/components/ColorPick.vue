<template>
  <b-field position="is-centered" class>
    <b-field class="is-flex" style="justify-content:center">
      <color-picker v-bind="color" @input="colorPick"></color-picker>
    </b-field>
  </b-field>
</template>

<script>
import ColorPicker from "@radial-color-picker/vue-color-picker";
export default {
  data() {
    return {
      color: {
        hue: 50,
        saturation: 60,
        luminosity: 60,
        alpha: 1
      }
    };
  },
  methods: {
    colorPick(hue) {
      this.color.hue = hue;
      this.$emit("colorChange", hue);
    }
  },
  components: { ColorPicker }
};
</script>

<style>
</style>