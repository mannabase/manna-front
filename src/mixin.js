import store from "./store/index";
import axios from "axios";
import configs from "./javascripts/config";

const mixin = {
  methods: {
    baseRequest(config) {
      store.state.isLoading = true;
      const instance = axios.create({
        baseURL: configs.baseURL
      });
      return instance.request(config);
    },

    request(config) {
      store.state.isLoading = true;
      const instance = axios.create({
        baseURL: configs.baseURL,
        headers: {
          authorization: "Token " + store.state.token,
          "Content-Type": "application/json"
        }
      });
      instance.interceptors.response.use(
        response => {
          store.state.isLoading = false;

          return response;
        },
        error => {
          store.state.isLoading = false;
          
          return Promise.reject(error);
        }
      );
      return instance.request(config);
    },
  },
  computed: {
    isLoading() {
      return store.state.isLoading
    }
  }
};

export default mixin;
