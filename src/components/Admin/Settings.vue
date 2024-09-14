<template>
  <div class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'appSettings' }">Settings</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6">
      <h1 class="text-3xl font-bold">Manage Settings</h1>
    </header>
    <section class="flex flex-col p-3 gap-9">
      <div class="md:w-3/6 p-3 shadow-md rounded-lg">
        <p class="py-3 font-medium capitalize">Department List</p>
        <div class="flex items-center justify-between gap-3">
          <input
            v-model.trim="departmentName"
            type="text "
            class="w-full input"
            placeholder="New department"
          />
          <button @click="addDepartmentHandler" class="btn btn-primary">Add</button>
        </div>
        <div class="py-3">
          <ul>
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
              class="flex items-center justify-between gap-3 p-2 bg-gray-50"
            >
              <div class="w-full">
                <input
                  :disabled="updateEnabled !== index"
                  type="text"
                  class="w-full p-3"
                  v-model="item.name"
                />
              </div>

              <div class="flex items-center gap-3">
                <span
                  @click="toggleEdit(index, item.name, item._id)"
                  class="p-2 cursor-pointer bg-primary text-gray-50"
                >
                  {{ updateEnabled === index ? "Save" : "Edit" }}</span
                >

                <span
                  @click="adminUserStore.deleteDepartmentList(item._id)"
                  class="p-2 bg-red-600 cursor-pointer text-gray-50"
                  >Remove</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="md:w-3/6 p-3 shadow-md rounded-lg">
        <p class="py-3 font-medium capitalize">Reset Device Restrictions</p>
        <span></span>
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
const updatedName = ref(null);
const updateEnabled = ref(null);
const internIdtoReset = ref("");
const addDepartmentHandler = async () => {
  if (departmentName.value === "") {
    return alert("Empty field, Please fill up Department name");
  }
  await adminUserStore.addDepartmentList({ name: departmentName.value });
  departmentName.value = "";
};
const toggleEdit = (index, payload, id) => {
  if (updateEnabled.value === index) {
    adminUserStore.updateDepartmentList(id, { name: payload });
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

<style lang="scss" scoped></style>
