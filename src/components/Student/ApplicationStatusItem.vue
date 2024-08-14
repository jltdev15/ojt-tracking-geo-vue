<template>
  <EasyDataTable
    :headers="headers"
    :items="props.appInfoArr"
    table-class-name="customize-table"
  >
    <template #item-status="item">

        <p v-if="item.status === 'Accepted'" class="inline-block w-full p-2 font-medium text-center text-gray-50" :class="{'bg-green-600': item.status === 'Accepted'}">{{item.status}}</p>
        <p v-if="item.status === 'Pending'" class="inline-block w-full p-2 font-medium text-center text-gray-50" :class="{'bg-red-700': item.status === 'Pending'}">{{item.status}}</p>
        <p v-if="item.status === 'Approved'" class="inline-block w-full p-2 font-medium text-center text-gray-50" :class="{'bg-gray-400': item.status === 'Approved'}">{{item.status}}</p>
  
    </template>
    <template  #item-operation="item" >
      <div v-if="item.status === 'Approved'" class="flex gap-3">
        <button :disabled="authStore.isInternReady" @click="acceptOffer(item.applicationId)" class="btn btn-primary">Accept</button>
        <button class="btn btn-outline">Decline</button>
      </div>
      <div v-else>
        <p>No action needed</p>
      </div>
    </template>
  </EasyDataTable>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useInternStore } from "@/stores/InternStore";
import { useRouter } from "vue-router";
const router = useRouter();
const internStore = useInternStore();
const authStore = useAuthStore();
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
const acceptOffer = async (id) => {
  await internStore.handleAcceptOffer(id);
  router.push({ name: "student_dashboard" });
};
</script>

<style lang="scss" scoped></style>
