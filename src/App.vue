<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    haveMetamask() {
      return window.ethereum != null;
    },
    isMetamaskConnected() {
      return window.ethereum.selectedAddress != null;
    },
    getAddress() {
      window.ethereum.enable();
      return window.ethereum.selectedAddress;
    },
  },
  mounted() {
    this.$store.commit("setHaveMetamask", this.haveMetamask());

    if (this.haveMetamask()) {
      this.$store.commit("setIsMetamaskConnected", this.isMetamaskConnected());

      if (this.isMetamaskConnected()) {
        this.$store.dispatch("isLinked", this.getAddress());
      }
    }
  },
};
</script>
