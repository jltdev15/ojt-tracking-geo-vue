<template>
  <EasyDataTable
    :headers="headers"
    :items="props.appInfoArr"
    table-class-name="customize-table"
  >
  </EasyDataTable>
</template>

<script setup>
const props = defineProps({
  appInfoArr: {
    type: Array,
  },
});

const headers = [
  { text: "APPLICATION ID", value: "applicationId", width: 200 },
  { text: "DATE APPLIED", value: "DateApplied" },
  { text: "COMPANY NAME", value: "company" },
  { text: "JOB TITLE", value: "jobTitle" },
  { text: "STATUS", value: "status", width: 200 },
  { text: "ACTIONS", value: "operation", width: 200 },
];
</script>

<style lang="scss" scoped></style>
