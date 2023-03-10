<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo__image" src="@/assets/images/logo.png" alt="" />
      <h2 class="header__logo__name">mannabase</h2>
    </div>
    <span class="header__about">
      <div @click="claim" class="gradient-border btn btn-orange headerinline">
        claim manna 1.0
      </div>
      <div
        @click="goToAbout()"
        class="gradient-border btn btn-orange headerinline"
      >
        connect wallet
      </div>
    </span>

    <div class="header__center-logo">
      <img
        src="@/assets/images/logo-gradient.png"
        alt=""
        class="header__center-logo__image"
      />
      <h1 class="header__center-logo__name">manna</h1>
      <p class="header__center-logo__motto">1 Manna a Day for Everyone</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: {
    changeContent: {
      type: Function,
      require: true,
    },
  },
  methods: {
    goToAbout() {
      window.location.href = "https://www.hedgeforhumanity.org/manna/";
    },
    claim() {
      this.changeContent("newContent");
    },
  },
};
</script>
