<template>
  <EasyDataTable
    :headers="headers"
    :items="props.appInfoArr"
    table-class-name="customize-table"
  >
    <template #item-status="item">
      <p
        v-if="item.status === 'Accepted'"
        class="inline-block p-2 font-medium text-center rounded-md text-gray-50"
        :class="{ 'bg-green-600': item.status === 'Accepted' }"
      >
        {{ item.status }}
      </p>
      <p
        v-if="item.status === 'Finished'"
        class="inline-block w-full p-2 text-center text-gray-50"
        :class="{ 'bg-green-800': item.status === 'Finished' }"
      >
        {{ item.status }}
      </p>
      <p
        v-if="item.status === 'Pending'"
        class="inline-block w-full p-2 text-center rounded-md text-gray-50"
        :class="{ 'bg-red-700': item.status === 'Pending' }"
      >
        {{ item.status }}
      </p>
      <p
        v-if="item.status === 'Approved'"
        class="inline-block p-2 text-center rounded-md text-gray-50"
        :class="{ 'bg-green-600': item.status === 'Approved' }"
      >
        {{ item.status }}
      </p>
      <p
        v-if="item.status === 'Rejected'"
        class="inline-block w-full p-2 text-center text-gray-50"
        :class="{ 'bg-red-900': item.status === 'Rejected' }"
      >
        {{ item.status }}
      </p>
    </template>
    <template #item-operation="item">
      <div v-if="item.status === 'Accepted'" class="flex gap-3">
        <p class="inline-block p-2 bg-gray-500 rounded-md text-gray-50">No action needed</p>
      </div>
      <div v-if="item.status === 'Finished'" class="flex gap-3">
        <p class="p-2 bg-blue-500 rounded text-gray-50">
          <router-link :to="{ name: 'EvaluationResults' }">View evaluation</router-link>
        </p>
      </div>
      <!-- <div v-if="item.status === 'Pending'" class="flex gap-3">
        <router-link :to="{ name: 'ApplicationUpdate', params: { id: item.applicationId } }"
          class=" btn btn-accent btn-outline">Update
          Application</router-link>
      </div> -->
      <div v-if="item.status === 'Rejected'" class="flex gap-3">
        <button
          @click="removeApplication(item.applicationId)"
          class="btn btn-accent btn-outline"
        >
          Remove Application
        </button>
      </div>
      <div v-if="item.status === 'Approved' && !authStore.isInternReady" class="flex gap-3">
        <button
          :disabled="authStore.isInternReady"
          @click="acceptOffer(item.applicationId)"
          class="btn btn-primary"
        >
          Accept
        </button>
        <button class="btn btn-outline">Decline</button>
      </div>
      <div v-if="item.status === 'Approved' && authStore.isInternReady" class="flex gap-3">
        <button
        @click="removeApplication(item.applicationId)"
        class="btn btn-block btn-primary"
      >
        Remove Application
      </button>
        <button class="btn btn-outline">Decline</button>
      </div>
      <div v-if="item.status === 'Pending'">
        <button
          @click="removeApplication(item.applicationId)"
          class="btn btn-sm btn-block btn-outline btn-accent"
        >
          Cancel Application
        </button>
      </div>
    </template>
  </EasyDataTable>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useInternStore } from "@/stores/InternStore";
import { onMounted } from "vue";
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
  // { text: "APPLICATION ID", value: "applicationId" },
  { text: "DATE APPLIED", value: "DateApplied" },
  { text: "COMPANY NAME", value: "company" },
  { text: "JOB TITLE", value: "jobTitle" },
  { text: "STATUS", value: "status" },
  { text: "ACTIONS", value: "operation", width: "200" },
];
const acceptOffer = async (id) => {
  await internStore.handleAcceptOffer(id);
  router.push({ name: "student_dashboard" });
};

const removeApplication = async (applicationId) => {
  await internStore.removeApplicationHandler(applicationId);
  await internStore.fetchApplicationList();
};
</script>

<style lang="scss" scoped></style>
