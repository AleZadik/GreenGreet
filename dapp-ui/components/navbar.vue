<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <ul class="navbar-nav justify-content-end ml-auto">
        <li class="nav-item">
          <b-button v-on:click="toggle" class="mr-5 mt-3">
            <span>Create new Project</span>
          </b-button>
        </li>
      </ul>
    </nav>

    <project-form v-if="showModal" @toggle="toggle" @showSuccess="showSuccess">
      <h3 slot="header">Create new Project</h3>
    </project-form>
  </div>
</template>

<script>
import ProjectForm from "~/components/ProjectForm.vue";
import { accountAddress } from "~/plugins/utils";
import { initWalletConnect } from "~/plugins/walletConnect";

export default {
  data() {
    return {
      showModal: false,
      address: null
    };
  },
  components: {
    ProjectForm 
  },
  methods: {
    toggle() {
      this.showModal = !this.showModal;
    },
    walletConnect() {
      // TODO: connect to walletconnect
      initWalletConnect();
    },
    showSuccess(success) {
      if (success) {
        this.$bvToast.toast("Project created successfully", {
          title: "Success",
          variant: "success",
          solid: true
        });
      } else {
        this.$bvToast.toast("Project creation failed", {
          title: "Error",
          variant: "danger",
          solid: true
        });
      }
    }
  },
};
</script>
