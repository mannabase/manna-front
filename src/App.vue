<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
import ENUMS from "@/javascripts/constants/enums";
import Web3 from "web3";
import { Icon } from '@iconify/vue2';

export default {
  data() {
    return {
      ENUMS,
      Icon
    };
  },
  methods: {
    accountsChangedHandler() {
      window.ethereum.request({ method: "eth_accounts" }).then((res) => {
        if (this.selectedAddress != res[0]) {
          if (res.length > 0) {
            this.$store.commit("setSelectedAddress", res[0]);
            this.loadInfo();
          } else {
            this.$store.commit("setSelectedAddress", null);
          }
        }
        this.$store.commit("resetStore")
      });
    },
    chainChangedHandler() {
      this.loadInfo();
    },
    connectedHandler() {
      window.ethereum.request({ method: "eth_accounts" }).then((res) => {
        if (res.length > 0) {
          if (!window.web3) {
            window.ethereum.enable();
            window.web3 = new Web3(window.ethereum);
          }
          this.$store.commit("setSelectedAddress", res[0]);
          this.loadInfo();
        }
      });
    },
    async checkProvider() {
      const provider = await detectEthereumProvider();

      if (provider) {
        this.$store.commit(
          "setProviderState",
          ENUMS.providerState.HAS_PROVIDER
        );
        window.ethereum.on("accountsChanged", this.accountsChangedHandler);
        window.ethereum.on("chainChanged", this.chainChangedHandler);
        window.ethereum.on("connect", this.connectedHandler);
        if (window.ethereum.selectedAddress) {
          this.connectedHandler();
          this.$store.commit("setSelectedAddress", this.getAddress());
        }
      } else {
        this.$store.commit("setProviderState", ENUMS.providerState.NO_PROVIDER);
      }
    },
  },
  created() {
    if (window.location.href.includes('https://www.mannatest.hedgeforhumanity.org/')) {
      window.location.href = 'https://mannatest.hedgeforhumanity.org/';
    }
    this.checkProvider();
  },
  watch: {
    selectedAddress(newAddress, oldAddress) {
      if (newAddress != oldAddress && newAddress != null) {
        this.$store.dispatch("isLinked", this.selectedAddress);
        this.$store.dispatch("isBrightIDVerified", this.selectedAddress);
        if (!window.web3) {
          window.ethereum.enable();
          window.web3 = new Web3(window.ethereum);
        }
        this.loadInfo();
      }
    },
  },
};
</script>
