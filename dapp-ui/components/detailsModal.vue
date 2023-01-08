<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Project Details</h3>
          </div>
          <div class="modal-body">
            <slot name="body">
              <h4 class="card-title">
                Goal: {{ projectData.entirePrice / 10 ** 6 }} TRX
              </h4>
              <p>Funded: {{ projectData.totalFunds / 10 ** 6 }} TRX</p>
              <h5 class="card-title">Name: {{ projectData.name }}</h5>
              <p class="card-text">
                Description: {{ projectData.description }}
              </p>
              <!-- deadline in ts to date -->
              <p class="card-text">
                Deadline:
                {{ new Date(projectData.deadline * 1000).toLocaleString() }}
              </p>
              <!-- writer address convert to TRX address -->
              <p class="card-text">
                Writer: {{ shorten(convertAddress(projectData.writer)) }}
              </p>
              <input
                type="number"
                v-model="amount"
                placeholder="Amount in TRX"
                class="form-control"
              />
              <b-button v-on:click="donateNow()" class="mr-5 mt-3 form-control">
                <span>Donate Now</span>
              </b-button>
              <small class="form-control">Minimum donation is: {{projectData.minDonation / 10**6}} TRX</small>

              <b-button v-on:click="purchaseNow()" class="mr-5 mt-3 form-control">
                <span>Purchase Now</span>
              </b-button>
              <small class="form-control">Current price is: {{projectData.currentPrice / 10**6}} TRX</small>
            </slot>
            <slot name="footer">
              <!-- donation list -->
              <div class="modal-footer">
                <h3>Donation List</h3>
                <div v-for="donation in projectData.donations" :key="donation">
                  <!-- uint256 projectId;
        uint256 amount;
        address payable userAddress;
        uint256 donationDate;
        uint8 fulfilled; -->
                  <p>{{donation.projectId}}</p>
                  <p>{{donation.amount}}</p>
                  <p>{{convertAddress(donation.userAddress)}}</p>
                  <p>{{donation.donationDate}}</p>
                  <p>{{donation.fulfilled}}</p>
                </div>
                <h3>User List</h3>
                <div v-for="user in projectData.users" :key="user">
                  <p> {{user.userAddress}}</p>
                  <p>{{user.points}}</p>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

import { donateToProject, purchaseProject, convertAddress, web3 } from '~/plugins/utils'

export default {
  components: {
    Datepicker,
  },
  props: ['projectData', 'userData'],
  data() {
    return {
      showModal: true,
      amount: 0,
    }
  },
  methods: {
    convertAddress,
    purchaseProject,
    donateNow() {
      const totalPrice = tronWeb.toSun(this.amount);
      donateToProject(this.projectData, totalPrice);
    },
    purchaseNow() {
      purchaseProject(this.projectData.projectId);
    },
    shorten(add){
      return add.substring(0, 6) + "..." + add.substring(add.length - 4, add.length);
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
  color: #c73318;
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
