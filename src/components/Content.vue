<template>
  <div class="content">
    <div class="content__top-curve">
      <img
        class="content__top-curve__image"
        src="@/assets/images/header-bottom.png"
        alt=""
      />
    </div>
    <!-- <p class="content__head-text">Coming Soon...</p> -->
    <!-- <div :homepage="homepage">
      <HomePage />
    </div> -->
    <div :claim="claim" class="content__card-container">
      <Card />
    </div>

    <!-- <div class="content__version-two-container">
      <VersionTwo />
    </div> -->

    <div class="content__logo">
      <FooterNew />
    </div>

    <!-- 
    <div class="content__footer-curve">
      <img
        class="content__top-curve__image"
        src="@/assets/images/footer-top.png"
        alt=""
      />
    </div> -->
  </div>
</template>

<script>
// import VersionTwo from "@/components/VersionTwo.vue";
import Card from "@/components/Card.vue";
import FooterNew from "@/components/FooterNew.vue";
// import HomePage from "./HomePage.vue";

export default {
  name: "Content",
  components: {
    // VersionTwo,
    Card,
    FooterNew,
    // HomePage,
  },
  data() {
    return {
      homepage: "defual content",
    };
  },
  methods: {
    chaingeContent(newContent) {
      this.homepage = newContent;
    },
  },
};
</script>
