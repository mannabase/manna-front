<template>
  <div class="card__center">
    <div v-if="$store.state.isLinkedFooterLoading">
      <i class="fa fa-circle-o-notch fa-spin loader"></i>
      Loading...
    </div>
    <div v-else class="card__center">
      <Divider />
      <div
        v-if="!selectedAddress"
        @click="ConnectMetamask()"
        class="
        btn-selected
        card-gradient-border card__one card__item card__action-button
      "
        :class="{ 'disable-btn': $store.state.email }"
      >
        CONNECT METAMASK
        <i
          v-if="$store.state.connectLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <div
        v-else
        class="
        btn-selected
        card-gradient-border card__one card__item card__action-button
        address
      "
      >
        {{ getAddress().slice(0, 7) + "...." + getAddress().slice(-4) }}
        <!-- {{ this.hasTakenResult.message }} -->
        <i
          v-if="$store.state.connectLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <div
        v-if="
          hasTaken &&
            hasTakenResult.message != 'Email is not set' &&
            hasTakenResult.status == 'success'
        "
        class="card__center card__desc"
      >
        You have taken your manna version 1
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            mannaToClaim.value > 0 &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
        class="
        btn-selected
        card-gradient-border card__one card__item card__action-button
      "
        @click="claimManna()"
      >
        Claim
        <i
          v-if="$store.state.claimLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <!--  -->
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
        class="card__center card__desc"
      >
        <div
          v-if="isLinked.status == 'NOT_LINKED'"
          @click="visitLink(isLinked.link)"
          class="gradient-border card__barcode card__item"
        >
          <qrcode-vue
            @click.native="visitLink(isLinked.link)"
            :value="isLinked.link"
            :size="112"
            level="H"
          ></qrcode-vue>
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
        Scan this QR-code with your verified BrightID
      </div>
      <Divider
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' || hasTakenResult.value > 0)
        "
      />
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
        class="card__center card__desc"
      >
        {{ isLinked.msg }}
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0 )
        "
        class="card-gradient-border card__item"
      >
        <input
          class="card__input card__one"
          placeholder="Enter Mannabase Email..."
          type="email"
          v-model="email"
          :disabled="$store.state.email"
        />
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            $store.state.emailSecret &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0 )
        "
        class="card-gradient-border card__item"
      >
        <input
          class="card__input card__one"
          placeholder="Enter 6-digit code from email..."
          type="number"
          v-model="code"
          :disabled="$store.state.sendCodeMsg == 'SUCCESSFUL'"
        />
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            $store.state.email &&
            $store.state.emailSecret &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
        class="
        btn-selected
        card-gradient-border card__one card__item card__action-button
      "
        :class="{ 'disable-btn': $store.state.sendCodeMsg == 'SUCCESSFUL' }"
        @click="submitCode()"
      >
        SUBMIT
        <i
          v-if="$store.state.submitCodeLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            !$store.state.email &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0 ||
              hasTakenResult.message == 'Email is not set')
        "
        class="
        btn-selected
        card-gradient-border card__one card__item card__action-button
      "
        @click="sendEmail()"
      >
        SEND EMAIL
        <i
          v-if="$store.state.submitEmailLoading"
          class="fa fa-circle-o-notch fa-spin loader"
        ></i>
      </div>
      <Divider
        v-if="
          $store.state.sendCodeMsg &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
      />
      <div
        v-if="
          $store.state.sendCodeMsg &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
      >
        <div
          class="card__center card__desc code-msg"
          :class="{ green: $store.state.txLink, red: !$store.state.txLink }"
        >
          <h3 v-if="$store.state.sendCodeState == 'success'" class="green">
            Successfully calimed :{{ $store.state.claimed }} Manna
          </h3>
          <p v-if="$store.state.sendCodeState == 'success'" class="green">
            Transaction link:
          </p>
          <a
            v-if="$store.state.sendCodeState == 'success'"
            class="green"
            :href="$store.state.txLink"
            >{{ $store.state.txLink }}
          </a>
        </div>
      </div>
      <div
        v-if="
          isLinked &&
            isLinked.status == 'SUCCESSFUL' &&
            $store.state.email &&
            // !hasTaken &&
            (hasTakenResult.message == 'Email is not set' ||
              hasTakenResult.value > 0)
        "
      >
        <div
          class="card__link card__link--big card__item"
          href=""
          @click="handleChangeEmail()"
        >
          Change Email
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "./Divider.vue";

