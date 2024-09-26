<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'DailyTimeRecord' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between md:pb-6">
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
               :rows-per-page="5"
            :hide-rows-per-page="true"
          table-class-name="customize-table"
          border-cell
        >
          <template #item-timeOut="item">
            <p v-if="item.timeOut != null">{{ item.timeOut }}</p>
            <p v-else>No time out data</p>
          </template>
          <!-- <template #item-action="item">
  
            <button class="btn btn-primary" v-if="item.timeOut === null">Set Time Out</button>
          </template> -->
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
  await userStore.fetchInternDailyLogs(route.params.internId);
});

const headers = [
  { text: "DATE", value: "date", width: 100 },
  { text: "TIME IN", value: "timeIn", width: 100 },
  { text: "TIME OUT", value: "timeOut", width: 100 },
  // { text: "ACTIONS", value: "action" },
];
</script>

<style></style>
