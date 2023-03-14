<template>
  <div v-if="showMobileToolbar" class="mobile-buttons">
    <div class="mobile-buttons__content">
      <span
        v-if="!selectedAddress"
        class="mobile-buttons__content__connect-wallet"
      >
        <div
          @click="ConnectMetamask()"
          class="gradient-border btn btn-back-orange bold-text"
        >
          CONNECT WALLET
        </div>
      </span>
      <span
        v-else-if="$store.state.chainId && $store.state.chainId != '0x4a'"
        class="mobile-buttons__content__connect-wallet"
      >
        <div
          @click="changeToIDChain()"
          class="gradient-border btn btn-back-red bold-text"
        >
          CONNECT IDChain
        </div>
      </span>
      <span v-else>
        <div
          v-if="
            $store.state.contractData.isVerified == false &&
              isBrightIDVerifiedUnique &&
              isIDChain
          "
          class="mobile-buttons__content__claim"
        >
          <div
            @click="verifyMe()"
            class="gradient-border btn btn-back-orange"
            :class="{ 'disable-btn': $store.state.verifyMeLoading }"
          >
            Verify
            <i
              v-if="$store.state.verifyMeLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
        <div
          v-if="
            $store.state.contractData.isVerified &&
              $store.state.contractData.isRegistered == false &&
              isBrightIDVerifiedUnique &&
              isIDChain
          "
          class="mobile-buttons__content__claim"
        >
          <div
            @click="registerMe()"
            class="gradient-border btn btn-back-orange"
            :class="{ 'disable-btn': $store.state.registerMeLoading }"
          >
            Register
            <i
              v-if="$store.state.registerMeLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
        <div
          v-if="
            $store.state.contractData.isVerified &&
              $store.state.contractData.isRegistered &&
              $store.state.contractData.toClaim &&
              isIDChain
          "
          class="mobile-buttons__content__claim"
        >
          <div
            @click="claimManna()"
            class="gradient-border btn btn-back-orange"
            :class="{
              'disable-btn':
                $store.state.claimLoading ||
                parseInt($store.state.contractData.toClaim._hex, 16) == '0',
            }"
          >
            {{
              "Claim " +
                parseInt($store.state.contractData.toClaim._hex, 16) +
                " Manna"
            }}
            <i
              v-if="$store.state.claimLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
        <div
          v-if="isLinked && mannaBalance"
          class="mobile-buttons__content__manna-amount"
        >
          <div
            @click="addMannaTokenToWallet()"
            class="gradient-border btn btn-back-orange address"
          >
            {{ mannaBalance + " Manna" }}
          </div>
        </div>
        <div
          v-if="isLinked && guidePage"
          class="mobile-buttons__content__manna-amount"
        >
          <div
            @click="goToMannaOne()"
            class="gradient-border btn btn-back-orange address"
          >
            {{ "Convert Manna 1.0" }}
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
// import WalletConnectProvider from "@walletconnect/web3-provider";

export default {
  name: "MobileButtons",
  data() {
    return {
      interval: null,
    };
  },
  computed: {
    showMobileToolbar() {
      return (
        !this.selectedAddress ||
        (this.selectedAddress &&
          this.$store.state.chainId &&
          this.$store.state.chainId != "0x4a") ||
        (this.$store.state.contractData.isVerified == false &&
          this.isBrightIDVerifiedUnique &&
          this.isIDChain) ||
        (this.$store.state.contractData.isVerified &&
          this.$store.state.contractData.isRegistered == false &&
          this.isBrightIDVerifiedUnique &&
          this.isIDChain) ||
        (this.$store.state.contractData.isVerified &&
          this.$store.state.contractData.isRegistered &&
          this.$store.state.contractData.toClaim &&
          this.isIDChain) ||
        (this.$store.state.contractData.isVerified &&
          this.$store.state.contractData.isRegistered &&
          this.$store.state.contractData.toClaim &&
          this.isIDChain) ||
        (this.isLinked && this.mannaBalance) ||
        (this.isLinked && this.guidePage)
      );
    },
  },
  methods: {
    // async mobileConnectMetamask() {
    //   const provider = new WalletConnectProvider({
    //     infuraId: "fee23c83483a4ae0a3cbad8dbb19f92b",
    //     bridge: "https://bridge.walletconnect.org",
    //     qrcodeModalOptions: {
    //       mobileLinks: ["metamask"],
    //     },
    //     rpc: {
    //       74: "https://idchain.one/rpc/",
    //     },
    //   });
    //   try {
    //     this.$store.commit("setSelectedAddress", accounts[0]);
    //     this.loadInfo();
    //   } catch (err) {
    //     if (err.code === 4001) {
    //       console.log("Please connect to WalletConnect.");
    //     } else {
    //       console.error(err);
    //     }
    //   }
    // },
  },
};
</script>
