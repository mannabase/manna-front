import Vue from "vue";
import Vuex from "vuex";
import mixin from "../mixin";
import Swal from "sweetalert2";

// import checkBrightIDVerificationAlert from "../mixin";
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(Vuex);
// Vue.use(VueSweetalert2);

export default new Vuex.Store({
  state: {
    isLoading: false,
    claimLoading: false,
    connectLoading: false,
    verifyMeLoading: false,
    registerMeLoading: false,
    submitCodeLoading: false,
    submitEmailLoading: false,
    alertLoading: false,
    generateMannaWalletLoading: false,
    convertMannaWalletLoading: true,
    isLinkedFooterLoading: false,

    haveMetamask: null,
    isMetamaskConnected: null,
    isLinked: null,

    email: null,
    emailSecret: null,

    sendCodeState: null,
    sendCodeMsg: null,
    txHash: null,
    txLink: null,

    guidePage: true,

    retryRequest: 0,

    mannaToClaim: null,
    mannaBalance: null,

    hasTakenResult: null,
    mannaWallet: null,
    getMannaWallet: null,

    selectedAddress: null,
    providerState: null,
    providers: [],

    networkId: 0,
    coinbase: null,
    balance: null,
    chainId: null,
    personalSignResult: null,
    personalSignVerify: null,

    timeStamp: null,
    signiture: null,
    convertMessage: null,
    convertStatus: null,

    contractData: {
      isVerified: null,
      isRegistered: null,
      toClaim: 0,
    },
    mannaContract: null,
    claimMannaContract: null,
    mannaBrightIDContract: null,
    signer: null,
    provider: null,

    isBrightIDVerifiedData: null,
    testurl: "https://mannatest.hedgeforhumanity.org/",
  },
  mutations: {
    setMannaContract(state, payload) {
      state.mannaContract = payload;
    },
    setClaimMannaContract(state, payload) {
      state.claimMannaContract = payload;
    },
    setMannaBrightIDContract(state, payload) {
      state.mannaBrightIDContract = payload;
    },
    setProvider(state, payload) {
      state.provider = payload;
    },
    setSigner(state, payload) {
      state.signer = payload;
    },
    setHaveMetamask(state, payload) {
      state.haveMetamask = payload;
    },
    setIsMetamaskConnected(state, payload) {
      state.isMetamaskConnected = payload;
    },
    setIsLinked(state, payload) {
      state.isLinked = payload;
    },
    setEmailSecret(state, payload) {
      state.emailSecret = payload.secret;
    },
    setSubmitCodeResult(state, payload) {
      if (payload.status == "SUCCESSFUL") {
        state.sendCodeState = payload.status;
        state.sendCodeMsg = payload.message;
        state.txHash = payload.txHash;
        state.txLink = payload.txLink;
        state.mannaBalance = {
          balance: payload.balance,
          msg: "SUCCESSFUL",
          status: "SUCCESSFUL",
        };
      } else {
        state.sendCodeState = payload.status;
        state.sendCodeMsg = payload.message;
        state.txHash = null;
        state.txLink = null;
        console.log("setSubmitCodeResult", payload.message, payload.status);
      }
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setGuidePage(state, payload) {
      state.guidePage = payload;
    },
    setMannaBalance(state, payload) {
      state.mannaBalance = payload;
    },
    setNewMannaBalance(state, payload) {
      state.mannaBalance.balance = payload;
    },
    setNewMannaToClaim(state, payload) {
      state.mannaToClaim.amount = payload;
    },
    setHasTakenResult(state, payload) {
      state.hasTakenResult = payload;
    },
    setMannaWallet(state, payload) {
      state.mannaWallet = payload;
    },
    setGetMannaWallet(state, payload) {
      state.getMannaWallet = payload;
    },
    setConvertMessage(state, payload) {
      state.convertMessage = payload;
    },
    setConvertStatus(state, payload) {
      state.convertStatus = payload;
    },
    setSelectedAddress(state, payload) {
      state.selectedAddress = payload;
    },
    setTimeStamp(state, payload) {
      state.timeStamp = payload;
    },
    setSigniture(state, payload) {
      state.signiture = payload;
    },
    setProviderState(state, payload) {
      state.providerState = payload;
    },
    addProviders(state, payload) {
      state.providers.push(payload);
    },
    setNetworkId(state, payload) {
      state.networkId = payload;
    },
    setCoinbase(state, payload) {
      state.coinbase = payload;
    },
    setBalance(state, payload) {
      state.balance = payload;
    },
    setChainId(state, payload) {
      state.chainId = payload;
    },
    setMannaToClaim(state, payload) {
      state.mannaToClaim = payload;
    },
    setIsLinkedStatus(state) {
      if (state.isLinked) {
        if (state.isLinked.status == "not taken") {
          state.isLinked.status = "error";
        }
      }
    },
    resetStore(state) {
      state.isLinked = null;
      state.guidePage = true;
      state.retryRequest = 0;
      state.mannaToClaim = null;
      state.mannaBalance = null;
      state.hasTakenResult = null;
      state.mannaWallet = null;
      state.balance = 0;
      state.signer = null;
      state.mannaContract = null;
      state.claimMannaContract = null;
      state.mannaBrightIDContract = null;
      state.provider = null;
      state.contractData = {
        isVerified: null,
        isRegistered: null,
        toClaim: 0,
      };
      state.isBrightIDVerifiedData = null;
    },
    setContractIsVerified(state, payload) {
      state.contractData.isVerified = payload;
    },
    setContractIsRegistered(state, payload) {
      state.contractData.isRegistered = payload;
    },
    setContractToClaim(state, payload) {
      state.contractData.toClaim = payload;
    },
    setIsBrightIDVerifiedData(state, payload) {
      state.isBrightIDVerifiedData = payload;
    },
  },
  actions: {
    isLinked: (context, payload) => {
      // console.log(this.store.state.testurl)
      context.state.connectLoading = true;
      context.state.isLinkedFooterLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/brightId/isLinked/" +
            payload,
        })
        .then((res) => {
          context.state.connectLoading = false;
          context.state.isLinkedFooterLoading = false;
          context.commit("setIsLinked", res.data);
          if (res.data.status == "SUCCESSFUL") {
            context.dispatch("getMannaBalance", context.state.selectedAddress);
          } else {
            console.log("isLinked-status: " + res.data.status);
          }
        })
        .catch((e) => {
          console.error("isLinked false");
          context.state.connectLoading = false;
          context.state.isLinkedFooterLoading = false;
          console.log(e);
        });
    },
    isLinkedBright: (context, payload) => {
      context.state.alertLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/brightId/isLinked/" +
            payload,
        })
        .then((res) => {
          context.state.alertLoading = false;
          context.commit("setIsLinked", res.data);
          // New code to handle response status
          if (res.data.status == "SUCCESSFUL") {
            context.dispatch("getMannaBalance", context.state.selectedAddress);
            Swal.fire({
              position: "bottom",
              icon: "success",
              title: "you are verified !",
              showConfirmButton: false,
              timer: 1500,
              width: "15em",
              timerProgressBar: true,
            });
          } else if (res.data.status == "NOT_LINKED") {
            Swal.fire({
              position: "bottom",
              icon: "error",
              title: "you are not linked !",
              showConfirmButton: false,
              timer: 1500,
              width: "15em",
              timerProgressBar: true,
            });
          } else if (res.data.status == "NOT_VERIFIED") {
            Swal.fire({
              position: "bottom",
              icon: "error",
              title: "you are not verified !",
              showConfirmButton: false,
              timer: 1500,
              width: "15em",
              timerProgressBar: true,
            });
          } else if (res.data.status == "TRANSFERRED") {
            Swal.fire({
              position: "bottom",
              icon: "error",
              title: "you are transferd !",
              showConfirmButton: false,
              timer: 1500,
              width: "15em",
              timerProgressBar: true,
            });
          }
        })
        .catch((e) => {
          console.log(e)
          context.state.alertLoading = false;
          Swal.fire("Verification Failed", "ERROR", "error");
        });
    },

    submitEmail: (context, payload) => {
      context.state.submitEmailLoading = true;
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/requestMailCode",
          data: payload,
        })
        .then((res) => {
          context.state.submitEmailLoading = false;
          context.commit("setEmail", payload.mailAddress);
          context.commit("setEmailSecret", res.data);
        })
        .catch((e) => {
          context.state.submitEmailLoading = false;
          console.log("setEmail", e);
        });
    },
    submitCode: (context, payload) => {
      context.state.submitCodeLoading = true;
      console.log("paylod-status: ", payload.status);
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/submitMailCode",
          data: payload,
        })
        .then((res) => {
          // res.data.status = 'SUCCESSFUL';
          if (res.data.status == "success") {
            context.state.submitCodeLoading = false;
            context.commit("setSubmitCodeResult", res.data);
            context.state.retryRequest = 0;
          } else if (res.data.status == "error") {
            context.state.submitCodeLoading = false;
            context.commit("setSubmitCodeResult", res.data);
          } else {
            context.state.submitCodeLoading = false;
            console.log(res.data);
          }
        })
        .catch((e) => {
          context.state.submitCodeLoading = false;;
          console.log("submitCode-catch-response", e.response.data.message);

          if (!e.response) {
            e.response.data = "Error: Unable to submit code";
          }
          if (e.response.status == 502) {
            if (context.state.retryRequest < 3) {
              context.dispatch("submitCode", payload);
              context.state.retryRequest++;
            }
          } else {
            console.log("submitCode-else");
            context.commit(
              "setSubmitCodeResult",
              e.response ? e.response.data : "Error: Unable to submit code"
            );
            context.state.retryRequest = 0;
          }
        });
    },
    getMannaToClaimSecondTry: (context, payload) => {
      context.state.connectLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/claimable/" +
            payload,
        })
        .then((res) => {
          context.state.connectLoading = false;
          context.commit("setMannaToClaim", res.data);
        })
        .catch((e) => {
          context.state.connectLoading = false;
          console.log(e);
        });
    },
    getMannaToClaim: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/claimable/" +
            payload,
        })
        .then((res) => {
          if (res.data.status == "error") {
            context.dispatch("getMannaToClaimSecondTry", payload);
          } else {
            context.commit("setMannaToClaim", res.data.value);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    claimManna: (context, payload) => {
      context.state.claimLoading = true;
      mixin.methods
        .request({
          method: "POST",
          url: "https://mannatest.hedgeforhumanity.org/backend/manna/claim",
          data: { walletAddress: payload },
        })
        .then((res) => {
          context.state.claimLoading = false;
          if (res.data.status == "SUCCESSFUL") {
            context.commit("setNewMannaToClaim", 0);
            context.commit("setNewMannaBalance", res.data.balance);
            context.dispatch("hasTaken", payload);
          }
        })
        .catch((e) => {
          context.state.claimLoading = false;
          console.log(e)
        });
    },
    getBalance: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/getBalance/" +
            payload,
        })
        .then((res) => {
          context.commit("setBalance", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    hasTaken: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/claimable/" +
            payload,
        })
        .then((res) => {
          context.commit("setHasTakenResult", res.data);
        })
        .catch((e) => {
          console.log("hasTakenResult_errors" + e);
          console.log(e);
        });
    },
    mannaWallet: (context, payload) => {
      context.state.generateMannaWalletLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/mannaWallet" +
            payload,
        })
        .then((res) => {
          context.state.generateMannaWalletLoading = false;
          if (res.data.mannaWallet) {
            context.commit("setMannaWallet", res.data.mannaWallet);
            context.dispatch("getBalance", res.data.mannaWallet);
            context.dispatch("getMannaToClaim", context.state.selectedAddress);
          }
        })
        .catch((e) => {
          context.state.generateMannaWalletLoading = false;
          console.log("mannaWallet", e);
        });
    },
    generateMannaWallet: (context, payload) => {
      context.state.generateMannaWalletLoading = true;
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/mannaWallet",
          data: { walletAddress: payload },
        })
        .then((res) => {
          context.state.generateMannaWalletLoading = false;
          context.commit("setMannaWallet", res.data.mannaWallet);
          context.commit("setGetMannaWallet", res.data.mannaWallet);
          context.dispatch("getBalance", res.data.mannaWallet);
          context.dispatch("getMannaToClaim", context.state.selectedAddress);
        })
        .catch((e) => {
          context.state.generateMannaWalletLoading = false;
          console.log(e);
        });
    },
    getMannaWallet: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/getMannaWallet/" +
            payload,
        })
        .then((res) => {
          if (res.data.status == "success") {
            context.commit("setGetMannaWallet", res.data);
            context.dispatch("getBalance", res.data.mannaWallet);
            context.dispatch("getMannaToClaim", context.state.selectedAddress);
          } else if (res.data.status == "error") {
            if (res.data.message == "No Manna wallet") {
              context.commit("setGetMannaWallet", res.data);
            } else if (res.data.message == "BrightId is not linked") {
              context.commit("setGetMannaWallet", res.data);
            } else {
              console.log(res.data);
            }
          }
        })
        .catch((e) => {
          console.log("mannaWallet", e);
        });
    },
    convertMannaWallet: (context, payload) => {
      context.state.convertMannaWalletLoading = false;
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/convert",
          data: {
            walletAddress: payload,
            timestamp: context.state.timeStamp,
            signature: context.state.signiture,
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            context.state.convertMannaWalletLoading = false;
            context.dispatch("getBalance", res.data.mannaWallet);
            context.dispatch("getMannaToClaim", context.state.selectedAddress);
          } else {
            context.state.convertMannaWalletLoading = true;
          }
          context.commit("setConvertStatus", res.data.status);
          context.commit("setConvertMessage", res.data.message);
          context.dispatch("getBalance", res.data.mannaWallet);
          context.dispatch("getMannaToClaim", context.state.selectedAddress);
        })
        .catch((e) => {
          context.state.convertMannaWalletLoading = true;
          console.log(e);
        });
    },
    isBrightIDVerified: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            this.testurl +
            "https://mannatest.hedgeforhumanity.org/backend/brightId/verifications/" +
            payload,
        })
        .then((res) => {
          if (res.data.data) {
            context.commit("setIsBrightIDVerifiedData", res.data.data[0]);
          } else {
            context.commit("setIsBrightIDVerifiedData", res.data);
          }
        })
        .catch((e) => {
          context.commit("setIsBrightIDVerifiedData", e.response.data);
        });
    },
  },
  modules: {},
});
