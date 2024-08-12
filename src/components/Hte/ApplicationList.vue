<template>
  <div>List of Application</div>
  <EasyDataTable
    :headers="headers"
    :items="hteStore.applicantList"
    table-class-name="customize-table"
  >
  </EasyDataTable>
</template>

<script setup>
import { onMounted } from "vue";
import { useHteStore } from "@/stores/HteStore";
const hteStore = useHteStore();

onMounted(async () => {
  await hteStore.fetchApplicantList();
});

const headers = [{ text: "TITLE", value: "title" }];
</script>

<style lang="scss" scoped></style>
