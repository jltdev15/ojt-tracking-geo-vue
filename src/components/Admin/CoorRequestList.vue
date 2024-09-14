<template>
  <div class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'hteLists' }">List</router-link>
        </li>
        <!-- <li>
                    <router-link class="text-red-800" :to="{ name: 'UpdateUser' }">Update user</router-link>
                </li> -->
      </ul>
    </div>
    <header class="flex items-center justify-between px-6">
      <h1 class="text-3xl font-bold">Visit Request</h1>
    </header>
    <div class="flex justify-end gap-3 p-6">
      <input
        type="text"
        placeholder="Type here"
        class="w-full input input-bordered"
        v-model="searchValue"
      />
      <select class="w-48 select select-bordered" v-model.trim="searchField">
        <option selected disabled value="Set filter">Set filter</option>
        <option value="Username">Username</option>
      </select>
    </div>
    <div class="md:px-6">
      <EasyDataTable
        :headers="headers"
        :items="adminUserStore.requestList"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
      >
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
const adminUserStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "Request By", value: "requestorName" },
  { text: "Request To", value: "requesteeName" },
  { text: "Date Request", value: "scheduledDate" },
  { text: "Time Request", value: "scheduledtime" },
  { text: "Department", value: "department" },
  { text: "Status", value: "status" },
];

onMounted(async () => {
  await adminUserStore.fetchRequestList();
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
