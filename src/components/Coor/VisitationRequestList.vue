<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'CoorRequest' }">Requests</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="">
        <h1 class="text-3xl font-bold">Your Request List</h1>
      </header>
      <div class="flex flex-col justify-end gap-3 py-3 md:flex-row">
        <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="md:w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="requesteeName">Company Name</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div class="">
        <EasyDataTable :headers="headers" :items="coorStore.requestList" table-class-name="customize-table"
          :search-field="searchField" :search-value="searchValue">
          <template #item-operation="item">
            <div v-if="item.status === 'Rejected'" class="">
              <button @click="toggleConfirmRemoveModal(item._id)" class="btn btn-accent btn-outline">Remove</button>
            </div>
            <div v-if="item.status === 'Accepted'" class="">
              <button @click="toggleMarkAsDoneModal(item._id)" class="btn btn-accent btn-outline">Mark as Done</button>
            </div>
            <div v-if="item.status !== 'Accepted' && item.status !== 'Rejected'">
              <p>No action needed</p>
            </div>
          </template>
          <template #item-hteRemarks="item">
            <div v-if="item.hteRemarks" class="">
              <p>{{ item.hteRemarks }}</p>
            </div>
            <p v-else>
              no remarks
            </p>
          </template>
        </EasyDataTable>
        <Modal :show="isRemoveModalShow" title="Remove Confirmation">
          <template #default>
            <p class="text-xl text-center ">Are you sure you want to remove
              this request</p>
            <div class="flex justify-end gap-3 py-6">
              <button @click="isRemoveModalShow = !isRemoveModalShow" class="btn btn-accent btn-outline">Cancel</button>
              <button type="button" @click="handleRemoveRequest" class="btn btn-primary text-gray-50">
                Confirm
              </button>
            </div>
          </template>
        </Modal>
        <Modal :show="isDoneModalShow" title="Done Confirmation">
          <template #default>
            <p class="text-xl text-center ">Visitation Done?</p>
            <div class="flex justify-end gap-3 py-6">
              <button @click="isDoneModalShow = !isDoneModalShow" class="btn btn-accent btn-outline">Cancel</button>
              <button type="button" @click="handleDoneRequest" class="btn btn-primary text-gray-50">
                Confirm
              </button>
            </div>
          </template>
        </Modal>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCoorStore } from "@/stores/CoorStore";
const coorStore = useCoorStore();
const isRemoveModalShow = ref(false)
const isDoneModalShow = ref(false)
const requestId = ref('')
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "Company Name", value: "requesteeName",width: 100 },
  { text: "Request Date", value: "scheduledDate",width: 100 },
  { text: "Request Time", value: "scheduledtime",width: 100 },
  { text: "Status", value: "status",width: 100 },
  { text: "HTE Remarks", value: "hteRemarks",width: 100 },
  { text: "Action", value: "operation",width: 100 },
];
onMounted(async () => {
  await coorStore.fetchRequestVisitation();
  document.title = "OJT Tracker | Request list";
});

const toggleMarkAsDoneModal = (id) => {
  requestId.value = id;
  isDoneModalShow.value = !isDoneModalShow.value
}
const toggleConfirmRemoveModal = (id) => {
  requestId.value = id;
  isRemoveModalShow.value = !isRemoveModalShow.value
}
const handleRemoveRequest = async () => {
  await coorStore.removeVisitRequests(requestId.value)
  isRemoveModalShow.value = !isRemoveModalShow.value
}
const handleDoneRequest = async () => {
  await coorStore.doneVisitRequest(requestId.value)
  isDoneModalShow.value = !isDoneModalShow.value
}
</script>

<style scoped></style>
