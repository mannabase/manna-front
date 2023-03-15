<template>
  <div class="content">
    <div class="content__top-curve">
      <img
        class="content__top-curve__image"
        src="@/assets/images/header-bottom.png"
        alt=""
      />
    </div>

    <div v-if="!guidePage" class="content__card-container">
      <Card />
    </div>
    
    <div v-else>
      <GuideHome2 />
    </div>
  
  </div>
</template>

<script>
// import VersionTwo from "@/components/VersionTwo.vue";
import Card from "@/components/Card.vue";
import GuideHome2 from "@/components/GuideHome2.vue";

export default {
  name: "Content",
  data() {
    return {
      
    }
  },
  components: {
    // VersionTwo,
    GuideHome2,
    Card
  },
};
</script>
