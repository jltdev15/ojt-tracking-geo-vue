<template>
  <EasyDataTable
    :headers="headers"
    :items="props.appInfoArr"
    table-class-name="customize-table"
  >
    <template #item-operation="item">
      <div v-if="item.status === 'Approved'" class="flex gap-3">
        <button @click="internStore.handleAcceptOffer(item.applicationId)" class="btn btn-primary">Accept</button>
        <button class="btn btn-outline">Decline</button>
      </div>
      <div v-else>
        <p>No action needed</p>
      </div>
    </template>
  </EasyDataTable>
</template>

<script setup>
import { useInternStore } from '@/stores/InternStore';
const internStore = useInternStore()
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
