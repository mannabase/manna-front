<template>
  <homePage class="homepage">
    <div class="homepage__logo">
      <img
        src="@/assets/images/BrightID.png"
        alt=""
        class="homepage__logo__image"
      />
      <h3 class="homepage__text">1. Get a BrightID</h3>
    </div>
    <div class="homepage__logo">
      <img
        src="@/assets/images/BrightID.png"
        alt=""
        class="homepage__logo__image"
      />
      <h3 class="homepage__text">1. Get a BrightID</h3>
    </div>
    <div class="homepage__logo">
      <img
        src="@/assets/images/BrightID.png"
        alt=""
        class="homepage__logo__image"
      />
      <h3 class="homepage__text">1. Get a BrightID</h3>
    </div>

    <!-- <div class="tab-buttons">
      <button @click="showTab('tab1')">Tab 1</button>
      <button @click="showTab('tab2')">Tab 2</button>
    </div>
    <div v-if="activeTab === 'tab1'">
      <Tab1 />
    </div>
    <div v-if="activeTab === 'tab2'">
      <Tab2 />
    </div> -->
  </homePage>
</template>
  
<script>
// import Tab1 from "./Tab1.vue";
// import Tab2 from "./Tab2.vue";

export default {
  components: {
    // Tab1,
    // Tab2,
  },
  data() {
    return {
      activeTab: "tab1",
    };
  },
  methods: {
    showTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

  

  