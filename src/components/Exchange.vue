<template>
  <span>
    <div v-if="$store.state.isLinkedFooterLoading">
      <i
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
        Loading...
    </div>
    <div class="card__center">
      <div
        v-if="isLinked && isLinked.status == 'NOT_LINKED'"
        class="card__header card__item card__item--with-link"
      >
        Link Verified BrightID:
      </div>

      <div v-if="isLinked && isLinked.status == 'NOT_LINKED'">
        <a
          class="card__link card__link--small card__item"
          href="https://metamask.io/"
          >Don't have one?</a
        >
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status != 'NOT_LINKED' &&
            isLinked.status != 'SUCCESSFUL'
        "
        class="card__center card__desc"
      >
        <div
          v-if="isLinked.status == 'NOT_VERIFIED'"
          @click="visitLink(isLinked.link)"
          class="gradient-border card__barcode card__item"
        >
          <qrcode-vue
            :value="isLinked.link"
            :size="qrCodeSize"
            level="H"
          ></qrcode-vue>
        </div>
        <div
          v-if="isLinked.status == 'TRANSFERRED'"
          @click="
            visitLink(
              'brightid://link-verification/http:%2f%2fnode.brightid.org/idchain/' +
                getAddress()
            )
          "
          class="gradient-border card__barcode card__item"
        >
          <qrcode-vue
            :value="
              'brightid://link-verification/http:%2f%2fnode.brightid.org/idchain/' +
                getAddress()
            "
            :size="112"
            level="H"
          ></qrcode-vue>
        </div>
        <div
          v-if="isLinked.status == 'TRANSFERRED' && 'NOT_VERIFIED'"
          class="btn-selected
            card-gradient-border card__one card__item card__action-button"
          :class="{ 'disable-btn': $store.state.alertLoading }"
          @click="checkBrightIDVerification()"
        >
          verify connection
          <i
            v-if="$store.state.alertLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i>
        </div>
        {{
          isLinked.status == "NOT_VERIFIED"
            ? isLinked.message
            : "This BrightID account is linked to " +
              isLinked.address +
              " Please use this address or try to use a new address"
        }}
      </div>
      <div
        v-if="isLinked && isLinked.status == 'NOT_LINKED'"
        class="gradient-border card__barcode card__item"
        @click="visitLink(isLinked.link)"
      >
        <qrcode-vue :value="isLinked.link" :size="112" level="H"></qrcode-vue>
      </div>
      <div
        v-if="isLinked && isLinked.status == 'NOT_LINKED'"
        class="btn-selected
            card-gradient-border card__one card__item card__action-button"
        :class="{ 'disable-btn': $store.state.alertLoading }"
        @click="checkBrightIDVerification()"
      >
        verify connection
        <i
          v-if="$store.state.alertLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>

      <Divider
        v-if="
          getMannaWallet.message == 'No Manna wallet' &&
            getMannaWallet.status == 'error' &&
            isLinked &&
            isLinked.status == 'SUCCESSFUL'
        "
      />
      <div
        @click="generateMannaWallet()"
        v-if="
          getMannaWallet.message == 'No Manna wallet' &&
            getMannaWallet.status == 'error' &&
            isLinked &&
            isLinked.status == 'SUCCESSFUL'
        "
        class="
            btn-selected
            card-gradient-border card__one card__item card__action-button
          "
      >
        Generate Manna Wallet
        <i
          v-if="$store.state.generateMannaWalletLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>

      <Divider v-if="getMannaWallet.status == 'success'" />

      <div
        v-if="getMannaWallet.status == 'success'"
        class="card__wallet-address card__item card__item--with-link"
      >
        Manna Claim Wallet Address:
      </div>
      <div
        v-if="getMannaWallet.status == 'success'"
        class="
        mannawalletShow
         card__one card__item card__action-button
      "
        style="font-size: small;"
      >

        <i>
          {{ getMannaWallet.mannaWallet }}
        </i>
        <i
          @click="copyItem(getMannaWallet.mannaWallet)"
          class="card__link card__link--small"
          style="margin-left: 2px;"
          >copy</i
        >
      </div>
      <div
        v-if="getMannaWallet.status == 'success'"
        class="card__wallet-address card__item card__item"
      >
        Balance: {{ balance != null ? balance : "loading..." }}
      </div>
      <div
        v-if="getMannaWallet.status == 'success'"
        class="card__wallet-address card__item card__item"
      >
        Claimable: {{ mannaToClaim ? mannaToClaim : "loading..." }}
      </div>
      <div
        v-if="getMannaWallet.status == 'success' && mannaToClaim == 0"
        class="card__wallet-address card__item card__item"
        style="color: black;"
      >
        Send your old manna to this address to be converted
      </div>

      <Divider v-if="mannaToClaim && mannaToClaim.amount > 0" />

      <div
        @click="convertingManna()"
        v-if="mannaToClaim > 0 && getMannaWallet.status == 'success'"
        class="
            btn-selected
            card-gradient-border card__one card__item card__action-button
          "
        :class="{ 'disable-btn': !$store.state.convertMannaWalletLoading }"
      >
        CONVERT OLD MANNA
        <i
            v-if="!$store.state.convertMannaWalletLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i>
      </div>
      <div v-if="mannaToClaim.amount > 0 && getMannaWallet.status == 'success'">
        <p
          class="card__center card__desc code-msg"
          :class="{
            green: convertMessage == 'successful converted',
            red: convertMessage == 'error converting',
          }"
        >
          {{ convertMessage }}
        </p>
      </div>
   <div class="card__conversion">
    <p class="card__conversion--text">
      Send your old manna 1.0 to this wallet address. It will convert into 
        <a class="card__link card__link--small"
        href="https://medium.com/@hedgeforhumanity/the-second-dawn-of-manna-part-2-b7b9282fe5de"> Manna 2.0 based</a> 
         on the ratio explained here.Please note it may take 1-2 weeks for the transaction to complete.
    </p>
      
    </div>
      <div class="card__item card__need-help">
        <a class="card__link card__link--small" href="https://t.me/Manna_Currency">Need Help?</a>
      </div>
    </div>
  </span>
