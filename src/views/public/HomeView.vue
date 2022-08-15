<template>
  <div :style="cssProps">
    <v-img
      :src="require('@/assets/img/planets/eutania.png')"
      style="width: 90%; height: 90%; position: fixed; bottom: -50%; right: 5%"
    >
    </v-img>
    <v-row class="justify-center text-center">
      <v-col cols="12" sm="6" md="2">
        <v-card color="transparent" class="d-flex flex-column align-center">
          <v-card
            variant="plain"
            color="transparent"
            min-width="60px"
            min-height="60px"
          >
            <v-icon size="60" color="primary">mdi-pickaxe</v-icon>
          </v-card>
          <v-card-text>
            Mine on planets to earn resources and rewards
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="transparent" class="d-flex flex-column align-center">
          <v-card
            variant="plain"
            color="transparent"
            min-width="60px"
            min-height="60px"
          >
            <v-img
              min-width="60px"
              min-height="60px"
              :src="require('@/assets/img/icons/eua.svg')"
            />
          </v-card>
          <v-card-text>
            Earn EUA, which is the in-game currency used to buy upgrades,
            spacecraft, and more
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="transparent" class="d-flex flex-column align-center">
          <v-card
            variant="plain"
            color="transparent"
            width="60px"
            height="60px"
          >
            <v-img
              width="60px"
              height="60px"
              :src="require('@/assets/img/icons/market.svg')"
            />
          </v-card>
          <v-card-text>
            Participate in an entirely player run market
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="6" md="4">
        <v-card height="100%" class="pa-5 d-flex flex-column justify-center">
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
    cssProps: {
      backgroundImage: `url(${require("@/assets/img/backgrounds/main.png")})`,
      height: `calc(100vh - 48px)`,
      backgroundSize: `cover`,
    },
  }),

  methods: {},
});
</script>
