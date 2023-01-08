<template>
  <div>
    <LoadingOverlay :show="loading" :loadingMsg="loadingMsg" />
    <CactusNavbar active="mint"/>
    <CactusModalESG :display="display" @completeEVR="completeEVR"/>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-content">
            <div class="game-details">
              <div class="row">
                <div class="col-lg-12">
                  <h2 class="page-title">Create your sustainable initiative</h2>
                </div>
                <div class="col-lg-12">
                  <div class="content">
                    <div class="form">
                      <form action="#" enctype="multipart/form-data">
                        <div class="fields">
                          <label for="projectname">✒️ Project Name:</label>
                          <input
                            id="projectname"
                            class="minting-inputs"
                            type="text"
                            placeholder="Beach Cleanup"
                            name="projectname"
                            v-model="details.name"
                          />
                        </div>
                        <div class="fields">
                          <label for="summary">📜 One Sentece Summary:</label>
                          <input
                            id="summary"
                            class="minting-inputs"
                            type="text"
                            placeholder="Helping save the beaches with cleanup kits and volunteering."
                            name="summary"
                            v-model="details.summary"
                          />
                        </div>
                        <div class="fields">
                          <label for="pdesc">📗 Project Description:</label>
                          <textarea
                            class="txtarea"
                            name="pdesc"
                            id="pdesc"
                            cols="30"
                            rows="10"
                            spellcheck="false"
                            style="height: 442px;"
                            v-model="details.description"
                          ></textarea>
                        </div>
                        <div class="fields">
                          <label for="about">🌳 About you:</label>
                          <textarea
                            class="txtarea"
                            name="about"
                            id="about"
                            cols="30"
                            rows="10"
                            v-model="details.about"
                          ></textarea>
                        </div>
                        <div class="fields">
                          <label for="funding">💲 Funding Goal: (TRX)</label>
                          <input
                            id="fundamount"
                            class="minting-inputs"
                            type="number"
                            placeholder="150"
                            name="fundamount"
                            v-model="details.funding"
                          />
                        </div>

                        <div class="fields">
                          <label for="category">🏷️ Category:</label>
                          <select v-model="details.category" name="category" id="category">
                            <option value="sustainability">Sustainability</option>
                            <option value="social">Social Good</option>
                            <option value="education">Education</option>
                            <option value="green">Green</option>
                          </select>
                        </div>

                        <div class="fields">
                          <label for="file">📷 Project Picture:</label>
                          <input type="file" name="file" id="file"/>
                        </div>

                        <!-- Submit button -->
                        <div class="fields">
                          <input
                            id="submit"
                            type="button"
                            value="Submit"
                            :disabled="disabled"
                            class="btn btn-primary"
                            @click="submit"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CactusFooter />
  </div>
</template>

<script>
import CactusFooter from '../components/CactusFooter.vue';
import CactusModalESG from '../components/CactusModalESG.vue';
import CactusNavbar from '../components/CactusNavbar.vue';
import DetailsModal from '../components/detailsModal.vue';
import LoadingOverlay from '../components/LoadingOverlay.vue'
import { createProject, getTronWeb, setCactusContract, ESGTOARR} from '~/plugins/utils';

