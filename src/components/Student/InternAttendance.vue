<template>
  <div class="p-3 py-3 mx-auto md:w-10/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Logsheets' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between py-3">
        <h1 class="text-3xl font-bold">Attendance Logs</h1>
      </header>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search date e.g MM/DD/YYYY"
          class="w-full my-3 input input-bordered"
          v-model="searchValue"
        />
      </div>
      <EasyDataTable
        :search-field="searchField"
        :search-value="searchValue"
        :headers="headers"
        :items="internStore.attendanceArr"
        table-class-name="customize-table"
      >
        <template #item-timeOut="item">
          <p v-if="item.timeOut">{{ item.timeOut }}</p>
          <p v-else>No time out data</p>
        </template>
        <template #item-hours="item">
          <p v-if="item.totalHours">{{ item.totalHours.toFixed(0) }}</p>
          <p v-else-if="item.timeOut">{{ item.totalHours }}</p>
          <p v-else>Waiting for Time Out data</p>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { onMounted, ref } from "vue";
const internStore = useInternStore();
const searchField = ref("date");
const searchValue = ref("");
onMounted(async () => {
  await internStore.getAttendanceHandler();
});

const headers = [
  { text: "DATE", value: "date", width: 200 },
  { text: "TIME IN", value: "timeIn", width: 200 },
  { text: "TIME OUT", value: "timeOut", width: 200 },
  { text: "TOTAL HOURS", value: "hours", width: 200 },
];
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
