<template>
  <div class="w-full p-3 mx-auto md:w-5/6">
    <div class="px-3 py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'appSettings' }">Settings</router-link>
        </li>
      </ul>
    </div>

    <section class="grid grid-cols-1 gap-6 p-3 rounded-md shadow-md md:grid-cols-2 bg-gray-50 md:p-6">
      <header class="flex items-center justify-between md:col-span-2">
        <h1 class="text-3xl font-bold">Manage Settings</h1>
      </header>
      <div class="">
        <p class="font-bold capitalize md:py-3">Department List</p>
        <div class="flex items-center justify-between gap-3">
          <input
            v-model.trim="departmentName"
            type="text "
            class="w-full input"
            placeholder="New department"
          />
          <input
            v-model.trim="hours"
            type="number "
            class="w-3/6 input"
            placeholder="Required Hours"
          />
          <button @click="addDepartmentHandler" class="w-1/6 btn btn-primary">Add</button>
        </div>
        <div class="py-3 h-[50dvh] md:h-[50dvh] overflow-auto">
          <ul class="flex flex-col gap-3">
            <p
              class="font-medium text-center"
              v-if="adminUserStore.departmentlist.length === 0"
            >
              No data found
            </p>
            <li
              v-else
              v-for="(item, index) in adminUserStore.departmentlist"
              :key="index"
              class="flex flex-col items-center justify-between p-2 pb-3 bg-gray-100 rounded-md shadow-md"
            >
              <div class="w-full md:px-3">
                <div class="flex items-center gap-3 md:py-3">
                  <label for="">Name</label>
                  <input
                    :disabled="updateEnabled !== index"
                    type="text"
                    class="w-full input input-md"
                    v-model="item.name"
                  />
                </div>
                <div class="flex items-center justify-end gap-3 py-3">
                  <p>Hours</p>
                  <input
                    :disabled="updateEnabled !== index"
                    type="number"
                    class="w-full input input-md"
                    v-model="item.hours"
                  />
                </div>
              </div>

              <div class="flex items-center justify-end gap-3 ml-auto md:px-3">
                <span
                  @click="adminUserStore.deleteDepartmentList(item._id)"
                  class="w-24 cursor-pointer btn-outline btn btn-accent"
                  >Remove</span
                >
                <span
                  @click="toggleEdit(index, item, item._id)"
                  class="w-24 cursor-pointer btn bg-primary btn-primary"
                >
                  {{ updateEnabled === index ? "Save" : "Edit" }}</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="">
        <p class="py-3 font-bold capitalize">Reset Device Restrictions</p>
        <div class="flex justify-end gap-3">
          <input
            type="text"
            placeholder="Search Username"
            class="w-full input"
            v-model="searchValue"
          />
          <select class="w-48 select select-bordered" v-model.trim="searchField">
            <option selected disabled value="Set filter">Set filter</option>
            <option value="Username">Username</option>
          </select>
        </div>
        <div class="py-3">
          <EasyDataTable
            :headers="headers"
            :items="adminUserStore.getInternAccounts"
            :search-field="searchField"
            :search-value="searchValue"
            table-class-name="customize-table"
            :rows-per-page="5"
            :hide-rows-per-page="true"
          >
            <template #item-department="item">
              <p>{{ item.profile.department }}</p>
            </template>
            <template #item-operation="item">
              <div>
                <button
                  @click="toggleConfirmationModal(item.profile._id)"
                  class="btn btn-sm btn-accent"
                >
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
              <button
                @click="confirmModalShow = !confirmModalShow"
                class="btn btn-accent btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="resetDeviceHandler"
                class="btn-primary btn text-gray-50"
              >
                Proceed
              </button>
            </div>
          </template>
        </Modal>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, ref } from "vue";
const adminUserStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const confirmModalShow = ref(false);
const departmentName = ref("");
const hours = ref("");
const updatedName = ref(null);
const updateEnabled = ref(null);
const internIdtoReset = ref("");
const addDepartmentHandler = async () => {
  if (departmentName.value === "") {
    return alert("Empty field, Please fill up Department name");
  }
  if (hours.value === "") {
    return alert("Empty field, Please fill up the required hours");
  }
  await adminUserStore.addDepartmentList({
    name: departmentName.value,
    hours: hours.value,
  });
  departmentName.value = "";
  hours.value = "";
};
const toggleEdit = (index, payload, id) => {
  if (updateEnabled.value === index) {
    adminUserStore.updateDepartmentList(id, { name: payload.name, hours: payload.hours });
    updateEnabled.value = null;
  } else {
    updateEnabled.value = index;
  }
};
const updateHandler = () => {
  if (updatedName.value === "") {
    return alert("Update Error, Please dont submit with empty field");
  }
};
const headers = [
  { text: "USERNAME", value: "username" },
  { text: "DEPARTMENT", value: "department" },
  { text: "ACTIONS", value: "operation" },
];

const toggleConfirmationModal = (id) => {
  console.log("====================================");
  console.log(id);
  console.log("====================================");
  internIdtoReset.value = id;
  confirmModalShow.value = !confirmModalShow.value;
};
const resetDeviceHandler = async () => {
  await adminUserStore.resetDeviceRestriction(internIdtoReset.value);
  await adminUserStore.fetchUsers();
  confirmModalShow.value = !confirmModalShow.value;
};

onMounted(async () => {
  await adminUserStore.fetchDepartmentList();
  await adminUserStore.fetchInternsList();
  await adminUserStore.fetchUsers();
});
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
