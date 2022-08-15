<template>
  <div :style="cssProps">
    <v-row
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      "
    >
      <v-card border>
        <v-row class="justify-center">
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-center text-overline text-secondary">
                Select your faction
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card color="transparent" border class="pa-5" @click="null">
              <v-card-title class="text-center"> K'Gelthua </v-card-title>
              <v-img width="100%" :src="require('@/assets/img/factions/2.png')">
              </v-img>
              <v-card border class="pa-1">
                <v-card-text class="overflow-x-auto" style="max-height: 125px">
                  The K'Gelthua formed on Eutania shortly after warping in. They
                  see themselves as guardians of the alien technology originally
                  found throughout the system and have built a neutral
                  foundation in order to preserve the trading routes between
                  factions. One thing matters to the K'Gelhua, and that's
                  financial gain.
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card color="transparent" border class="pa-5" @click="null">
              <v-card-title class="text-center">Skyule</v-card-title>
              <v-img width="100%" :src="require('@/assets/img/factions/3.png')">
              </v-img>
              <v-card border class="pa-1">
                <v-card-text class="overflow-x-auto" style="max-height: 125px">
                  The aggressive nature of leadership has kept the Skyule as a
                  military powerhouse. The leader claims to want to preserve the
                  balance between factions before all out war is declared.
                  However, many question their true intentions as the Skyule are
                  constantly at the center of conflict.
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card color="transparent" border class="pa-5" @click="null">
              <v-card-title class="text-center">S'argon</v-card-title>
              <v-img width="100%" :src="require('@/assets/img/factions/1.png')">
              </v-img>
              <v-card border class="pa-1">
                <v-card-text class="overflow-x-auto" style="max-height: 125px">
                  The S'argon is a newer faction who's leadership is comprised
                  solely of scientists. They are responsible for the
                  breakthrough in the Orythium-based armor that spacecraft use.
                  Without it, exposure to some resources would cause the
                  protective shields used on spacecraft to recursively increase
                  in heat.
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StagingView",

  data: () => ({
    cssProps: {
      backgroundImage: `url(${require("@/assets/img/backgrounds/main.png")})`,
      height: `calc(100vh - 48px)`,
      backgroundSize: `cover`,
    },
  }),
};
</script>

<style scoped></style>
