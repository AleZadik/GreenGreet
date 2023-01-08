<template>
  <div>
    <LoadingOverlay :show="loading" :loadingMsg="loadingMsg" />
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group">
                <label for="title">Project Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="project.name"
                  :disabled="disabled"
                  placeholder="Enter Project"
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="project.description"
                  :disabled="disabled"
                  placeholder="Description"
                />
              </div>
              <div class="form-group">
                <label for="price">URI</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter URI"
                  :disabled="disabled"
                  v-model="project.metadataURI"
                />
              </div>
              <div class="form-group">
                <label for="price">Funding Goal</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="project.entirePrice"
                  :disabled="disabled"
                  placeholder="Unit: TRX"
                />
              </div>
              <button
                v-on:click="postProject"
                class="btn btn-primary float-right"
              >
                Submit
              </button>
              <button
                class="btn btn-outline-secondary float-right mr-3"
                v-on:click="close"
              >
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProject } from '~/plugins/utils'
import LoadingOverlay from './LoadingOverlay.vue'

export default {
  components: { LoadingOverlay },
  data() {
    return {
      project: {
        name: '',
        description: '',
        metadataURI: '',
        entirePrice: '',
      },
      show: false,
      loadingMsg: 'Loading Project',
      disabled: false,
      success: false,
    }
  },
  methods: {
    async postProject() {
      this.project.entirePrice = this.project.entirePrice * 10 ** 6
      this.disabled = true;
      this.$store.commit('toggleLoading')

      let result = await createProject(this.project);
      this.$store.commit('toggleLoading');
      this.disabled = false;
      this.success = result;
      this.close();
    },
    close() {
      this.$emit('toggle');
      this.$emit('showSuccess', this.success);
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
