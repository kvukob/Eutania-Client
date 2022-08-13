<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <v-row class="justify-center">
      <v-col sm="6" md="4" lg="3">
        <div>
          <v-slide-x-transition>
            <LoginCard v-if="showLoginForm" @toggleForm="showCreateAccount" />
          </v-slide-x-transition>
          <v-slide-x-transition>
            <CreateAccountCard
              v-if="showRegisterForm"
              @toggleForm="showLogin"
            />
          </v-slide-x-transition>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateAccountCard from "@/core/auth/CreateAccountCard";
import LoginCard from "@/core/auth/LoginCard";
export default {
  name: "AuthView",
  components: { LoginCard, CreateAccountCard },
  data() {
    return {
      showLoginForm: true,
      showRegisterForm: false,
    };
  },
  methods: {
    showCreateAccount: async function () {
      this.showLoginForm = !this.showLoginForm;
      await new Promise((resolve) => setTimeout(resolve, 350));
      this.showRegisterForm = !this.showRegisterForm;
    },
    showLogin: async function () {
      this.showRegisterForm = !this.showRegisterForm;
      await new Promise((resolve) => setTimeout(resolve, 350));
      this.showLoginForm = !this.showLoginForm;
    },
  },
};
</script>

<style scoped></style>
