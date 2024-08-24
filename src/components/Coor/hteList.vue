<template>
  <div>
    <header class="">
      <h1 class="p-6 text-3xl font-bold">Host Training Establishment List</h1>
    </header>
    <div class="p-6">
      <EasyDataTable
        :headers="headers"
        :items="coorStore.hteList"
        table-class-name="customize-table"
      >
        <template #item-moa="item">
          <div v-if="item.hasMoa === 'true'">
            <p>MOA Available</p>
          </div>
          <div v-else>
            <p>MOA not available</p>
          </div>
        </template>
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
  { text: "Name", value: "name", width: 100 },
  { text: "Address", value: "address" },
  { text: "Date Registered", value: "createdAt" },
  { text: "Memorandum of Agreement", value: "moa" },
  { text: "Request List", value: "moa" },

  { text: "Action", value: "operation", width: 200 },
];
onMounted(async () => {
  await coorStore.fetchHTELists();
  document.title = "OJT Tracker | HTE list";
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
