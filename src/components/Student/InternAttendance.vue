<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Logsheets' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Attendance Logs</h1>
    </header>
    <div class="p-3 shadow-md md:w-4/6 rounded-xl">
      <input type="text" placeholder="Search date e.g MM/DD/YYYY" class="w-full my-3 input input-bordered"
        v-model="searchValue" />
      <EasyDataTable :search-field="searchField" :search-value="searchValue" :headers="headers"
        :items="internStore.attendanceArr" table-class-name="customize-table">


        <template #item-timeOut="item">
          <p v-if="item.timeOut">{{ item.timeOut }}</p>
          <p v-else>No time out data
          </p>
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
