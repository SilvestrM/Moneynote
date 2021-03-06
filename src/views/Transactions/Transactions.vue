<template>
  <div>
    <div ref="content" class="app-content">
      <div class="left">
        <div class="msection">
          <div class="header">
            <h4>Transactions</h4>
          </div>
          <div class="control-panel level">
            <div class="level-left">
              <b-switch class="level-item" v-model="filterDate">Filter by month</b-switch>
              <b-select
                class="level-item"
                placeholder="Select a month"
                :disabled="!filterDate"
                v-model="month"
              >
                <option :value="0">January</option>
                <option :value="1">February</option>
                <option :value="2">March</option>
                <option :value="3">April</option>
                <option :value="4">May</option>
                <option :value="5">June</option>
                <option :value="6">July</option>
                <option :value="7">August</option>
                <option :value="8">September</option>
                <option :value="9">October</option>
                <option :value="10">November</option>
                <option :value="11">December</option>
              </b-select>
            </div>
            <div class="level-right">
              <b-dropdown aria-role="list" class>
                <button class="button is-primary" slot="trigger">
                  <span>Add</span>
                  <b-icon icon="chevron-down"></b-icon>
                </button>

                <b-dropdown-item @click="addShow = true">Add Transaction</b-dropdown-item>
                <b-dropdown-item @click="addCategoryShow = true">Add Category</b-dropdown-item>
              </b-dropdown>
              <button @click.prevent="deleteDialog" class="button" :disabled="!selectedRow">
                <span class="icon is-medium">
                  <i class="mdi mdi-delete"></i>
                </span>
                <span>Remove</span>
              </button>
            </div>
          </div>
          <hr class="is-marginless" />
          <div>
            <b-table
              :data="rows"
              default-sort="date"
              :default-sort-direction="'asc'"
              :order="'is-centered'"
              :current-page.sync="currentPage"
              :paginated="true"
              :pagination-size="'is-small'"
              :pagination-simple="false"
              :pagination-position="'bottom'"
              :per-page="pageRows"
              :selected.sync="selectedRow"
              narrowed
              hoverable
              :checked-rows.sync="checkedRows"
              :checkbox-position="'left'"
            >
              <template slot="empty">
                <p
                  class="notification has-text-grey has-text-centered is-centered"
                >No transactions found.</p>
              </template>
              <template slot="top-left"></template>
              <template slot-scope="props">
                <b-table-column field="date" label="Date" sortable>{{ $formatDate(props.row.date)}}</b-table-column>

                <b-table-column field="text" label="Text" @click="!searchable">{{ props.row.text }}</b-table-column>

                <b-table-column field="value" label="Value" numeric>
                  <span
                    :class="{'has-text-danger':!props.row.type, 'has-text-danger-light':selectedRow === props.index}"
                  >{{$formatNumberDecimal(props.row.value) }}</span>
                </b-table-column>
                <b-table-column field="category" label="Category" numeric>
                  <span
                    class="tag has-text-white"
                    :style="{backgroundColor:`hsl(${getCategory(props.row.category).color},${$tagColor.s},${$tagColor.l})`}"
                  >{{getCategory(props.row.category).name}}</span>
                </b-table-column>
              </template>
            </b-table>
          </div>
        </div>
      </div>
      <div class="right">
        <transition name="fade" mode="out-in">
          <Detail :selectedRow="selectedRow" />
        </transition>
      </div>
    </div>
    <!-- <div class="modal" :class="{'is-active':addShow, 'is-clipping':addShow}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <Add @hide="addShow = false; find()" />
      </div>
    <button class="modal-close is-large" @click="addShow=false" aria-label="close"></button>-->
    <!-- </div> -->
    <b-modal :active.sync="addShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <Add @hide="addShow = false;" />
    </b-modal>
    <b-modal :active.sync="addCategoryShow" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <AddCategory @hide="addCategoryShow = false;" />
    </b-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: ["formatDateMixin"],
  data() {
    return {
      month: new Date().getMonth(),
      filterDate: false,
      addShow: false,
      addCategoryShow: false,
      currentPage: 1,
      checkedRows: [],
      selectedRow: null,
      rightSection: "",
      pageRows: 15
      //rows: []
    };
  },
  computed: {
    ...mapGetters(["getCategory", "getTransaction", "getAllTransactions"]),
    rows() {
      const result = this.getAllTransactions;
      return this.filterDate ? this.filterMonth(result) : result;
    }
  },
  methods: {
    ...mapActions(["getTransactions", "fetchCategories", "removeTransaction"]),

    remove() {
      this.removeTransaction(this.selectedRow);
      this.selectedRow = null;
    },
    filterMonth(data) {
      let filtered = [];
      data.forEach(res => {
        let d = new Date(res.date);
        if (d.getMonth() === this.month) {
          filtered.push(res);
        }
      });
      return filtered;
    },
    deleteDialog() {
      this.$buefy.dialog.confirm({
        title: "Deleting Transaction",
        message:
          "Are you sure you want to <b>delete</b> this transaction? This action cannot be undone.",
        confirmText: "Delete Transaction",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.remove();
        }
      });
    }
  },
  created() {},
  mounted() {
    // this.pageRows = Math.round((this.$refs.content.clientHeight - 200) / 36);
  },
  components: {
    Detail: () => import("./TransactionDetail"),
    Add: () => import("@/components/AddTransaction.vue"),
    AddCategory: () => import("@/components/AddCategory.vue")
  }
};
</script>
<style lang="scss" scoped>
.app-content {
  grid-template-columns: 60% auto;
}
</style>