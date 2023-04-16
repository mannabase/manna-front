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
          @click="checkBrightIDVerification()"
        >
        verify connection
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
      style="font-size: small;"
      >
      <!-- {{ mannaWallet }} -->

        <i>
          {{ mannaWallet }}
        </i>
        <i class="fa fa-regular fa-copy"></i>
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
          @click="convertingManna()"
          v-if="mannaToClaim == 0 && mannaWallet"
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
        v-if="mannaToClaim == 0 && mannaWallet"
    >
      <p
        class="card__center card__desc code-msg"
        :class="{ green: convertStatus() == 'success',  red: convertStatus() == 'error' }"
      >
        {{ convertMessage() }}

      
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
          position: 'bottom',
          icon: 'success',
          title: 'Copied!',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          })
    },
    async checkBrightIDVerification(){
      console.log('checkBright-sawl')
      console.log('this.isLinked: ',this.isLinked)
      console.log('this.$store.state.isLinked: ',this.$store.state.isLinked)
      this.$store.dispatch("isLinked", this.selectedAddress);
      
      if (this.isLinked.status == 'SUCCESSFUL') {
        this.$swal('you are verified !');
        this.$swal.fire({
          position: 'bottom',
          icon: 'success',
          title: 'you are verified !',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          }) 
      } else if(this.isLinked.status == 'NOT_LINKED') {
        console.log('you are not linked !')
        this.$swal('Copied!');
        this.$swal.fire({
          position: 'bottom',
          icon: 'error',
          title: 'you are not linked !',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          })
      } else if (this.isLinked.status == 'NOT_VERIFIED') {
        this.$swal('you are not verified !');
        this.$swal.fire({
          position: 'bottom',
          icon: 'error',
          title: 'you are not verified !',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          }) 
      } else if (this.isLinked.status == 'TRANSFERRED') {
        this.$swal('you are transferd !');
        this.$swal.fire({
          position: 'bottom',
          icon: 'error',
          title: 'you are transferd !',
          showConfirmButton: false,
          timer: 1500,
          width: '15em',
          timerProgressBar:true
          }) 
      }
    }
    },
    computed: {
      mannaWallet() {
        return this.$store.state.mannaWallet;
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
      if (this.$store.state.mannaWallet == null) {
        this.$store.dispatch("mannaWallet", this.getAddress());
      }
    },
  };
  </script>