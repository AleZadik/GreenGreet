<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="~/assets/book.png" alt="Card image cap" />
      <div class="card-body">
        <h4 class="card-title">Goal: {{projectObject.entirePrice / 10**6}} TRX</h4>
        <p>Funded: {{projectObject.totalFunds / 10**6}} TRX</p>
        <h5 class="card-title">Name: {{projectObject.name}}</h5>
        <p class="card-text">Description: {{projectObject.description}}</p>
        <p class="card-text">Deadline: {{new Date(projectObject.deadline*1000).toLocaleString()}}</p>
        <p class="card-text">Writer: {{ shorten(convertAddress(projectObject.writer)) }}</p>
        <!--  p  to show project id -->
        <p class="card-text">Project ID: {{projectObject.projectId}}</p>
        <p class="card-text">Donations: {{projectObject.donations}}</p>
        <button class="btn btn-primary" v-on:click="displayDetails">View</button>
      </div>
    </div>
    <details-modal v-if="showModal" :projectData="projectObject" :userData="projectObject.donations">
    </details-modal>
  </div>
</template>

<script>
import DetailsModal from "~/components/detailsModal.vue";
import { convertAddress } from "~/plugins/utils"

export default {
  props: ["projectObject"],
  data() {
    return {
      showModal: false
    }
  },
  components: {
    DetailsModal
  },
  methods: {
    convertAddress,
    displayDetails() {
      this.showModal = !this.showModal;
    },
    shorten(address){
      return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    }
  }
};
</script>
