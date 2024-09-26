<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'CoorDailyTimeRecord' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between ">
        <h1 class="font-bold md:text-3xl">Attendance Logs</h1>
      </header>
        <div class="flex flex-col justify-end gap-3 py-3 md:flex-row">
          <input
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
            v-model="searchValue"
          />
          <select class="md:w-48 select select-bordered" v-model.trim="searchField">
            <option selected disabled value="Set filter">Set filter</option>
            <option value="date">Date</option>
          </select>
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
const searchField = ref("Set filter");
const searchValue = ref("");
onMounted(async () => {
  await userStore.fetchInternDailyLogs(route.params.id);
});

const headers = [
  { text: "DATE", value: "date", width: 100 },
  { text: "TIME IN", value: "timeIn",width:100 },
  { text: "TIME OUT", value: "timeOut",width:100 },
];
</script>

<style scoped>
</style>
