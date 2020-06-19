<template>
  <div>
    <div v-if="rowData !== null">
      <div class="msection">
        <div class v-if="!editMode">
          <div class="header" :style="{backgroundColor:`hsl(${rowData.color},60%,60%)`}">
            <h4>{{rowData.name}}</h4>
          </div>
          <button @click="editMode = !editMode" class="button is-pulled-right">
            <span class="icon">
              <i :class="{'mdi mdi-pencil':!editMode, 'mdi mdi-close':editMode }"></i>
            </span>
          </button>
        </div>
        <div class="level" v-else>
          <span v-if="!editMode" class="subtitle is-size-4 is-flex has-text-centered"></span>
          <b-input
            class="level-item"
            v-model="category.name"
            type="text"
            :value="rowData.name"
            v-else
          ></b-input>
          <button
            :style="{backgroundColor:`hsl(${category.color},${$tagColor.s},${$tagColor.l})`}"
            v-show="editMode"
            @click="showColorModal = true"
            class="button level-item has-text-white"
          >Change color</button>
          <div class="level-right">
            <button v-show="editMode" @click="edit" class="button">
              <span class="icon">
                <i class="mdi mdi-content-save-edit"></i>
              </span>
            </button>
            <button @click="editMode = !editMode" class="button">
              <span class="icon">
                <i :class="{'mdi mdi-pencil':!editMode, 'mdi mdi-close':editMode }"></i>
              </span>
            </button>
          </div>
        </div>
        <div class>
          <b-field class label="Description">
            <p
              v-if="!editMode"
            >{{rowData.description.length > 0 ? rowData.description : "No description found" }}</p>
            <b-input
              v-else
              type="textarea"
              maxlength="255"
              v-model="category.description"
              :value="rowData.description"
              placeholder="Optional"
            ></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div v-else>
      <p
        class="notification has-text-grey has-text-centered is-centered"
      >Select a category to view its details</p>
    </div>
    <b-modal :active.sync="showColorModal" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <ColorPick @colorChange="changeColor" />
    </b-modal>
  </div>
</template>

<script>
import ColorPick from "@/components/ColorPick";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["selectedRow"],
  data() {
    return {
      editMode: false,
      showColorModal: false
    };
  },
  computed: {
    ...mapGetters(["getCategory"]),
    rowData() {
      return this.selectedRow !== null
        ? this.getCategory(this.selectedRow._id)
        : this.selectedRow;
    },
    category() {
      return {
        _id: this.rowData._id,
        name: this.rowData.name,
        description: this.rowData.description,
        color: this.rowData.color
      };
    }
  },
  watch: {
    //deactivate edit mode after row change
    //eslint-disable-next-line
    rowData: function(newRow, oldRow) {
      this.editMode = false;
    }
  },
  methods: {
    ...mapActions(["updateCategory"]),
    edit() {
      this.updateCategory(this.category);
      this.$emit("saveEdit");
      this.editMode = false;
    },
    changeColor(hue) {
      this.category.color = hue;
    }
  },
  components: { ColorPick }
};
</script>
<style lang="scss" scoped>
.subtitle {
  padding: 0 0.75rem;
  margin-bottom: 0 !important;
  text-align: center;
}
.level {
}
</style>