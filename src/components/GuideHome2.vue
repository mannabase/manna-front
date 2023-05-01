<template>
  <div class="guide-home2">
    <div class="guide-home2__header-text">
      <div class="guide-home2__header-text__one-manna">1 Day = 1 Manna</div>
      <div class="guide-home2__header-text__to-start">
        To start getting 1 Manna per day:
      </div>
    </div>

    <div class="guide-home2__content">
      <div
        @click="state = 0"
        class="guide-home2__content__bright-id-header section-header selected"
      >
        <div class="section-header--background-number-1">
          <div class="section-header--background-number-2">
            <div class="section-header__number">1</div>
          </div>
        </div>
        <div class="section-header--background-text">
          <div class="section-header__text">Get a Verified BrightID</div>
          <div
            :class="{
              'section-header__minus': state == 0,
              'section-header__plus': state != 0,
              'section-header__plus--colored': state > 0,
            }"
          ></div>
        </div>
      </div>
      <div
        @click="state = 1"
        class="guide-home2__content__metamask-header section-header"
        :class="{ selected: state > 0 }"
      >
        <div class="section-header--background-number-1">
          <div class="section-header--background-number-2">
            <div class="section-header__number">2</div>
          </div>
        </div>
        <div class="section-header--background-text">
          <div class="section-header__text">Get a Metamask</div>
          <div
            :class="{
              'section-header__minus': state == 1,
              'section-header__plus': state != 1,
              'section-header__plus--colored': state > 1,
            }"
          ></div>
        </div>
      </div>
      <div
        @click="state = 2"
        class="guide-home2__content__link-header section-header"
        :class="{ selected: state > 1 }"
      >
        <div class="section-header--background-number-1">
          <div class="section-header--background-number-2">
            <div class="section-header__number">3</div>
          </div>
        </div>
        <div class="section-header--background-text">
          <div class="section-header__text">
            Link Your BrightID & Start Claiming
          </div>
          <div
            :class="{
              'section-header__minus': state == 2,
              'section-header__plus': state != 2,
              'section-header__plus--colored': state > 2,
            }"
          ></div>
        </div>
      </div>

      <div
        class="guide-home2__content__bright-id-content"
        :class="{ show: state == 0 }"
      >
        <div
          @click="visitLink('https://www.brightid.org')"
          class="guide-home2__content__bright-id-content__icon"
        >
          <img
            class="guide-home2__content__bright-id-content__icon__bright-id"
            src="../assets/images/image.png"
          />
        </div>
        <div class="guide-home2__content__bright-id-content__text">
          <div class="guide-home2__content__bright-id-content__text__question">
            Why Do I Need a BrightID?
          </div>
          <div
            class="guide-home2__content__bright-id-content__text__question-answer"
          >
            We use BrightID to prove you are unique. That way, every person can
            only claim their fair share of Manna. <br />
            BrightID doesn’t take any personal information and is nonintrusive,
            decentralized, and open-source technology.
          </div>
          <div
            class="guide-home2__content__bright-id-content__text__steps-title"
          >
            Steps:
          </div>
          <div
            class="guide-home2__content__bright-id-content__text__steps steps"
          >
            <div class="steps__step">
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__number"
              >
                1
              </div>
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__text"
              >
                <span
                  class="steps__text__link"
                  @click="visitLink('https://www.brightid.org/')"
                >
                  Download
                </span>
                the BrightID app.
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__number"
              >
                2
              </div>
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__text"
              >
                Go to a
                <span
                  class="steps__text__link"
                  @click="visitLink('https://meet.brightid.org/#/')"
                >
                  BrightID Party
                </span>
                to get “Meets” Verified.
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__number"
              >
                3
              </div>
              <div
                class="guide-home2__content__bright-id-content__text__steps steps__text"
              >
                Get Bitu Verified. You’ll just need to find one or two people
                already Bitu verified and connect.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="guide-home2__content__metamask-content"
        :class="{ show: state == 1 }"
      >
        <div
          @click="connectMetamask()"
          class="guide-home2__content__metamask-content__icon"
        >
          <img
            class="guide-home2__content__metamask-content__icon__metamask"
            src="../assets/images/manna-metamask.svg"
          />
        </div>
        <div class="guide-home2__content__metamask-content__text">
          <div class="guide-home2__content__metamask-content__text__question">
            Why Do I Need a Metamask?
          </div>
          <div
            class="guide-home2__content__metamask-content__text__question-answer"
          >
            Metamask is a digit wallet that connects to your browser or phone.
            It lets you securely hold, send, and receive Manna. You’ll need it
            to interact with Mannabase.com to claim your Manna.
            <br />
            Metamask is non-custodial, meaning Mannabase will never hold your
            funds and you always are in control of your value.
          </div>
          <div
            class="guide-home2__content__metamask-content__text__steps-title"
          >
            Steps:
          </div>
          <div
            class="guide-home2__content__metamask-content__text__steps steps"
          >
            <div class="steps__step">
              <div
                class="guide-home2__content__metamask-content__text__steps steps__number"
              >
                1
              </div>
              <div
                class="guide-home2__content__metamask-content__text__steps steps__text"
              >
                <span
                  class="steps__text__link"
                  @click="visitLink('https://metamask.io/')"
                >
                  Download
                </span>
                Metamask app
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__metamask-content__text__steps steps__number"
              >
                2
              </div>
              <div
                class="guide-home2__content__metamask-content__text__steps steps__text"
              >
                Click "Connect Wallet"
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__metamask-content__text__steps steps__number"
              >
                3
              </div>
              <div
                class="guide-home2__content__metamask-content__text__steps steps__text"
              >
                Click "Connect to IDChain"
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="guide-home2__content__link-content"
        :class="{ show: state == 2 }"
      >
        <div
          @click="
            isBrightIDVerifiedData &&
            (isBrightIDVerifiedData.unique == false ||
              isBrightIDVerifiedData.error)
              ? visitLink(
                  'brightid://link-verification/Manna/' + selectedAddress
                )
              : visitLink(
                  'https://brightid.gitbook.io/brightid/getting-verified'
                )
          "
          class="guide-home2__content__link-content__icon"
        >
          <div
            v-if="
              isBrightIDVerifiedData &&
                (isBrightIDVerifiedData.unique == false ||
                  isBrightIDVerifiedData.error)
            "
            class="guide-home2__content__link-content__icon__barcode"
          >
            <qrcode-vue
            :value="
              'brightid://link-verification/http:%2f%2fnode.brightid.org/idchain/' +
                getAddress()
            "
              :size="qrCodeSize"
              level="H"
            ></qrcode-vue>
          </div>
          <img
            v-else
            class="guide-home2__content__metamask-content__icon__logo"
            src="@/assets/images/Asset 3.svg"
          />
        </div>
        <div class="guide-home2__content__link-content__text">
          <div
            class="guide-home2__content__link-content__text__question-answer"
          >
            Now we just need to connect your Metamask to BrightID and
            Mannabase.com.
          </div>
          <div class="guide-home2__content__link-content__text__steps-title">
            Steps:
          </div>
          <div class="guide-home2__content__link-content__text__steps steps">
            <div class="steps__step">
              <div
                class="guide-home2__content__link-content__text__steps steps__number"
              >
                1
              </div>
              <div
                class="guide-home2__content__link-content__text__steps steps__text"
              >
                Open your BrightID app and click "scan a code" then scan this QR
                code.
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__link-content__text__steps steps__number"
              >
                2
              </div>
              <div
                class="guide-home2__content__link-content__text__steps steps__text"
              >
                Once done, a "verify" button will appear on Mannabase.com. Click
                this and verify using your Metamask.
              </div>
            </div>
            <div class="steps__step">
              <div
                class="guide-home2__content__link-content__text__steps steps__number"
              >
                3
              </div>
              <div
                class="guide-home2__content__link-content__text__steps steps__text"
              >
                Click the Claim Manna button. You’ll need to claim your Manna
                every 7 days or sooner. Otherwise, it will cap out at 7.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideHome2",
  data() {
    return {
      state: 0,
    };
  },
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
    qrCodeSize() {
      return window.innerWidth > 600
        ? window.innerWidth * (10 / 100)
        : window.innerWidth / 3;
    },
  },
};
</script>
