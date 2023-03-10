import Vue from "vue";
import Vuex from "vuex";
import mixin from "../mixin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,

    connectLoading: false,
    submitEmailLoading: false,
    submitCodeLoading: false, 

    /* user states: 0 = initial, 1 = not linked, 2 = linked */
    userState: 0,
    
    haveMetamask: null,
    isMetamaskConnected: null,
    isLinked: null,

    email: null,
    emailSecret: null,

    sendCodeState: null,
    sendCodeMsg: null,
    txHash: null,
    txLink: null,
  },
  mutations: {
    setHaveMetamask(state, payload) {
      state.haveMetamask = payload
    },
    setIsMetamaskConnected(state, payload) {
      state.isMetamaskConnected = payload
    },
    setIsLinked(state, payload) {
      state.isLinked = payload
    },
    setEmailSecret(state, payload) {
      state.emailSecret = payload.secret
    },
    setSubmitCodeResult(state, payload) {
      console.log(payload);
      if (payload.status == 'successful') {
        state.sendCodeState = payload.status
        state.sendCodeMsg = payload.msg
        state.txHash = payload.txHash
        state.txLink = payload.txLink
      } else if (payload.status == 'error') {
        state.sendCodeState = payload.status
        state.sendCodeMsg = payload.msg
        state.txHash = null
        state.txLink = null
      }
    },
    setEmail(state, payload) {
      state.email = payload
    }
  },
  actions: {
    isLinked: (context, payload) => {
      context.state.connectLoading = true
      mixin.methods
      .request({
        method: "GET",
        url: "/is-linked/" + payload
      })
      .then(res => {
        context.state.connectLoading = false
        context.commit("setIsLinked", res.data);
      })
      .catch(e => {
        context.state.connectLoading = false
          console.log(e);
        });
    },
    sendEmail: (context, payload) => {
      context.state.submitEmailLoading = true
      mixin.methods
      .request({
        method: "POST",
        url: "/submitMail",
        data: payload
      })
      .then(res => {
        context.state.submitEmailLoading = false
        context.commit('setEmail', payload.mailAddress)
        context.commit("setEmailSecret", res.data);
      })
      .catch(e => {
        context.state.submitEmailLoading = false
          console.log(e);
        });
      },
      submitCode: (context, payload) => {
        context.state.submitCodeLoading = true
        mixin.methods
        .request({
          method: "POST",
          url: "/submitCode",
          data: payload
        })
        .then(res => {
          context.state.submitCodeLoading = false
          console.log(res.data);
          context.commit("setSubmitCodeResult", res.data);
        })
        .catch(e => {
          context.state.submitCodeLoading = false
          context.commit("setSubmitCodeResult", e.response.data);
        });
    },
  },
  modules: {}
});
