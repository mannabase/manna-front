<template>
  <div class="card">
    <div class="card__center">
      <div class="card__header card__item">Manna is stored on:</div>
      <div class="card__buttons card__item">
        <div
          v-for="store in storeType"
          :key="store.key"
          class="btn card-gradient-border card__three"
          :class="{ 'btn-selected': selectedStore == store.key }"
          @click="changeStore(store.key)"
        >
          {{ store.title }}
        </div>
      </div>

      <Mannabase v-if="selectedStore == 'mannabase'" />
      <PaperWallet v-if="selectedStore == 'wallet' || selectedStore == 'exchange'" />
    </div>
  </div>
</template>

<script>
import PaperWallet from "@/components/PaperWallet.vue";
import Mannabase from "@/components/Mannabase.vue";

export default {
  components: {
    Mannabase,
    PaperWallet,
  },
  data() {
    return {
      selectedStore: "mannabase",
      storeType: [
        {
          title: "Mannabase.com",
          key: "mannabase",
        },
        {
          title: "An Exchange",
          key: "exchange",
        },
        {
          title: "Q.T./ Paper Wallet",
          key: "wallet",
        },
      ],

      qrcodeValue: null,
      email: "",
      code: "",

      interval: null
    };
  },
  methods: {
    changeStore(key) {
      this.selectedStore = key;
    },
    isMetamaskConnected() {
      return window.ethereum.selectedAddress != null;
    },
    getAddress() {
      window.ethereum.enable();
      return window.ethereum.selectedAddress;
    },
    ConnectMetamask() {
      if (!this.$store.state.email) {
        let connectMetamaskEnable = window.ethereum.enable();

        if (this.isMetamaskConnected()) {
          this.$store.dispatch("isLinked", this.getAddress());
        } else {
          if (this.interval == null) {
            this.interval = setInterval(() => {
              if (this.isMetamaskConnected()) {
                this.$store.dispatch("isLinked", this.getAddress());
                clearInterval(this.interval)
                this.interval = null
              } 
            }, 500);
          }
        }

        return connectMetamaskEnable;
      }
    },
    sendEmail() {
      if (this.email.length > 0) {
        this.$store.dispatch("sendEmail", {
          mailAddress: this.email,
          walletAddress: this.getAddress(),
        });
      }
    },
    submitCode() {
      if (this.$store.state.sendCodeState != "successful") {
        if (this.code.length > 0) {
          this.$store.dispatch("submitCode", {
            secret: this.$store.state.emailSecret,
            code: this.code,
          });
        }
      }
    },
    handleChangeEmail() {
      this.$store.state.email = null;
      this.$store.state.emailSecret = null;
      this.$store.state.sendCodeState = null;
      this.$store.state.sendCodeMsg = null;
      this.$store.state.txHash = null;
      this.$store.state.txLink = null;
      this.code = null;
    },
    handleIsLinked() {
      if (!this.$store.state.email) {
        this.$store.state.connectLoading = true;
        setTimeout(() => {
          let connectMetamaskEnable = window.ethereum.enable();

          if (this.isMetamaskConnected()) {
            this.$store.dispatch("isLinked", this.getAddress());
          }

          return connectMetamaskEnable;
        }, 5000);
      }
    },
  },
  computed: {
    userState() {
      return this.$store.state.userState;
    },
  },
};
</script>