</template>

<script>
import Divider from "@/components/Divider.vue";
import Swal from "sweetalert2";

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
    convertMannaWallet() {
      this.$store.dispatch("convertMannaWallet", this.getAddress());
    },
    getAddress() {
      window.ethereum.enable();
      return window.ethereum.selectedAddress;
    },
    copyItem(mytext) {
      navigator.clipboard.writeText(mytext);
      this.$swal("Copied!");
      this.$swal.fire({
        position: "bottom",
        icon: "success",
        title: "Copied!",
        showConfirmButton: false,
        timer: 1500,
        width: "15em",
        timerProgressBar: true,
      });
    },
    zeroMannaAlert() {
      Swal.fire({
        title: "<strong>HTML <u>example</u></strong>",
        icon: "info",
        html:
          "You can use <b>bold text</b>, " +
          '<a href="//sweetalert2.github.io">links</a> ' +
          "and other HTML tags",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: "Thumbs down",
      });
    },
  },
  computed: {
    mannaWallet() {
      return this.$store.state.mannaWallet;
    },
    getMannaWallet() {
      return this.$store.state.getMannaWallet;
    },
    convertMessage() {
      return this.$store.state.convertMessage;
    },
    balance() {
      return this.$store.state.balance;
    },
    isLinked() {
      return this.$store.state.isLinked;
    },
    qrCodeSize() {
      return window.innerWidth > 600
        ? window.innerWidth * (10 / 100)
        : window.innerWidth / 3;
    },
  },
  // watch:{
  //   async isBrightIDVerified() {
  //   if (this.isBrightIDVerified) {
  //     await this.$store.dispatch('isLinked')
  //   }
  // }
  // },
  mounted() {
    this.$store.dispatch("getMannaWallet", this.getAddress());
  },
};
</script>
