<template>
  <span>  
    <div  class="card__center">


      <!-- <Divider /> -->
      
      <!-- <div
        @click="convertingManna()"
        class="btn-selected card-gradient-border card__one card__item card__action-button"
        
      >
      convertingManna
        <i
         
        ></i>
      </div> -->
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

      <!-- <Divider /> -->

      <!-- <div
        @click="ConnectMetamask()"
        class="btn-selected card-gradient-border card__one card__item card__action-button"
        :class="{ 'disable-btn': $store.state.email }"
      >
        CONNECT METAMASK
        <i
          v-if="$store.state.connectLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div> -->
      
      <!-- <div>
        <a
          class="card__link card__link--small card__item"
          href="https://metamask.io/"
          >Don't have one?</a
        >
      </div> -->
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
    <!-- {{ mannaWallet }} -->

      <i>
        {{ mannaWallet }}
      </i>
      </div>
      <!-- <div>
        <v-icon
        small
        class="mr-2"
        @click="
          copyItem(Number(item.TnxID))
          snackbar = true
        "
      >
        mdi-content-copy
      </v-icon>
      <v-snackbar
        v-model="snackbar"
        timeout="2000"
        right
        color="success"
        outlined
      >
        Copied
      </v-snackbar>
      </div> -->

      <div v-if="mannaWallet" class="card__wallet-address card__item card__item">
        Balance: {{  balance != null ? balance : 'loading...' }}
      </div>
      <!-- <div
         v-if="mannaWallet"
    >
    {{ getAddress().slice(0, 7) + "...." + getAddress().slice(-4) }} -->
    <!-- {{ this.hasTakenResult.message }} -->
    <!-- <i
      v-if="$store.state.connectLoading"
      class="fa fa-circle-o-notch fa-spin loader"
    ></i> -->
  <!-- </div> -->
      <div v-if="mannaWallet" class="card__wallet-address card__item card__item">
        Claimable: {{ mannaToClaim ? mannaToClaim : 'loading...' }}
        <!-- Claimable: {{ mannaToClaim }} -->
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

      <!-- <div
        v-if="
          (isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            $store.state.emailSecret) ||
          true
        "
        class="card-gradient-border card__item"
      >
        <input
          class="card__input card__one"
          placeholder="Enter your paper wallet share address"
          v-model="paperWalletShare"
          :disabled="$store.state.sendCodeState == 'SUCCESSFUL'"
        />
      </div> -->

      <!-- <Divider /> -->

      <!-- <div
       
        class="card__header card__item card__item--with-link"
      >
        Send Manna to Paper Wallet
      </div> -->

      <!-- <Divider /> -->

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

      <!-- <div class="card__wallet-address card__item card__item--with-link">
        your wallet address {{ this.getAddress() }}
      </div> -->

      <!-- <Divider /> -->

      <!-- <div
        v-if="
          (isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            $store.state.emailSecret) ||
          true
        "
        class="card-gradient-border card__item"
      >
        <input
          class="card__header card__item card__item--with-link"
          placeholder="Import Key to Metamask"
          v-model="signedShareAddress"
          :disabled="$store.state.sendCodeState == 'SUCCESSFUL'"
        />
      </div> -->
      <!-- <div
       
        class="card__header card__item card__item--with-link"
      >
      Import Key to Metamask
      </div> -->

      <!-- <Divider /> -->

      <!-- <div
        v-if="(isLinked && isLinked.status != 'not linked')"
        class="card__header card__item card__item--with-link"
      >
        Import Key to Metamask
      </div>
 -->
      <div
        class="card__item card__need-help"
      >
        <a class="card__link card__link--small" href="">Need Help?</a>
      </div>
    </div>
    <!-- <div v-else class="card__center">
      <div class="card__wallet-address card__item card__item--with-link">
        In Testing...
      </div>
    </div> -->
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