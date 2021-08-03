<template>
  <v-app :class="{ 'app-dark': mode == 'dark' }">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["mode"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Josefin Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: hsl(0, 0%, 98%);
  min-height: 100vh;
}

.v-main {
  padding-bottom: 10rem;
}

.app-dark .v-main {
  background-color: hsl(235, 21%, 11%);

  .v-card {
    background-color: hsl(235, 24%, 19%) !important;
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5% !important;
}

body {
  overflow-x: hidden;
}

.dark {
  background-color: hsl(207, 26%, 17%) !important;
  color: #fff !important;
}
</style>
