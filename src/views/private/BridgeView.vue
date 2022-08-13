<template>
  <GameViewWrapper>
    <v-row>
      <v-col cols="12" md="12" lg="6">
        <GameInfoCard />
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card border>
          <v-card-title class="text-overline text-secondary">
            Welcome to the alpha!
          </v-card-title>
          <v-card-text>
            Eutania's vision is to provide a mostly player-run game. We want
            your decisions to matter, whether for items, UX, or overall game
            features.
            <br />
            Thank you for joining us!
          </v-card-text>
        </v-card>
        <v-card border>
          <v-card-title class="text-overline text-secondary">
            Eutania needs your help!
          </v-card-title>
          <v-card-text>
            <v-icon>mdi-chevron-right</v-icon>Game assets are going to
            constantly be under review, and are likely to change often.
            <br />
            <v-icon>mdi-chevron-right</v-icon>We are looking for players who are
            willing to contribute their talents by providing visual assets for
            the game. Full credit will be given to the artist, and you can be a
            part of the development of Eutania!
            <br />
            <v-icon>mdi-chevron-right</v-icon>Images, models, or any other
            provided assets must match the overall theme of the game.
            <br />
            <v-icon>mdi-chevron-right</v-icon>Admittedly, our team's VFX
            abilities are limited. We are also looking for talented individuals
            to re-render some of our assets.
            <br />
            <v-icon>mdi-chevron-right</v-icon>In the event of multiple
            submissions, a vote will be called in the upcoming Eutaniary, where
            players vote to determine the winner. The Eutaniary will allow
            players to propose, and vote on, other game decisions.
          </v-card-text>
          <v-divider class="ma-5" />
          <v-card-actions class="justify-center">
            <v-btn color="primary" variant="tonal" prepend-icon="mdi-discord">
              Join us on Discord to learn more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card border>
          <v-card-title class="text-secondary text-overline">
            Roadmap
          </v-card-title>
          <v-list bg-color="transparent">
            <v-list-item v-for="item in roadmap" :key="item">
              <v-list-item-title>
                <v-row class="justify-space-between text-overline align-center">
                  {{ item.title }}
                  <v-icon color="success" v-if="item.complete">
                    mdi-check
                  </v-icon>
                  <v-icon color="warning" v-if="!item.complete">
                    mdi-progress-wrench
                  </v-icon>
                </v-row>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </GameViewWrapper>
</template>

<script>
import GameViewWrapper from "@/components/GameViewWrapper";
import GameInfoCard from "@/core/bridge/GameInfoCard";
export default {
  name: "BridgeView",
  components: { GameInfoCard, GameViewWrapper },
  data: () => ({
    roadmap: [
      {
        title: "Mining",
        complete: true,
      },
      {
        title: "Item & Sector drops",
        complete: true,
      },
      {
        title: "Missions",
        complete: true,
      },
      {
        title: "Market",
        complete: true,
      },
      {
        title: "Harvester auras & items",
        complete: true,
      },
      {
        title: "Sector auras & items",
        complete: false,
      },
      {
        title: "Spacecrafts",
        complete: false,
      },
      {
        title: "Eutaniary",
        complete: false,
      },
      {
        title: "PvP",
        complete: false,
      },
      {
        title: "More TBA",
        complete: true,
      },
    ],
  }),
};
</script>

<style scoped></style>
