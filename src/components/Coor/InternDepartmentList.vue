<template>
  <header class="">
    <h1 class="p-6 text-3xl font-bold">Interns List</h1>
  </header>
  <div class="p-6">
    <EasyDataTable
      :headers="headers"
      :items="coorStore.internList"
      border-cell
      table-class-name="customize-table"
    >
      <template #item-operation="item">
        <div v-if="item.requiredHours === 0" class="flex gap-3">
          <button
            @click="acceptOffer(item.applicationId)"
            class="btn btn-block btn-primary"
          >
            Set required hours
          </button>
        </div>
        <div v-else>
          <p>No action needed</p>
        </div>
      </template>
      <template #item-evaluation="item">
        <div v-if="item.isEvaluationReady" class="flex gap-3">
          <button
            @click="acceptOffer(item.applicationId)"
            class="btn btn-block btn-primary"
          >
            View evalution
          </button>
        </div>
        <div v-else>
          <p>Evaluation not found</p>
        </div>
      </template>
      <template #item-rendered="item">
        <p>{{ item.workedHours.toFixed() }}</p>
      </template>
      <template #loading>
        <img
          src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
          style="width: 100px; height: 80px"
        />
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup>
import { useCoorStore } from "@/stores/CoorStore";
import { onMounted } from "vue";
const coorStore = useCoorStore();
const headers = [
  { text: "Full name", value: "fullName", width: 200 },
  { text: "Department", value: "department" },
  { text: "Hours Required", value: "requiredHours" },
  { text: "Hours Rendered", value: "rendered" },
  { text: "Evaluation", value: "evaluation" },
  { text: "Action", value: "operation", width: 200 },
];

onMounted(async () => {
  await coorStore.fetchInternLists();
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
