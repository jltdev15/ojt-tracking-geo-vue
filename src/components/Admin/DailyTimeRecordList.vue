<template>
  <div class="p-3 py-3 mx-auto md:w-10/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'InternsList' }">Interns List</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'DTRList' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Attendance Logs</h1>
      </header>
      <div class="">
        <div class="flex justify-end gap-3 py-3">
          <input
            type="text"
            placeholder="Search date e.g MM/DD/YYYY"
            class="w-full input input-bordered"
            v-model="searchValue"
          />
        </div>
        <EasyDataTable
          :headers="headers"
          :items="userStore.attendanceArr"
          :search-field="searchField"
          :search-value="searchValue"
          table-class-name="customize-table"
          :rows-per-page="5"
          :hide-rows-per-page="true"
        >
          <template #item-timeOut="item">
            <p v-if="item.timeOut != null">{{ item.timeOut }}</p>
            <p v-else>No time out data</p>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
const userStore = useAdminUserStore();
const route = useRoute();
const searchField = ref("date");
const searchValue = ref("");
onMounted(async () => {
  await userStore.fetchInternDailyLogs(route.params.id);
});

const headers = [
  { text: "DATE", value: "date", width: 200 },
  { text: "TIME IN", value: "timeIn", width: 200 },
  { text: "TIME OUT", value: "timeOut", width: 200 },
];
</script>

<style scoped>
.customize-table {
  --easy-table-header-background-color: #ae1818;
}
</style>
