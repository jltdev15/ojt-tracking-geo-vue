<template>
  <div>
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Attendance Logs</h1>
    </header>
    <div class="md:w-3/6 p-3 m-3 shadow-md rounded-xl">
      <EasyDataTable
        :headers="headers"
        :items="internStore.attendanceArr"
        table-class-name="customize-table"
      >
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { onMounted } from "vue";
const internStore = useInternStore();

onMounted(async () => {
  await internStore.getAttendanceHandler();
});

const headers = [
  { text: "DATE", value: "date", width: 200 },
  { text: "TIME IN", value: "timeIn" },
  { text: "TIME OUT", value: "timeOut" },
];
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 12px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
