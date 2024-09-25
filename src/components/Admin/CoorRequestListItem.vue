<template>
  <div class="p-3 py-3 mx-auto md:w-10/12">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'CoordinatorList' }"
            >Coordinator</router-link
          >
        </li>
        <li>
          <router-link class="" :to="{ name: 'CoordinatorRequestItem' }"
            >Request List</router-link
          >
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ adminUserStore.requestListBy }}</h1>
      </header>
      <div class="flex justify-end gap-3 py-3">
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
      <div class="">
        <EasyDataTable
          :headers="headers"
          :items="adminUserStore.coorRequestList"
          :search-field="searchField"
          :search-value="searchValue"
          :hide-rows-per-page="true"
          table-class-name="customize-table"
        >
          <template #item-status="item">
            <p
              class="bg-red-600 text-center rounded-md py-1 text-gray-50"
              v-if="item.status === 'Pending'"
            >
              {{ item.status }}
            </p>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useRoute } from "vue-router";
const route = useRoute();
const adminUserStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "Department", value: "department" },
  { text: "Request By", value: "requestorName" },
  { text: "Request To", value: "requesteeName" },
  { text: "Date Request", value: "scheduledDate" },
  { text: "Time Request", value: "scheduledtime" },
  { text: "Status", value: "status" },
];

onMounted(async () => {
  await adminUserStore.fetchCoorRequestList(route.params.id);
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
