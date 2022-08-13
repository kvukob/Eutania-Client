<template>
  <div>
    <v-card border @click="null" :disabled="disabled">
      <v-card-title class="text-overline">Commission Rate</v-card-title>
      <v-card-title class="text-end"> {{ commissionRate }} % </v-card-title>
      <v-dialog v-model="dialog" activator="parent">
        <v-card>
          <v-card-text>
            <v-form ref="form" lazy-validation v-model="validForm">
              <label>New Rate</label>
              <v-text-field
                v-model="form.newCommissionRate"
                :rules="commissionRateRules"
                type="number"
              >
                <template v-slot:append> % </template>
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert color="warning" class="ma-2 text-center">
          Changing the commission rate of a sector can <br />
          only be done once every 48 hours.
        </v-alert>
        <v-card>
          <v-card-actions class="justify-space-between">
            <v-btn color="error" @click="dialog = false"> Cancel </v-btn>
            <v-btn color="primary" variant="tonal" @click="submitForm">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <v-alert color="warning" v-if="disabled" class="ma-2 text-center">
      This sector has had its commission rate changed recently and is
      unavailable to be changed again for {{ canModifyTime }} minute<span
        v-if="canModifyTime > 0"
        >s.</span
      >
    </v-alert>
  </div>
</template>

<script>
import socket from "@/utilities/api/socket";
export default {
  name: "SectorCommissionRateCard",
  props: {
    sectorName: String,
    commissionRate: Number,
    disabled: Boolean,
    canModifyTime: Number,
  },
  data: () => ({
    dialog: false,
    form: {
      newCommissionRate: null,
    },
    commissionRateRules: [
      (v) => !!v || "Required",
      (v) => (v >= 0 && v <= 10) || "Rate must be between 0 and 10",
    ],
    validForm: false,
  }),
  computed: {
    sector: function () {
      return this.inventoryStore.getSectorByName(this.sectorName);
    },
  },
  watch: {
    dialog: function () {
      this.newCommissionRate = this.commissionRate;
    },
    newCommissionRate(newVal) {
      if (newVal.toString().includes(".")) {
        this.newCommissionRate =
          newVal.split(".")[0] + "." + newVal.split(".")[1].slice(0, 2);
      }
    },
  },
  methods: {
    submitForm: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        await socket.changeCommissionRate(
          this.sectorName,
          this.form.newCommissionRate
        );
        this.dialog = false;
      }
    },
  },
};
</script>

<style scoped></style>
