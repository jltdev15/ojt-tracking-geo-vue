<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Intern Monitoring</h1>
    </header>
    <!-- <EasyDataTable
      :headers="headers"
      :items="hteStore.getListOfInternApplication"
      table-class-name="customize-table"
    >
    </EasyDataTable> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useHteStore } from "@/stores/HteStore";
const hteStore = useHteStore();

onMounted(async () => {
  await hteStore.fetchInternships();
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
  await hteStore.getOnlineInterns();
});
</script>

<style lang="scss" scoped></style>
