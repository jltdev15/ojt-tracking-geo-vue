<template>
  <div class="w-10/12 mx-auto">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'DailyTimeRecord' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6">
      <h1 class="text-3xl font-bold">Attendance Logs</h1>
    </header>
    <div class="p-3 m-3 shadow-md rounded-xl">
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
