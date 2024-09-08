<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'HteList' }">HTE List</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6 bg-gray-200">
      <h1 class="text-3xl ">
        Host <span class="text-3xl font-bold">Training Establishment</span>
      </h1>
    </header>
    <div class="flex justify-end gap-3 px-6">
      <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
      <select class="w-48 select select-bordered" v-model.trim="searchField">
        <option selected disabled value="Set filter">Set filter</option>
        <option value="status">Status</option>
        <option value="Intern">Intern Name</option>
        <option value="Department">Department</option>
      </select>
    </div>
    <div class="p-6">
      <EasyDataTable border-cell :headers="headers" :items="coorStore.hteList" table-class-name="customize-table">
        <template #item-moa="item">
          <div v-if="item.hasMoa === 'true'">
            <p>MOA Available</p>
          </div>
          <div v-else>
            <p>MOA not available</p>
          </div>
        </template>
        <template #item-operation="item">
          <div class="">
            <button @click="openRequestModal(item._id, item.name)" class="btn btn-primary">
              Create Request
            </button>
          </div>
        </template>
      </EasyDataTable>
      <Modal :show="isModalShow" title="New Request">
        <form @submit.prevent="submitRequestHandler" action="">
          <div class="flex flex-col gap-3 pt-3">
            <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
            <p class="font-medium text-gray-600">Date of Visitation</p>
            <label class="flex items-center gap-2 input input-bordered">
              <input v-model="requestData.scheduledDate" type="date" :min="today" class="grow"
                placeholder="Date of Visitation" required />
            </label>
            <p class="font-medium text-gray-600">Time of Visitation</p>
            <label class="flex items-center justify-between gap-2 input input-bordered">
              <input min="08:00" max="17:00" class="grow" type="time" v-model="requestData.scheduledtime" required />
            </label>
            <p class="font-medium text-gray-600">Remarks</p>
            <textarea v-model="requestData.coorRemarks" placeholder="Optional"
              class="w-full max-w-xl textarea textarea-bordered textarea-sm"></textarea>

            <div class="flex flex-col gap-2">
              <button type="submit" class="text-lg btn btn-primary btn-block">
                Send Request
              </button>
              <button class="text-lg btn btn-accent btn-outline btn-block" @click="closeRequestModal">
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCoorStore } from "@/stores/CoorStore";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
const coorStore = useCoorStore();
const isModalShow = ref(false);

const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "Name", value: "name" },
  { text: "Address", value: "address" },
  { text: "Date Registered", value: "createdAt" },
  { text: "Memorandum of Agreement", value: "moa" },
  // { text: "Request List", value: "moa" },

  { text: "Action", value: "operation" },
];
const today = new Date().toISOString().split("T")[0];
const requestData = reactive({
  hteId: "",
  coorId: authStore.coorId,
  requestorName: authStore.currentUser,
  requesteeName: "",
  department: authStore.currentDepartment,
  scheduledDate: "",
  scheduledtime: "",
  coorRemarks: "",
});

// const sendRequestHandler = async () => {
//   if()
// };

const openRequestModal = (hteId, hteName) => {
  isModalShow.value = !isModalShow.value;
  requestData.hteId = hteId;
  requestData.requesteeName = hteName;
};

const submitRequestHandler = async () => {
  await coorStore.submitVisiRequest(requestData);

  // alert(response.data.message);
  isModalShow.value = !isModalShow.value;
  requestData.hteId = "";
  requestData.requesteeName = "";
  requestData.scheduledDate = "";
  requestData.scheduledtime = "";
  requestData.coorRemarks = "";
};
const closeRequestModal = () => {
  isModalShow.value = !isModalShow.value;
};
onMounted(async () => {
  await coorStore.fetchHTELists();
  document.title = "OJT Tracker | HTE list";
});
</script>

<style scoped>
.customize-table {

  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

}
</style>
