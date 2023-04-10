import Vue from "vue";
import Vuex from "vuex";
import mixin from "../mixin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    claimLoading: false,
    connectLoading: false,
    verifyMeLoading: false,
    registerMeLoading: false,
    submitCodeLoading: false,
    submitEmailLoading: false,
    generateMannaWalletLoading: false,

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

    selectedAddress: null,
    providerState: null,
    providers: [],

    networkId: 0,
    coinbase: null,
    balance: null,
    chainId: null,

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
    testurl:'https://mannatest.hedgeforhumanity.org/'
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
        state.sendCodeMsg = payload.msg;
        state.txHash = payload.txHash;
        state.txLink = payload.txLink;
        state.mannaBalance = {
          balance: payload.balance,
          msg: "SUCCESSFUL",
          status: "SUCCESSFUL",
        };
      } else if (payload.status == "error") {
        state.sendCodeState = payload.status;
        state.sendCodeMsg = payload.message;
        state.txHash = null;
        state.txLink = null;
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
      state.hasTakenResult = payload
    },
    setMannaWallet(state, payload) {
      state.mannaWallet = payload;
    },
    setSelectedAddress(state, payload) {
      state.selectedAddress = payload;
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
      console.log("isLinked method called");
      // console.log(this.store.state.testurl)
      context.state.connectLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/brightId/isLinked/" +
            payload,
            
        })
        .then((res) => {
          context.state.connectLoading = false;
          context.commit("setIsLinked", res.data);
          console.log(res.data.link + " isLinked.link");
          console.log("getMannaBalance")
          console.log("I requested isLinked");
          if (res.data.status == "SUCCESSFUL") {
            context.dispatch("getMannaBalance", context.state.selectedAddress);
            console.log("isLinked-status: "+res.data.status)
          }else{
            console.log("isLinked-status: "+res.data.status)
          }
        })
        .catch((e) => {
          console.error("isLinked false");
          context.state.connectLoading = false;
          console.log(e);
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
        .then(res => {
          context.state.submitEmailLoading = false;
          context.commit("setEmail", payload.mailAddress);
          console.log('setEmail',payload.mailAddress);
          context.commit("setEmailSecret", res.data);
          console.log("setEmailSecret", res.data);
          console.log(JSON.stringify(res))
        })
        .catch(e => {
          context.state.submitEmailLoading = false;
          console.log('setEmail',e);
        });
    },
    submitCode: (context, payload) => {
      context.state.submitCodeLoading = true;
      console.log('paylod-status: ',payload.status)
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/submitMailCode",
          data: payload,
        })
        .then(res => {
          // res.data.status = 'SUCCESSFUL';
          context.state.submitCodeLoading = false;
          context.commit("setSubmitCodeResult", res.data);
          console.log('submitCode',res.data);
          console.log('submitCode-message', res.data.message)
          console.log('submitCode-status', res.data.status)
          console.log('submitCode-txLink', res.data.txLink)
          console.log('submitCode-txHash', res.data.txHash)
          context.state.retryRequest = 0;
        })
        .catch(e => {
          context.state.submitCodeLoading = false;
          // e.response.message = 
          console.log('submitCode-catch-paylod', payload)
          console.log('submitCode-catch-response' , e.response)
          //   console.log('submitCode-message-catch', e.response.data.message)
          console.log('submitCode-data-catch', e.data)
          
          // console.log(JSON.stringify(e))
          if(!e.response){
            e.response.data = 'Error: Unable to submit code';
            console.log('not response found')
          }
          if (e.response.status == 502) {
            if (context.state.retryRequest < 3) {
              context.dispatch("submitCode", payload);
              context.state.retryRequest++;
            }
          } else {

            // if(e.response.data == undefined){
            //   e.response.date = {}
            // }
            console.log('submitCode-else' )
          //   console.log('submitCode-message-else', e.response.data.message)
          // console.log('submitCode-status-else', e.response.data.status)
            // e.response.data.status = 'error';
            context.commit("setSubmitCodeResult", e.response ? e.response.data : 'Error: Unable to submit code');
            context.state.retryRequest = 0;
            // console.log('submitCode-status-else', e.response.data)
            
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
            context.commit("setMannaToClaim", res.data);
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
          data: { "walletAddress": payload }
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
          console.log(e);
        });
    },
    getBalance: (context, payload) => {
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/manna/balance/" +
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
      console.log('hastaken method called')
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/claimable/" +
            payload,
        })
        .then((res) => {
          console.log('setHasTakenResult ',res.data)
          context.commit("setHasTakenResult", res.data);
          console.log('hasTakenResualt_message: '+res.data.message)
        })
        .catch((e) => {
          console.log('hasTakenResult_errors'+e)
          // context.commit("setHasTakenResult", e.data);
          console.log(e);
        });
    },
    mannaWallet: (context, payload) => {
      context.state.generateMannaWalletLoading = true;
      mixin.methods
        .request({
          method: "GET",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/mannaWallet/" +
            payload,
        })
        .then((res) => {
          context.state.generateMannaWalletLoading = false;
          if (res.data.mannaWallet) {
            context.commit("setMannaWallet", res.data.mannaWallet);
            context.dispatch("getBalance", res.data.mannaWallet);
            context.dispatch("getMannaToClaim", context.state.selectedAddress);
            console.log('mannaWallet' , res.data.mannaWallet)
          }
        })
        .catch((e) => {
          context.state.generateMannaWalletLoading = false;
          console.log('mannaWallet',e);
        });
    },
    generateMannaWallet: (context, payload) => {
      context.state.generateMannaWalletLoading = true;
      mixin.methods
        .request({
          method: "POST",
          url:
            "https://mannatest.hedgeforhumanity.org/backend/conversion/mannaWallet/",
          data: { walletAddress: payload },
        })
        .then((res) => {
          context.state.generateMannaWalletLoading = false;
          context.commit("setMannaWallet", res.data.mannaWallet);
          context.dispatch("getBalance", res.data.mannaWallet);
          context.dispatch("getMannaToClaim", context.state.selectedAddress);
        })
        .catch((e) => {
          context.state.generateMannaWalletLoading = false;
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
