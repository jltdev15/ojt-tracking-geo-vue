<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'VisitRequest' }">Request</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between md:pb-6">
        <h1 class="md:text-3xl">
          Visitation <span class="font-bold md:text-3xl">Request</span>
        </h1>
      </header>
      <div class="flex flex-col justify-end gap-3 py-3 md:flex-row">
        <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="md:w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="requestorName">Name of Requestor</option>
        </select>
      </div>
      <section class="">
        <EasyDataTable :headers="headers" :items="hteStore.requestList" :search-field="searchField"
          :search-value="searchValue" table-class-name="customize-table"      
          :rows-per-page="5"
          :hide-rows-per-page="true">
          <template #item-operation="item">
            <div v-if="item.status === 'Pending'" class="flex justify-center gap-3 py-2">
              <button @click="handleToggleAcceptModal(item._id)" class="btn-primary btn text-gray-50">
                Accept
              </button>
              <button @click="handleToggleRejectModal(item._id)" class="btn btn-accent btn-outline text-gray-50">
                Reject
              </button>
            </div>
            <div v-if="item.status === 'Accepted'">
              <p>No action needed</p>
            </div>
            <div v-if="item.status === 'Rejected'">
              <p>No action needed</p>
            </div>
            <div v-if="item.status === 'Done'">
              <p>No action needed</p>
            </div>
            <!-- <div v-if="item.status === 'Rejected'">
                        <button @click="handleToggleRemove(item._id)" class=" btn btn-accent btn-outline text-gray-50">
                            Remove
                        </button>
                    </div> -->
          </template>
          <template #item-remarks="item">
            <p v-if="item.coorRemarks">
              {{ item.coorRemarks }}
            </p>
            <p v-else>No remarks</p>
          </template>
        </EasyDataTable>
      </section>
    </div>

    <!-- Accept -->
    <Modal :show="isConfirmModalShow" title="Confirmation">
      <template #default>
        <p class="text-xl text-center">Are you sure you want to accept this request?</p>
        <div class="flex justify-end gap-3 py-6">
          <button @click="isConfirmModalShow = !isConfirmModalShow" class="btn btn-accent btn-outline">
            Cancel
          </button>
          <button type="button" @click="handleAcceptRequest" class="btn btn-primary text-gray-50">
            Confirm
          </button>
        </div>
      </template>
    </Modal>
    <!-- Remove Optional to implement -->
    <Modal :show="isRemoveModalShow" title="Remove Confirmation">
      <template #default>
        <p class="text-xl text-center">Are you sure you want to remove this request</p>
        <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
        <div class="flex justify-end gap-3 py-6">
          <button @click="isRemoveModalShow = !isRemoveModalShow" class="btn btn-accent btn-outline">
            Cancel
          </button>
          <button type="button" @click="handleRemoveRequest" class="btn btn-primary text-gray-50">
            Confirm
          </button>
        </div>
      </template>
    </Modal>
    <!-- Reject -->
    <Modal :show="isRejectModalShow" title="Reject Confirmation">
      <template #default>
        <p class="text-xl text-center">Are you sure you want to reject this request?</p>
        <div class="px-6 pt-6">
          <textarea v-model.trim="hteRemarks" class="w-full px-3 textarea textarea-bordered"
            placeholder="Put reason for rejection"></textarea>
        </div>

        <div class="flex justify-end gap-3 py-6">
          <button @click="isConfirmModalShow = !isConfirmModalShow" class="btn btn-accent btn-outline">
            Cancel
          </button>
          <button type="button" @click="handleRejectRequest" class="btn btn-primary text-gray-50">
            Confirm
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useHteStore } from "@/stores/HteStore";

const hteStore = useHteStore();
const authStore = useAuthStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const isConfirmModalShow = ref(false);
const isRejectModalShow = ref(false);
const isRemoveModalShow = ref(false);
const visitId = ref("");
const hteRemarks = ref("");

const handleToggleRemove = async (id) => {
  visitId.value = id;
  isRemoveModalShow.value = !isRemoveModalShow.value;
};
const handleRemoveRequest = async () => { };

const handleToggleAcceptModal = async (id) => {
  visitId.value = id;
  isConfirmModalShow.value = !isConfirmModalShow.value;
};
const handleToggleRejectModal = async (id) => {
  visitId.value = id;
  isRejectModalShow.value = !isRejectModalShow.value;
};
const handleRejectRequest = async () => {
  if (hteRemarks.value === "") return alert("Remarks cant be empty");
  await hteStore.rejectVisitRequests(visitId.value, hteRemarks.value);
  isRejectModalShow.value = !isRejectModalShow.value;
};
const handleAcceptRequest = async () => {
  await hteStore.acceptVisitRequests(visitId.value);
  isConfirmModalShow.value = !isConfirmModalShow.value;
};

const headers = [
  { text: "REQUESTOR", value: "requestorName", width: 150 },
  { text: "REQUEST DATE", value: "scheduledDate",width: 150 },
  { text: "REQUEST TIME", value: "scheduledtime",width: 150 },
  { text: "DEPARTMENT", value: "department",width: 150 },
  { text: "REMARKS", value: "remarks",width: 150 },
  { text: "STATUS", value: "status",width: 150 },
  { text: "ACTIONS", value: "operation",width: 150 },
];

onMounted(async () => {
  await hteStore.fetchVisitRequests();
});
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 100px;
  --easy-table-body-row-font-size: 16px;
}
</style>
