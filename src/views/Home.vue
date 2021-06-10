<template>
  <div class="home">
    <Header/>
    <MainBody/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import MainBody from "@/components/MainBody";

export default {
  name: "Home",

  components: {
    MainBody,
    Header,
  },
};
</script>

<style lang="scss">
  .home {
    position: relative;
  }
</style>