export default {
  name: "Mannabase2",
  components: {
    Divider,
  },
  data() {
    return {
      interval: null,
      email: "",
      code: "",
      // isLinked: false,
    };
  },

  methods: {
    changeStore(key) {
      this.selectedStore = key;
    },
    hasTaken() {
      if (this.$store.state.hasTakenResult) {
        if (this.$store.state.hasTakenResult.status == "error") {
          return true;
        }
      }
      return false;
    },
    isMetamaskConnected() {
      return window.ethereum.selectedAddress != null;
    },
    getAddress() {
      window.ethereum.enable();
      return window.ethereum.selectedAddress;
    },
    ConnectMetamask() {
      console.log("salam");
      if (!this.$store.state.email) {
        let connectMetamaskEnable = window.ethereum.enable();

        if (this.isMetamaskConnected()) {
          this.$store.dispatch("isLinked", this.getAddress());
        } else {
          if (this.interval == null) {
            this.interval = setInterval(() => {
              if (this.isMetamaskConnected()) {
                this.$store.dispatch("isLinked", this.getAddress());
                clearInterval(this.interval);
                this.interval = null;
              }
            }, 500);
          }
        }

        return connectMetamaskEnable;
      }
    },
    sendEmail() {
      if (this.email.length > 0) {
        this.$store.dispatch("submitEmail", {
          mailAddress: this.email,
          walletAddress: this.getAddress(),
        });
      }
    },
    submitCode() {
      if (this.$store.state.sendCodeMsg != "SUCCESSFUL") {
        if (this.code.length > 0) {
          console.log(
            "not successful-codeLength",
            this.$store.state.emailSecret,
            this.code
          );
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
    ConnectMetamask2() {
      this.$ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          this.selectedAddress = accounts[0];
          console.log(this.selectedAddress + " this.selectedAddress");
        })
        .catch((error) => {
          console.error(error + "this.selectedAddress");
        });
    },
  },
  created() {
    const hasTakenResult = window.localStorage.getItem("hasTakenResult");
    console.log(hasTakenResult + " hasTakenResult");
    this.$store.dispatch("hasTaken", this.getAddress());
  },
  computed: {
    handleChangeEmaill() {
      return "this.$store.state.email" + this.$store.state.email;
    },

    hasTakenResult() {
      return this.$store.state.hasTakenResult;
    },
    qrCodeSize() {
      return window.innerWidth > 600
        ? window.innerWidth * (8 / 100)
        : window.innerWidth * (28 / 100);
    },
    isLinked() {
      return this.$store.state.isLinked;
    },
  },
  // watch: {
  //   isLinked: {
  //     handler(newVal) {
  //       // Check if conditions are met and set email accordingly
  //       if (newVal.status === 'SUCCESSFUL' && this.hasTakenResult.message === 'Email is not set') {
  //         this.email = ''; // Clear the email input field
  //       }
  //     },
  //     immediate: true, // Trigger the handler immediately on component mount
  //   },
  //   hasTakenResult: {
  //     handler(newVal) {
  //       // Check if conditions are met and set email accordingly
  //       if (this.isLinked.status === 'SUCCESSFUL' && newVal.message === 'Email is not set') {
  //         this.email = ''; // Clear the email input field
  //       }
  //     },
  //     immediate: true, // Trigger the handler immediately on component mount
  //   },
  // },
  mounted() {
    this.$store.dispatch("getMannaToClaim", this.getAddress());
    this.$store.dispatch("hasTaken", this.getAddress());
    this.ConnectMetamask2();
    this.hasTaken(); 
    console.log("mounted");
  },
};
</script>

<style></style>
