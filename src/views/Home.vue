<template>
  <div class="home">
    <Header />
    <Content />
    <Footer />
    <MobileButtons v-if="guidePage"/>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import MobileButtons from "@/components/MobileButtons.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    MobileButtons,
    Content,
    Header,
    Footer
  },
};
</script>
