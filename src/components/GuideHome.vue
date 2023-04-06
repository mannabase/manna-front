<template>
  <div class="guide-home">
    <div
      v-if="isBrightIDVerifiedData && isBrightIDVerifiedData.unique"
      class="guide-home__connected"
    >
      <div class="guide-home__connected__app-center-massage">
        App Center Coming Soon...
      </div>
      <!-- <div class="guide-home__connected__learn-more">Learn more</div> -->
    </div>

    <div v-else class="guide-home__top">
      <div class="guide-home__top__field">
        <div
          @click="visitLink('https://www.brightid.org')"
          class="guide-home__top__field__icon"
        >
          <img
            class="guide-home__top__field__icon__brightID"
            src="../assets/images/brightID-guide.svg"
          />
        </div>
        <pre
          @click="visitLink('https://www.brightid.org')"
          class="guide-home__top__field__text"
        >
Get a Verified BrightID</pre
        >
      </div>
      <div class="guide-home__top__field">
        <div class="guide-home__top__field__icon" @click="connectMetamask()">
          <img
            class="guide-home__top__field__icon__metamask"
            src="../assets/images/metamask-guide.svg"
          />
        </div>
        <p @click="connectMetamask()" class="guide-home__top__field__text">
          Get Metamask & Connect
          <span class="mobile-break"> <br /> </span> Wallet
        </p>
      </div>
      <div class="guide-home__top__field">
        <div
          @click="
            isBrightIDVerifiedData &&
              (isBrightIDVerifiedData.unique == false ||
                isBrightIDVerifiedData.error)
              ? visitLink('brightid://link-verification/Manna/' + selectedAddress)
              : visitLink(
                  'https://brightid.gitbook.io/brightid/getting-verified'
                )
          "
          class="guide-home__top__field__icon"
        >
          <div
            v-if="
              isBrightIDVerifiedData &&
              (isBrightIDVerifiedData.unique == false ||
                isBrightIDVerifiedData.error)
            "
            class="gradient-border guide-home__barcode"
          >
            <qrcode-vue
              :value="'brightid://link-verification/Manna/' + selectedAddress"
              :size="120"
              level="H"
            ></qrcode-vue>
          </div>
          <img
            v-else
            class="guide-home__top__field__icon__logo"
            src="@/assets/images/logo.png"
          />
        </div>
        <!-- <p
          v-if="isLinked && isLinked.status == 'transferred'"
          class="guide-home__top__field__text"
        >
          This BrightID account is linked to {{ isLinked.address }} <br />
          Please use this address or try to use a new address
        </p> -->
        <pre
          v-if="showVerifyBrightIDQRCode"
          class="guide-home__top__field__text"
        >
Scan Your Verified BrightID</pre
        >
        <!-- <pre
          @click="visitLink(isLinked.link)"
          v-else-if="isLinked && isLinked.status == 'NOT_LINKED'"
          class="guide-home__top__field__text"
        >
Connect to Mannabase & IDChain</pre
        > -->
        <pre v-else class="guide-home__top__field__text">
Connect to Mannabase</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideHome",
  methods: {
    connectMetamask() {
      if (window.ethereum) {
        this.ConnectMetamask();
      } else {
        this.visitLink("https://metamask.io/");
      }
    },
  },
  computed: {
    showVerifyBrightIDQRCode() {
      return (
        this.isBrightIDVerifiedData &&
        (this.isBrightIDVerifiedData.unique == false ||
          this.isBrightIDVerifiedData.error)
      );
    },
  },
};
</script>