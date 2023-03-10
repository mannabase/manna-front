<template>
  <div class="home">
    <Header />
    <Content />
    <!-- <Footer /> -->
    <!-- <FooterNew /> -->
  </div>
</template>

<script>
// import FooterNew from "@/components/FooterNew.vue";
import Content from "@/components/Content.vue";
import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    // FooterNew,
    Content,
    Header,
    // Footer
  },
};
</script>
