<template>
  <div>
    <header class="flex items-center justify-between p-6 bg-gray-200">
      <h1 class="px-3 text-3xl">
        Host <span class="text-3xl font-bold">Training Establishment</span>
      </h1>
    </header>
    <div class="p-6">
      <EasyDataTable
        :headers="headers"
        :items="coorStore.hteList"
        table-class-name="customize-table"
      >
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
            <button
              @click="openRequestModal(item._id, item.name)"
              class="btn btn-primary"
            >
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
              v-model="requestData.remarks"
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
  remarks: "",
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
  requestData.remarks = "";
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
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 80px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

  --easy-table-body-row-height: 60px;
  --easy-table-body-row-font-size: 14px;
}
</style>
