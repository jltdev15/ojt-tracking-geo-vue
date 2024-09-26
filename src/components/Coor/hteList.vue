<template>
  <div class="p-3 py-3 mx-auto md:w-10/12 xl:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'HteList' }">HTE List</router-link>
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between ">
        <h1 class="md:text-3xl">
          Host <span class="font-bold md:text-3xl">Training Establishment</span>
        </h1>
      </header>
      <div class="flex flex-col justify-end gap-3 py-3 md:flex-row">
        <input
          type="text"
          placeholder="Search here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="md:w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="fullName">HTE Name</option>
        </select>
      </div>
      <div class="">
        <EasyDataTable
          border-cell
          :headers="headers"
          :items="coorStore.hteList"

          table-class-name="customize-table"
        >
          <template #item-moa="item">
            <div v-if="item.moaAttachement" class="text-center">
              <a
                class="text-blue-500 underline btn btn-accent btn-sm btn-outline"
                :href="item.moaAttachement"
                target="_blank"
                >View MOA</a
              >
            </div>
            <div v-else>
              <button @click="openUpdateModal(item._id)" class="btn btn-primary">
                Upload MOA
              </button>
            </div>
          </template>
          <template #item-operation="item">
            <div class="">
              <button
                @click="openRequestModal(item._id, item.fullName)"
                class="btn btn-primary btn-sm"
              >
                Create Request
              </button>
            </div>
          </template>
          <template #item-address="item">
            <p>
              {{ item.street }} {{ item.brgy }} {{ item.municipality }} {{ item.province }}
            </p>
          </template>
        </EasyDataTable>
  
      </div>
    </div>
    
    <Modal :show="isModalShow" title="New Request">
      <form @submit.prevent="submitRequestHandler" action="">
        <div class="flex flex-col gap-3 pt-3">
          <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
          <p class="font-medium text-gray-600">Date of Visitation</p>
          <label class="flex items-center gap-2 input input-bordered">
            <input
              v-model="requestData.scheduledDate"
              type="date"
              :min="today"
              class="grow"
              placeholder="Date of Visitation"
              required
            />
          </label>
          <p class="font-medium text-gray-600">Time of Visitation</p>
          <label class="flex items-center justify-between gap-2 input input-bordered">
            <input
              min="08:00"
              max="17:00"
              class="grow"
              type="time"
              v-model="requestData.scheduledtime"
              required
            />
          </label>
          <p class="font-medium text-gray-600">Remarks</p>
          <textarea
            v-model="requestData.coorRemarks"
            placeholder="Optional"
            class="w-full max-w-xl textarea textarea-bordered textarea-sm"
          ></textarea>

          <div class="flex flex-col gap-2">
            <button type="submit" class="text-lg btn btn-primary btn-block">
              Send Request
            </button>
            <button
              class="text-lg btn btn-accent btn-outline btn-block"
              @click="closeRequestModal"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </Modal>
    <Modal :show="isUpdateModalShow" title="Update MOA">
      <form @submit.prevent="submitUpdatedMOA">
        <div class="flex flex-col gap-3 pt-3">
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              MOA
              <span class="px-3 text-sm text-red-600 font-extralight">(required)</span>
            </h2>
          </header>
          <div class="py-1 mb-3 border">
            <input
              placeholder="Supporting documents"
              type="file"
              name="files"
              accept="application/pdf, image/jpeg, image/png"
              id="supporting_document"
              ref="fileInput "
              class="w-full max-w-3xl file-input file-input-bordered"
              @change="handleFileChange"
              required
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <button type="submit" class="text-lg btn btn-primary btn-block">
              Update
            </button>
            <button
              class="text-lg btn btn-accent btn-outline btn-block"
              @click="isUpdateModalShow = !isUpdateModalShow"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCoorStore } from "@/stores/CoorStore";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
const coorStore = useCoorStore();
const isModalShow = ref(false);
const isUpdateModalShow = ref(false);
const isFileSizeExceed = ref(false);
const searchField = ref("Set filter");
const searchValue = ref("");
const hteId = ref("");
const fileMoa = ref(null);
const headers = [
  { text: "Name", value: "fullName", width: 150 },
  { text: "Address", value: "address" , width: 150},
  { text: "Date Registered", value: "createdAt" , width: 150},
  { text: "Memorandum of Agreement", value: "moa" , width: 150},
  // { text: "Request List", value: "moa" },

  { text: "Action", value: "operation", width: 200 },
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

const openUpdateModal = (id) => {
  hteId.value = id;
  isUpdateModalShow.value = !isUpdateModalShow.value;
};

const handleFileChange = (event) => {
  fileMoa.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};

const submitUpdatedMOA = async () => {
  const formData = new FormData();
  formData.append("file", fileMoa.value);
  try {
    await coorStore.updateMOAhte(hteId.value, formData);
    isUpdateModalShow.value = !isUpdateModalShow.value;
  } catch (err) {
    console.log(err);
  }
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
</style>
