<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'CoorDailyTimeRecord' }">Logs</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6">
      <h1 class="text-3xl font-bold">Attendance Logs</h1>
    </header>
    <div class="w-3/6 p-3 m-3 shadow-md rounded-xl">
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Type here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="date">Date</option>
        </select>
      </div>
      <EasyDataTable
        :headers="headers"
        :items="userStore.attendanceArr"
        :search-field="searchField"
        :search-value="searchValue"
        show-index
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
  { text: "DATE", value: "date", width: 200 },
  { text: "TIME IN", value: "timeIn" },
  { text: "TIME OUT", value: "timeOut" },
];
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