export default {
  name: 'mint',
  components: {
    CactusNavbar,
    CactusFooter,
    DetailsModal,
    CactusModalESG,
    LoadingOverlay
},
  data(){
    return {
      display: false,
      loadingMsg: 'Loading Project',
      details: {
        name: 'Project Name',
        summary: 'One sentence summary',
        description: 'Project description',
        about: 'About you',
        funding: 'Funding goal',
        category: 'Category',
        file: null,
        ESG: "",
      },
      r: this.$config.NFT_STORAGE,
      disabled: false,
      sample: {"name":"Project Name","summary":"One sentence summary","description":"Project description","about":"About you","funding":"Funding goal","category":"Category","file":"bafybeia2hg4of5xvsrbvs5y6i2g34mdyhsssvdwaa7nr6rj7mtkkdprfxa","ESG":"20A20A10A20A20A110B10B10B10B3A1E4E15A"}
    }
  },
  methods: {
    submit(){
      this.disabled = true;
      this.$store.commit('toggleLoading');
      this.loadingMsg = 'Uploading file to the IPFS';
      event.preventDefault();
      const file = document.getElementById('file').files[0];
      let obj = {
        r: this.$config.NFT_STORAGE,
        file: file,
      }
      this.$store.dispatch('uploadToNFTStorage', obj); // save the file first
    },
    completeEVR(esgHASH){
      this.display = false;
      this.details.ESG = esgHASH;
      this.disabled = true;
      let obj = {
        r: this.$config.NFT_STORAGE,
        details: this.details,
      }
      this.$store.commit('toggleLoading');
      this.loadingMsg = 'Uploading project metadata to the IPFS';
      this.$store.dispatch('uploadDetailsToNFTStorage', obj);
    },
    async finishTHIS(){
      this.loadingMsg = 'Uploading project to the smart contract';
      this.$store.commit('toggleLoading');
      await createProject(this.projectObj);
      this.$store.commit('toggleLoading');
      this.$router.push('/browse');
    },
    sampleACT(){
      this.details = this.sample;
      let obj = {
        r: this.$config.NFT_STORAGE,
        details: this.details,
      }
      this.$store.dispatch('uploadDetailsToNFTStorage', obj);
    }
  },
  async mounted() {
    // get tronWeb object
    getTronWeb();

    // Wait a while to ensure tronweb object has already injected
    setTimeout(async () => {
      await setCactusContract()
    }, 50)
  },
  computed: {
    IPFS_HASH: {
      get() {
        return this.$store.state.IPFS_HASH;
      },
    },
    FINAL_HASH: {
      get() {
        return this.$store.state.FINAL_HASH;
      },
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  watch: {
    IPFS_HASH: function (newVal, oldVal) {
      this.$store.commit('toggleLoading');
      this.details.file = newVal;
      this.display = true;
    },
    FINAL_HASH: function (newVal, oldVal) {
      this.$store.commit('toggleLoading');
      this.disabled = false;
      this.details.file = newVal;
      this.projectObj = {
        name: this.details.name,
        summary: this.details.summary,
        description: this.details.description,
        about: this.details.about,
        entirePrice: this.details.funding * 10**6, // TRX to SUN
        category: this.details.category,
        metadataURI: this.details.file,
        ESG: this.details.ESG,
      }
      this.finishTHIS(this.projectObj);
    },
  },
};
</script>

<style>
.minting-inputs{
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.minting-inputs:focus{
  outline: none;
  border-bottom: aqua 1px solid;
  -webkit-box-shadow:0px 0px 20px 1px rgba(45,255,196,0.9);
  -moz-box-shadow: 0px 0px 20px 1px rgba(45,255,196,0.9);
  box-shadow: 0px 0px 20px 1px rgba(45,255,196,0.9);
}
.txtarea:focus-visible{
  border: aqua 3px solid;
  color: #fff;
  -webkit-box-shadow:0px 0px 20px 1px rgba(45,255,196,0.9);
  -moz-box-shadow: 0px 0px 20px 1px rgba(45,255,196,0.9);
  box-shadow: 0px 0px 20px 1px #2dffc4e6;
}
.txtarea{
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid #fff;
  color: rgba(255, 255, 255, 0.347);
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
label{
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
}

#submit{
  width: 100%;
  background-color: #fff;
  color: #000;
  border: 3px solid #fff;
  font-size: 1.2rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  -webkit-box-shadow:0px 0px 20px 1px rgba(0, 0, 0, 0.9);
  -moz-box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.9);
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.9);
}
#submit:hover{
  background-color: rgb(255, 255, 255, 0.1);
  color: rgb(255, 255, 255);
  border: 3px solid #000;
}
input[type="file"] {
  color: #0E0F19;
}
.page-title{
  color: #0E0F19;
}
</style>