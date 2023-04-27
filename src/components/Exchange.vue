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
            :class="{ 'disable-btn': $store.state.alertLoading}"
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
        <qrcode-vue
          :value="isLinked.link"
          :size="112"
          level="H"
        ></qrcode-vue>
        </div>
        <div
          v-if="isLinked && isLinked.status == 'NOT_LINKED'"
          class="btn-selected
            card-gradient-border card__one card__item card__action-button"
            :class="{ 'disable-btn': $store.state.alertLoading}"
          @click="checkBrightIDVerification()"
        >
        verify connection
        <i
            v-if="$store.state.alertLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i>
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
        <Divider v-if="getMannaWallet == 'No Manna wallet' && isLinked && isLinked.status == 'SUCCESSFUL'"/>
        <div
          @click="generateMannaWallet()"
          v-if="getMannaWallet == 'No Manna wallet' && isLinked && isLinked.status == 'SUCCESSFUL'"
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
      <!-- {{ mannaWallet }} -->

        <i>
          {{ getMannaWallet.mannaWallet }}
        </i>
        <!-- <i class="fa fa-regular fa-copy" style="margin-left: 3px;"></i> -->
        <i @click="copyItem(getMannaWallet.mannaWallet)" class="card__link card__link--small" style="margin-left: 2px;" >copy</i>

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
  
        <div v-if="getMannaWallet.status == 'success'" class="card__wallet-address card__item card__item">
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
        <div v-if="getMannaWallet.status == 'success'" class="card__wallet-address card__item card__item">
          Claimable: {{ mannaToClaim ? mannaToClaim : 'loading...' }}
          <!-- Claimable: {{ mannaToClaim }} -->
        </div>
        <div v-if="getMannaWallet.status == 'success' && mannaToClaim == 0 " class="card__wallet-address card__item card__item" style="color: red;">
          Send your old manna to this address to be converted
        </div>
        <!-- <div v-if="mannaWallet && mannaToClaim == 0">
          
              this.zeroMannaAlert();
            
          </div> -->

  
        <Divider v-if="mannaToClaim && mannaToClaim.amount > 0" />
  
        <div
          @click="convertingManna()"
          v-if="mannaToClaim > 0  && getMannaWallet.status == 'success'"
          class="
            btn-selected
            card-gradient-border card__one card__item card__action-button
          "
          :class="{ 'disable-btn': !$store.state.convertMannaWalletLoading  }"
        >
          CONVERT OLD MANNA
          <!-- <i
            v-if="!$store.state.convertMannaWalletLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i> -->
        </div>
        <div
        v-if="mannaToClaim.amount > 0 && getMannaWallet.status == 'success'"
    >
      <p
        class="card__center card__desc code-msg"
        :class="{ green: convertMessage == 'success',  red: convertMessage == 'error' }"
      >
        {{convertMessage}}

      
      </p>
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
  
        <!-- <div
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
        </div> -->
  
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
  import Swal from 'sweetalert2';
  // import Store from "../store";

  
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
      getAddress() {
      window.ethereum.enable();
      return window.ethereum.selectedAddress;
    },
      copyItem(mytext) {
      navigator.clipboard.writeText(mytext)
      this.$swal('Copied!');
      this.$swal.fire({
          position: 'bottom',
          icon: 'success',
          title: 'Copied!',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          })
    },
    zeroMannaAlert(){
      Swal.fire({
  title: '<strong>HTML <u>example</u></strong>',
  icon: 'info',
  html:
    'You can use <b>bold text</b>, ' +
    '<a href="//sweetalert2.github.io">links</a> ' +
    'and other HTML tags',
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  confirmButtonAriaLabel: 'Thumbs up, great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>',
  cancelButtonAriaLabel: 'Thumbs down'
})
    }
    },
    computed: {
      // mannaWallet() {
      //   return this.$store.state.mannaWallet;
      // },
      getMannaWallet() {
        return this.$store.state.getMannaWallet;
      },
      convertMessage() {
        return this.$store.state.convertMessage;
      },
      convertStatus() {
        return this.$store.state.convertStatus;
      },
      balance() {
        return this.$store.state.balance;
      },
      isLinked(){
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
      // if (this.$store.state.mannaWallet == null) {
      //   this.$store.dispatch("mannaWallet", this.getAddress());
      // }
      if (this.$store.state.getMannaWallet == null) {
        this.$store.dispatch("getMannaWallet", this.getAddress());
      }
    },
  };
  </script>