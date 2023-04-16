import store from "./store/index";
import axios from "axios";
import configs from "./javascripts/config"
import ENUMS from "@/javascripts/constants/enums"
import Web3 from "web3";
import ABI from "@/javascripts/ABI"
import { ethers } from "ethers"
import { Icon } from '@iconify/vue2';

const mixin = {
  data() {
    return {
      mixinInterval: null,
      ENUMS,
      MannaABI: ABI.Manna,
      ClaimMannaABI: ABI.ClaimManna,
      MannaBrightIDABI: ABI.MannaBrightID,
      Icon
    }
  },
  methods: {
    visitLink(link) {
      window.open(link, "_blank");
    },
    isMetamaskConnected() {
      return window.ethereum.selectedAddress != null;
    },
    getAddress() {
      return window.ethereum.selectedAddress;
    },
    changeToIDChain() {
      return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x4a",
            chainName: "IDChain",
            rpcUrls: ["https://idchain.one/rpc/"],
            nativeCurrency: {
              name: "Eidi",
              symbol: "EIDI",
              decimals: 18,
            },
            blockExplorerUrls: ["https://explorer.idchain.one/"],
          },
        ],
      });
    },
    async convertingManna() {
      const timeStamp = Date.now().toString();
      try {
        const from = store.state.selectedAddress;
        const msg = `0x${Buffer.from(timeStamp, 'utf8').toString('hex')}`;
        const sign = await window.ethereum.request({
          method: 'personal_sign',
          params: [msg, from, 'Example password'],
        });
        store.state.personalSignResult = sign;
        store.state.personalSignVerify = false;
        this.$store.commit('setTimeStamp',timeStamp);
        this.$store.commit('setSigniture',sign);
        console.log('selectedAddress:',from)
        console.log('timeStamp:',timeStamp)
        console.log('signiture: ',sign)
        console.log('timeStamp-store:',store.state.timeStamp)
        console.log('signiture-store:',store.state.signiture)

          this.$store.dispatch("convertMannaWallet", this.getAddress());

      } catch (error) {
        console.log(error);
      }

      

    },
    ConnectMetamask() {
      let connectMetamaskEnable = window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);

      if (this.isMetamaskConnected()) {
        this.$store.commit('setSelectedAddress', window.ethereum.selectedAddress);
      } else {
        if (this.mixinInterval == null) {
          this.mixinInterval = setInterval(() => {
            if (this.isMetamaskConnected()) {
              this.$store.commit('setSelectedAddress', window.ethereum.selectedAddress);
              clearInterval(this.mixinInterval);
              this.mixinInterval = null;
            }
          }, 500);
        }
      }
      return connectMetamaskEnable;
    },
    async addMannaTokenToWallet() {
      axios
        .get(configs.baseURL + "/backend/manna/tokenInfo")
        .then((res) => {

          const tokenAddress = res.data.address;
          const tokenSymbol = res.data.symbol;
          const tokenDecimals = res.data.decimals;
          const tokenImage = res.data.image
          "https://mannatest.hedgeforhumanity.org/img/logo.c0b699a7.png";

          try {
            window.ethereum.request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: tokenAddress,
                  symbol: tokenSymbol,
                  decimals: tokenDecimals,
                  image: tokenImage,
                },
              },
            });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log(err);
        });

    },
    baseRequest(config) {
      store.state.isLoading = true;
      const instance = axios.create({
        baseURL: configs.baseURL
      });
      return instance.request(config);
    },
    checkBrightIDVerification(){
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
    },
    request(config) {
      store.state.isLoading = true;
      const instance = axios.create({
        baseURL: configs.baseURL,
        headers: {
          authorization: "Token " + store.state.token,
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
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

    /**
     * Return the newtwork ID of the connected blockchain.
     *
     * @return {Promise}
     */
    getNetworkId() {
      return new Promise((resolve, reject) => {
        window.ethereum.request({ method: 'net_version' }).then((res) => {
          this.$store.commit('setNetworkId', res)
          resolve(res)
        }).catch(err => {
          console.log(err);
          reject(new Error('BcExplorer error: networkId not available.'));
        })
      });
    },

    /**
     * Return the chain ID of the connected blockchain.
     *
     * @return {Promise}
     */
    getChainId() {
      return new Promise((resolve, reject) => {
        window.ethereum.request({ method: 'eth_chainId' }).then((res) => {
          this.$store.commit('setChainId', res);
          resolve(res)
        }).catch(err => {
          console.log(err);
          reject(new Error('BcExplorer error: chainId not available.'));
        })
      });
    },
    claimManna() {
      if (!this.$store.state.claimLoading && parseInt(this.$store.state.contractData.toClaim._hex, 16) != '0') {
        this.$store.state.claimLoading = true
        this.claimMannaContract.claim().then(res => {
          res.wait().then(() => {
            this.$store.state.claimLoading = false
            this.loadInfo()
            this.$store.state.contractData.toClaim = 0
            this.$store.dispatch('getMannaBalance', window.ethereum.selectedAddress);
          }).catch(err => {
            this.$store.state.claimLoading = false
            console.error(err.message);
          })
        }).catch(err => {
          this.$store.state.claimLoading = false
          console.error(err.message);
        })
      }
    },
    registerMe() {
      if (!this.$store.state.registerMeLoading) {
        this.$store.state.registerMeLoading = true
        this.claimMannaContract.register().then(res => {
          res.wait().then(() => {
            this.$store.state.registerMeLoading = false
            this.loadInfo()
          }).catch(err => {
            this.$store.state.registerMeLoading = false
            console.error(err.message);
          })
        }).catch(err => {
          this.$store.state.registerMeLoading = false
          console.error(err.message);
        })
      }
    },
    verifyMe() {
      if (!this.$store.state.verifyMeLoading) {
        this.$store.state.verifyMeLoading = true
        this.mannaBrightIDContract.verify(
          this.getAddress(),
          this.$store.state.isBrightIDVerifiedData.timestamp,
          this.$store.state.isBrightIDVerifiedData.sig.v,
          '0x' + this.$store.state.isBrightIDVerifiedData.sig.r,
          '0x' + this.$store.state.isBrightIDVerifiedData.sig.s
        ).then(res => {
          res.wait().then(() => {
            this.$store.state.verifyMeLoading = false
            this.loadInfo()
          }).catch(err => {
            this.$store.state.verifyMeLoading = false
            console.error(err.message);
          })
        }).catch(err => {
          this.$store.state.verifyMeLoading = false
          console.error(err.message);
        })
      }
    },
    async loadInfo() {
      try {
        if (this.selectedAddress) {
          await this.getNetworkId();
          await this.getChainId();
          let mannaContractAddress = '0xC0DE5623db360495Fc67af4eB03313A42360eC23'
          let claimMannaContractAddress = '0xeb2873A6ee9786C1EfD715DF0D62C34BE2Fd5D27'
          let mannaBrightIDContractAddress = '0x1b7705B07229D238F045B2b3a13688fb50B737Ed'

          this.provider = new ethers.providers.Web3Provider(window.ethereum);
          this.signer = this.provider.getSigner();

          this.mannaContract = new ethers.Contract(mannaContractAddress, this.MannaABI, this.signer);
          this.claimMannaContract = new ethers.Contract(claimMannaContractAddress, this.ClaimMannaABI, this.signer);
          this.mannaBrightIDContract = new ethers.Contract(mannaBrightIDContractAddress, this.MannaBrightIDABI, this.signer);

          this.mannaContract.balanceOf(this.getAddress()).then(balance => {
            this.$store.commit("setMannaBalance", balance/(10**18));
          })

          this.claimMannaContract.isVerified(this.getAddress()).then(isVerif => {
            if (isVerif) {
              this.$store.commit('setContractIsVerified', true)
              this.claimMannaContract.isRegistered(this.getAddress()).then(isRegist => {
                this.claimMannaContract.toClaim(this.getAddress()).then(toClaim => {
                  this.$store.commit('setContractToClaim', toClaim)
                })
                if (isRegist) {
                  this.$store.commit('setContractIsRegistered', true)
                }
                else {
                  this.$store.commit('setContractIsRegistered', false)
                }
              })
            } else {
              this.$store.commit('setContractIsVerified', false)
            }
          })
        } else {
          this.$store.commit('setNetworkId', 0)
          this.$store.commit('setCoinbase', null)
          this.$store.commit('setBalance', 0)
          this.$store.commit('setChainId', null)
        }
      } catch (e) {
        console.log(e);
      }
    },
    goToMannaOne() {
      this.$store.commit("setGuidePage", false);
    },
  },
  computed: {
    guidePage() {
      return this.$store.state.guidePage;
    },
    isLoading() {
      return store.state.isLoading
    },
    isLinked() {
      return this.$store.state.isLinked
    },
    selectedAddress() {
      return this.$store.state.selectedAddress
    },
    providerState() {
      return this.$store.state.providerState
    },
    mannaToClaim() {
      return this.$store.state.mannaToClaim;
    },
    convertMessage() {
      return this.$store.state.convertMessage;
    },
    convertStatus() {
      return this.$store.state.convertStatus;
    },
    mannaBalance() {
      return this.$store.state.mannaBalance;
    },
    isBrightIDVerifiedData() {
      return this.$store.state.isBrightIDVerifiedData;
    },
    isBrightIDVerifiedUnique() {
      return this.isBrightIDVerifiedData && this.isBrightIDVerifiedData.unique == true;
    },
    isIDChain() {
      return this.$store.state.chainId && this.$store.state.chainId == "0x4a";
    },
    mannaContract: {
      get() {
        return this.$store.state.mannaContract
      },
      set(value) {
        this.$store.commit('setMannaContract', value)
      }
    },
    claimMannaContract: {
      get() {
        return this.$store.state.claimMannaContract
      },
      set(value) {
        this.$store.commit('setClaimMannaContract', value)
      }
    },
    mannaBrightIDContract: {
      get() {
        return this.$store.state.mannaBrightIDContract
      },
      set(value) {
        this.$store.commit('setMannaBrightIDContract', value)
      }
    },
    signer: {
      get() {
        return this.$store.state.signer
      },
      set(value) {
        this.$store.commit('setSigner', value)
      }
    },
    providers: {
      get() {
        return this.$store.state.provider
      },
      set(value) {
        this.$store.commit('setProvider', value)
      }
    }
  }
};

export default mixin;
