<template>
  <span>  
    <div  class="card__center">

      <div
        v-if="(isLinked && isLinked.status == 'NOT_LINKED')"
        class="card__header card__item card__item--with-link"
      >
        Link Verified BrightID:
      </div>
      
      <div v-if="(isLinked && isLinked.status == 'NOT_LINKED')">
        <a
          class="card__link card__link--small card__item"
          href="https://metamask.io/"
          >Don't have one?</a
        >
      </div>

      <div
        v-if="isLinked && isLinked.status == 'NOT_LINKED'"
        class="gradient-border card__barcode card__item"
      >
        <qrcode-vue 
        :value="
          'brightid://link-verification/http:%2f%2fnode.brightid.org/idchain/' +
            getAddress()
        " :size="112" level="H"></qrcode-vue>
      </div>
      <Divider v-if="!mannaWallet && isLinked && isLinked.status == 'SUCCESSFUL'" />
      <div
        @click="generateMannaWallet()"
        v-if="!mannaWallet && isLinked && isLinked.status == 'SUCCESSFUL'"
        class="
          btn-selected
          card-gradient-border card__one card__item card__action-button
        "
      >
      GENERATE MANNA WALLET
        <i
          v-if="$store.state.generateMannaWalletLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>

      <Divider v-if="mannaWallet" />

      <div
        v-if="mannaWallet"
        class="card__wallet-address card__item card__item--with-link"
      >
        Manna Claim Wallet Address:
      </div>
      <div
      @click="copyItem(mannaWallet)"
      v-if="mannaWallet"
      class="
      btn-selected
      card-gradient-border card__one card__item card__action-button
    "
    style="font-size: x-small;"
    >

      <i>
        {{ mannaWallet }}
      </i>
      </div>

      <div v-if="mannaWallet" class="card__wallet-address card__item card__item">
        Balance: {{  balance != null ? balance : 'loading...' }}
      </div>
      <div v-if="mannaWallet" class="card__wallet-address card__item card__item">
        Claimable: {{ mannaToClaim ? mannaToClaim : 'loading...' }}
      </div>

      <Divider v-if="mannaToClaim && mannaToClaim.amount > 0" />

      <div
        @click="claimManna()"
        v-if="mannaToClaim > 0"
        class="
          btn-selected
          card-gradient-border card__one card__item card__action-button
        "
        :class="{ 'disable-btn': mannaToClaim.amount == 0 }"
      >
        CLAIM MANNA
        <i
          v-if="$store.state.claimLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <div
      @click="convertingManna()"
        class="
          btn-selected
          card-gradient-border card__one card__item card__action-button
        "
        v-if="mannaWallet && balance > 0 "
        :class="{ 'disable-btn': balance == 0 }"
      >
      CONVERT YOUR KEY
        <i
          v-if="$store.state.connectLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      
      <div
        class="card__item card__need-help"
      >
        <a class="card__link card__link--small" href="https://t.me/Manna_Currency">Need Help?</a>
      </div>
    </div>
  </span>
</template>

<script>
import Divider from "@/components/Divider.vue";

export default {
  name: "Exchange",
  components: {
    Divider,
  },
  data() {
    return {
      paperWalletShare: "",
      signedShareAddress: "",
    };
  },
  methods: {
    generateMannaWallet() {
      this.$store.dispatch("generateMannaWallet", this.getAddress());
    },
    convertMannaWallet() {
      this.$store.dispatch("convertMannaWallet", this.getAddress());
    },
    copyItem(mytext) {
    navigator.clipboard.writeText(mytext)
    this.$swal('Copied!');
    this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Copied!',
        showConfirmButton: false,
        timer: 1500,
        width: '15em',
        timerProgressBar:true
        })
  },
  },
  computed: {
    mannaWallet() {
      return this.$store.state.mannaWallet;
    },
    balance() {
      return this.$store.state.balance;
    },
  },
  mounted() {
    if (this.$store.state.mannaWallet == null) {
      this.$store.dispatch("mannaWallet", this.getAddress());
    }
  },
};
</script>