<template>
  <div class="header" :class="{ 'header-dark': mode == 'dark' }"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["mode"]),
  },
};
</script>

<style lang="scss">
.header {
  height: 40vh;
  background-image: url("../assets/img/bg-desktop-light.jpg");
  // width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
}

.header-dark {
  background-image: url("../assets/img/bg-desktop-dark.jpg");
}

@media screen and (max-width: 375px) {
  .header {
  height: 40vh;
  background-image: url("../assets/img/bg-mobile-light.jpg");
}

.header-dark {
  background-image: url("../assets/img/bg-mobile-dark.jpg");
}
}
</style>