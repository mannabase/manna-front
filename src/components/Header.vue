<template>
  <header class="header">
    <div class="header__left">
      <div @click="$store.commit('setGuidePage', true)" class="header__logo">
        <img
          class="header__logo__image"
          src="@/assets/images/logo.png"
          alt=""
        />
        <h2 class="header__logo__name">mannabase</h2>
      </div>
      <div
        v-if="
          isLinked &&
          mannaBalance != null
        "
        class="header__manna-amount"
        @click="addMannaTokenToWallet()"
      >
        <div class="header__manna-amount__button">
          <div class="gradient-border btn btn-back-orange address">
            {{ parseFloat(mannaBalance).toFixed(2) + " Manna" }}
          </div>
        </div>
      </div>
    </div>

    <div class="header__buttons">
      <div
        v-if="
          $store.state.contractData.isVerified == false &&
          isBrightIDVerifiedUnique &&
          isIDChain
        "
        class="header__buttons__claim"
      >
        <div @click="verifyMe()" class="header__buttons__claim__button">
          <div
            class="gradient-border btn btn-back-orange"
            :class="{ 'disable-btn': $store.state.verifyMeLoading }"
          >
            Verify
            <i
              v-if="$store.state.verifyMeLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
      </div>
      <div
        v-if="
          $store.state.contractData.isVerified &&
          $store.state.contractData.isRegistered == false &&
          isBrightIDVerifiedUnique &&
          isIDChain
        "
        class="header__buttons__claim"
      >
        <div @click="registerMe()" class="header__buttons__claim__button">
          <div
            class="gradient-border btn btn-back-orange"
            :class="{ 'disable-btn': $store.state.registerMeLoading }"
          >
            Register
            <i
              v-if="$store.state.registerMeLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
      </div>
      <div
        v-if="
          $store.state.contractData.isVerified &&
          $store.state.contractData.isRegistered &&
          $store.state.contractData.toClaim &&
          isIDChain
        "
        class="header__buttons__claim"
      >
        <span> Claim: </span>
        <div @click="claimManna()" class="header__buttons__claim__button">
          <div
            class="gradient-border btn btn-back-orange"
            :class="{
              'disable-btn':
                $store.state.claimLoading ||
                parseInt($store.state.contractData.toClaim._hex, 16) == '0',
            }"
          >
            {{
              parseInt($store.state.contractData.toClaim._hex, 16) + " Manna"
            }}
            <i
              v-if="$store.state.claimLoading"
              class="fa fa-circle-o-notch fa-spin loader"
            ></i>
          </div>
        </div>
      </div>
      <span
      class="header__buttons__connect-wallet"
      >
      <div
          v-if="!selectedAddress"
          @click="goToMannaOne()"
          class="gradient-border btn  bold-text"
        >
        Claim Manna 1.0
        </div>
      </span>
      <span class="header__buttons__connect-wallet">
        <div
          v-if="!selectedAddress"
          @click="ConnectMetamask()"
          class="gradient-border btn btn-back-orange bold-text"
        >
          CONNECT WALLET
        </div>
        <div
          v-else-if="$store.state.chainId && $store.state.chainId != '0x4a'"
          @click="changeToIDChain()"
          class="gradient-border btn btn-back-red bold-text"
        >
          CONNECT IDChain
        </div>
        <div
          v-else-if="getAddress()"
          class="gradient-border btn btn-back-orange bold-text address"
        >
          {{ getAddress().slice(0, 6) + "...." + getAddress().slice(-4) }}
        </div>
      </span>
      
    </div>

    <div class="header__hamburger" @click="showNavLinks = !showNavLinks">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div v-if="showNavLinks" class="header__hamburger-links">
      <p @click="goToMannaOne()">Claim Manna 1.0</p>
      <p @click="visitLink('https://www.hedgeforhumanity.org/manna/')">About</p>
      <p @click="visitLink('https://medium.com/@hedgeforhumanity')">Medium</p>
      <p @click="visitLink('https://discord.gg/HjHBYkfSfJ')">Discord</p>
      <p @click="visitLink('https://t.me/Manna_Currency')">Telegram</p>
    </div>

    <div @click="$store.commit('setGuidePage', true)" class="header__center-logo">
      <img
        src="@/assets/images/logo.png"
        alt=""
        class="header__center-logo__image"
      />
      <h1 class="header__center-logo__name">manna</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showNavLinks: false,
    };
  },
  methods: {
    goToMannaOne() {
      this.$store.commit("setGuidePage", false);
      this.showNavLinks = false;
    },
  },
};
</script>
