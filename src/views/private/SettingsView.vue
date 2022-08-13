<template>
  <v-row
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <v-col cols="12" md="4">
      <v-card border>
        <v-card-title class="text-overline text-secondary">
          Account
        </v-card-title>
        <v-card-text>
          <v-list bg-color="transparent">
            <v-list-item>
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                Email
                <EmailChangeDialog />
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ email }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                class="d-flex justify-space-between align-center"
              >
                Password
                <PasswordChangeDialog />
              </v-list-item-title>
              <v-list-item-subtitle> </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useAccountStore } from "@/stores/accountStore";
import EmailChangeDialog from "@/core/settings/EmailChangeDialog";
import PasswordChangeDialog from "@/core/settings/PasswordChangeDialog";

export default {
  name: "SettingsView",
  components: { PasswordChangeDialog, EmailChangeDialog },
  data: () => ({
    accountStore: useAccountStore(),
  }),
  computed: {
    email: function () {
      return this.accountStore.getEmail;
    },
  },
};
</script>

<style scoped></style>
