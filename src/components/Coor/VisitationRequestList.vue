<template>
  <div>
    <header class="">
      <h1 class="p-6 text-3xl font-bold">Visitation Request List</h1>
    </header>
    <div class="p-6">
      <EasyDataTable
        :headers="headers"
        :items="coorStore.requestList"
        table-class-name="customize-table"
      >
        <template #item-operation="">
          <div class="">
            <button class="btn">Create Request</button>
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCoorStore } from "@/stores/CoorStore";
const coorStore = useCoorStore();
const headers = [
  { text: "Company Name", value: "name", width: 300 },
  { text: "Request Date", value: "address" },
  { text: "Request Time", value: "createdAt" },
  { text: "Status", value: "moa" },
  { text: "Remarks", value: "moa" },

  { text: "Action", value: "operation", width: 200 },
];
onMounted(async () => {
  await coorStore.fetchHTELists();
  document.title = "OJT Tracker | Request list";
});
</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 80px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

  --easy-table-body-row-height: 60px;
  --easy-table-body-row-font-size: 14px;
}
</style>
