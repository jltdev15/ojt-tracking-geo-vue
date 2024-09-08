<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Hte Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'hte_settings' }">Settings</router-link>
        </li>
      </ul>
      <section>
        <header class="flex items-center justify-between py-3 bg-gray-200">
          <h1 class="text-3xl">
            Change <span class="text-3xl font-bold">Password</span>
          </h1>
        </header>
        <form @submit.prevent="changePasswordHandler" action="">
          <div class="flex flex-col max-w-md gap-4">
            <label class="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model.trim="passwordData.oldPassword" type="password" class="grow" value=""
                placeholder="Old Password" required />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model.trim="passwordData.newPassword" type="password" class="grow" value=""
                placeholder="New Password" required />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model.trim="passwordData.confirmPassword" type="password" class="grow" value=""
                placeholder="Confirm Password" required />
            </label>
            <button type="submit" class="btn btn-primary">Change Password</button>
          </div>
        </form>
      </section>
      <div class="p-3 shadow-md md:w-3/6">
        <h1 class="text-3xl">
          Reset <span class="text-3xl font-bold">Device Restrictions</span>
        </h1>
        <span></span>
        <div class="flex justify-end gap-3 py-3">
          <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
          <select class="w-48 select select-bordered" v-model.trim="searchField">
            <option selected disabled value="Set filter">Set filter</option>
            <option value="name">Intern name</option>
          </select>
        </div>
        <div class="py-3">
          <EasyDataTable :headers="headers" :items="hteStore.getListOfAcceptedInternsSession"
            :search-field="searchField" :search-value="searchValue" table-class-name="customize-table">
            <template #item-department="item">
              <p>{{ item.department }}</p>
            </template>
            <template #item-operation="item">
              <div>
                <button @click="toggleConfirmationModal(item.internId)" class="btn btn-sm btn-accent">
                  Reset Account
                </button>
              </div>
            </template>
          </EasyDataTable>
        </div>
        <Modal title="Confirmation" :show="confirmModalShow">
          <template #default>
            <p class="text-xl font-medium capitalize">Reset account restriction?</p>
            <div class="flex justify-end gap-3 pt-9">
              <button @click="confirmModalShow = !confirmModalShow" class="btn btn-accent btn-outline">
                Cancel
              </button>
              <button type="button" @click="resetDeviceHandler" class="btn-primary btn text-gray-50">
                Proceed
              </button>
            </div>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHteStore } from "@/stores/HteStore";
import { ref, reactive, onMounted } from "vue";
import apiClient from "@/config/axiosClient";

const searchField = ref("Set filter");
const searchValue = ref("");
const internIdtoReset = ref("");
const confirmModalShow = ref(false);
const passwordData = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const hteStore = useHteStore();

const changePasswordHandler = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    return alert("Confirm password doesnt match");
  }
  try {
    const response = await apiClient.patch("/hte/password/change", {
      oldpass: passwordData.oldPassword,
      newpass: passwordData.newPassword,
    });
    console.log(response);
    alert("Password successfully changed!");
  } catch (err) {
    console.log(err);
    alert(err.response.data.content);
  }
};
const headers = [
  { text: "Intern Name", value: "name" },
  { text: "Department", value: "department" },
  { text: "ACTIONS", value: "operation" },
];
onMounted(async () => {
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
});

const toggleConfirmationModal = (id) => {
  console.log("====================================");
  console.log(id);
  console.log("====================================");
  internIdtoReset.value = id;
  confirmModalShow.value = !confirmModalShow.value;
};
const resetDeviceHandler = async () => {
  await hteStore.resetDeviceRestriction(internIdtoReset.value);
  await hteStore.fetchApplicantAccepted();
  confirmModalShow.value = !confirmModalShow.value;
};
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

}
</style>
