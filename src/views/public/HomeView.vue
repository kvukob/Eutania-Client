<template>
  <div>
    <v-row class="justify-center">
      <v-card-title class="text-center text-h2"> Eutania </v-card-title>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="6" md="4">
        <v-card
          border
          class="pa-5 d-flex flex-column justify-center"
          height="100%"
        >
          <v-card color="transparent" class="pa-5" height="100%">
            <v-card-text class="d-flex flex-column text-overline text-center">
              <v-card color="transparent" class="d-flex align-center">
                <v-icon size="50" color="primary">mdi-pickaxe</v-icon>
                Mine on planets to earn resources and rewards
              </v-card>
              <v-divider class="ma-5" />
              <v-card color="transparent" class="d-flex align-center">
                Earn EUA, which is the in-game currency used to buy upgrades,
                spacecraft, and more

                <v-card color="transparent" min-width="60px" min-height="60px">
                  <v-img
                    min-width="60px"
                    min-height="60px"
                    :src="require('@/assets/img/icons/eua.svg')"
                  />
                </v-card>
              </v-card>
              <v-divider class="ma-5" />
              <v-card color="transparent" class="d-flex align-center">
                <v-card color="transparent" width="60px" height="60px">
                  <v-img
                    width="60px"
                    height="60px"
                    :src="require('@/assets/img/icons/market.svg')"
                  />
                </v-card>
                Participate in an entirely player run market
              </v-card>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card height="100%" class="pa-5 d-flex flex-column justify-center">
          <v-alert
            class="justify-center"
            color="success"
            elevation="12"
            max-height="20%"
          >
            <v-alert-title class="text-overline">
              Alpha is currently open
            </v-alert-title>
          </v-alert>
          <v-divider class="ma-5" />
          <v-card-title class="text-center"> Ready to explore? </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn
              block=""
              size="x-large"
              to="login"
              color="primary"
              variant="tonal"
              border
            >
              Play Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "HomeView",

  components: {},

  data: () => ({
    image: 1,
  }),

  beforeMount() {
    this.image = Math.floor(Math.random() * (2 + 1) + 1);
  },

  methods: {},
});
</script>
