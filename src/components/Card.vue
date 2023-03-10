<template>
  <div class="card">
    <!-- <div v-if="selectedUser == 'old'" class="card__header card__item">
      I'm an ...
    </div>
    <div v-else class="card__header card__item">I'm a ...</div> -->
    <!-- <div class="card__item card__buttons">
      <div
        v-for="user in userType"
        :key="user.key"
        class="btn gradient-border card__two"
        :class="{ 'btn-selected': selectedUser == user.key }"
        @click="changeUser(user.key)"
      >
        {{ user.title }}
      </div>
    </div> -->
    <div v-if="selectedUser == 'old'" class="card__center">
      <div>
        <!-- <img
          class="card__arrow card__item"
          src="../assets/images/arrow.png"
          alt=""
        /> -->
      </div>
      <div class="card__header card__item">My Manna is stored on:</div>
      <div class="card__buttons card__item">
        <div
          v-for="store in storeType"
          :key="store.key"
          class="btn gradient-border card__three"
          :class="{ 'btn-selected': selectedStore == store.key }"
          @click="changeStore(store.key)"
        >
          {{ store.title }}
        </div>
      </div>
      <div v-if="selectedStore == 'manabase'" class="card__center">
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div class="card__header card__item card__item--with-link">
          Link My Metamask:
        </div>
        <div>
          <a class="card__link" href="https://metamask.io/">Don't have one?</a>
        </div>
        <div
          @click="ConnectMetamask()"
          class="btn-gradient gradient-border card__one card__item card__action-button"
          :class="{ 'disable-btn': $store.state.email }"
        >
          CONNECT
          <i
            v-if="$store.state.connectLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i>
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          v-if="!(isLinked && isLinked.state != 'not linked')"
          class="card__header card__item card__item--with-link"
        >
          Link My BrightID:
        </div>
        <div v-if="!(isLinked && isLinked.state != 'not linked')">
          <a class="card__link" href="https://www.brightid.org "
            >Don't have one?</a
          >
        </div>
        <div
          v-if="isLinked && isLinked.state == 'not linked'"
          class="gradient-border card__barcode card__item"
        >
          <qrcode-vue :value="isLinked.link" :size="140" level="H"></qrcode-vue>
        </div>
        <div
          v-if="isLinked && isLinked.state == 'not linked'"
          class="card__header card__item card__item--with-link"
        >
          Click
          <span
            v-if="isLinked && isLinked.state == 'not linked'"
            class="card__link--big"
            @click="handleIsLinked()"
          >
            HERE
          </span>
          once connected
        </div>

        <div
          v-if="isLinked && isLinked.state != 'not linked'"
          class="card__center card__desc"
        >
          {{ isLinked.msg }}
        </div>
        <div v-if="isLinked && isLinked.state == 'successful'">
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          v-if="isLinked && isLinked.state == 'successful'"
          class="card__header card__item"
        >
          Confirm Email
        </div>
        <div
          v-if="isLinked && isLinked.state == 'successful'"
          class="gradient-border card__item"
        >
          <input
            class="card__input card__one"
            placeholder="Enter Mannabase email..."
            type="email"
            v-model="email"
            :disabled="$store.state.email"
          />
        </div>
        <div
          class="btn-gradient gradient-border card__one card__item card__action-button"
        >
          SEND EMAIL
        </div>
        <div
          v-if="
            isLinked &&
            isLinked.state == 'successful' &&
            $store.state.emailSecret
          "
          class="gradient-border card__item"
        >
          <input
            class="card__input card__one"
            placeholder="Enter 6-digit code from email..."
            type="number"
            v-model="code"
            :disabled="$store.state.sendCodeState == 'successful'"
          />
        </div>
        <div
          v-if="
            isLinked &&
            isLinked.state == 'successful' &&
            $store.state.email &&
            $store.state.emailSecret
          "
          class="btn-gradient gradient-border card__one card__item card__action-button"
          :class="{ 'disable-btn': $store.state.sendCodeState == 'successful' }"
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
            isLinked && isLinked.state == 'successful' && !$store.state.email
          "
          class="btn-gradient gradient-border card__one card__item card__action-button"
          @click="sendEmail()"
        >
          SEND EMAIL
          <i
            v-if="$store.state.submitEmailLoading"
            class="fa fa-circle-o-notch fa-spin loader"
          ></i>
        </div>
        <div v-if="$store.state.sendCodeState">
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div v-if="$store.state.sendCodeState">
          <p
            class="card__center card__desc code-msg"
            :class="{ green: $store.state.txLink, red: !$store.state.txLink }"
          >
            {{ $store.state.sendCodeMsg }}
            <a
              v-if="$store.state.sendCodeState == 'successful'"
              class="green"
              :href="$store.state.txLink"
              >{{ $store.state.txLink }}</a
            >
          </p>
        </div>
        <div
          v-if="
            isLinked && isLinked.state == 'successful' && $store.state.email
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
        <div v-if="isLinked && isLinked.state == 'successful'">
          <a class="card__link card__item" href="">Need Help?</a>
        </div>
      </div>
      <div v-if="selectedStore == 'exchange'" class="card__center">
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div>Link Verified BrightID:</div>
        <div>
          <a class="card__link" href="https://metamask.io/">Don't have one?</a>
        </div>
        <div class="qrcode">
          <img src="../assets/images/qrcode.png" alt="" class="qrcode_img" />
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >CONNECT METAMASK</a
          >
        </div>
        <div>
          <a class="card__link" href="https://metamask.io/">Don't have one?</a>
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__one card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >GENERATE PAPER WALLET</a
          >
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div>
          <h3 class="gray-text">Send Manna To Paper Wallet</h3>
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__one card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >CONVERT YOUR KEY</a
          >
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div>
          <h3 class="gray-text">Imoort Key To Metamask</h3>
        </div>
        <div>
          <div>
            <a class="card__link" href="https://metamask.io/">need help?</a>
          </div>
        </div>
      </div>
      <div v-if="selectedStore == 'wallet'" class="card__center">
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div>Link Verified BrightID:</div>
        <div>
          <a class="card__link" href="https://metamask.io/">Don't have one?</a>
        </div>
        <div class="qrcode">
          <img src="../assets/images/qrcode.png" alt="" rounded />
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >CONNECT METAMASK</a
          >
        </div>
        <div>
          <a class="card__link" href="https://metamask.io/">Don't have one?</a>
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__one card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >GENERATE PAPER WALLET</a
          >
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div>
          <h3>Send Manna To Paper Wallet</h3>
        </div>
        <div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
        <div
          class="btn-gradient gradient-border card__email-btn card__one card__item card__action-button"
        >
          <a class="white-text" href="mailto:info@hedgeforhumanity.org"
            >CONVERT YOUR KEY</a
          >
        </div>
        <div>Import Key To Metamask</div>
        <div>
          <div>
            <a class="card__link" href="https://metamask.io/">need help?</a>
          </div>
          <img
            class="card__arrow card__item"
            src="../assets/images/arrow.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div v-else class="card__center card__desc">
      Mannabase is currently not signing up new users until<br />we complete
      ours transition to Manna 2.0. Please<br />join our email newsletter or
      follow us on<br />
      social media for further updates.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: "old",
      selectedStore: "manabase",
      userType: [
        {
          title: "New User",
          key: "new",
        },
        {
          title: "Old User",
          key: "old",
        },
      ],
      storeType: [
        {
          title: "Mannabase.com",
          key: "manabase",
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
    };
  },
  methods: {
    changeUser(key) {
      this.selectedUser = key;
    },
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
    isLinked() {
      return this.$store.state.isLinked;
    },
  },
};
</script>
