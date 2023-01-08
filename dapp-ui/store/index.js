import axios from 'axios'
export const state = () => ({
    loading: false,
    IPFS_HASH: "",
    FINAL_HASH: "",
  })
  
  export const getters = {
    getLoading(state) {
      return state.loading;
    }
  }
  
  export const mutations = {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    changeHASH(state, payload) {
      state.IPFS_HASH = payload;
    },
    changeFINAL_HASH(state, payload) {
      state.FINAL_HASH = payload;
    }

  }
  
  export const actions = {
    async fetchCounter({ state }) {
      state.loading = true;
      // make request
      const res = { data: 10 };
      state.loading = false;
      return res.data;
    },
    setLoading(state, payload) {
      console.log(payload);
      state.loading = true;
    },
    // take the file and upload it to nft storage using axios and return the cid
    async uploadToNFTStorage(state, obj) {
      console.log(obj);
      const file = obj.file;
      const r = obj.r;
      const formData = new FormData();
      formData.append("file", file);
      axios.post('https://api.nft.storage/upload', file, {
        headers: {
          'Content-Type': 'image/*', 
          "Authorization": "Bearer " + r
        }
      }).then((response) => {
        // store commit the cid to changeHASH
        console.log(response.data);
        state.commit('changeHASH', response.data.value.cid);
        return response.data.value.cid;
      }).catch((error) => {
        console.log(error);
      });
    },

    async uploadDetailsToNFTStorage(state, obj) {
      const details = obj.details;
      const r = obj.r;
      const formData = new FormData();
      formData.append("file", JSON.stringify(details));
      axios.post('https://api.nft.storage/upload', details, {
        headers: {
          "Authorization": "Bearer " + r
        }
      }).then((response) => {
        console.log(response.data);
        state.commit('changeFINAL_HASH', response.data.value.cid);
        return response.data.value.cid;
      }
      ).catch((error) => {
        console.log(error);
      }
      );
    },
  }