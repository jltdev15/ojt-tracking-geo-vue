<template>
  <div class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="font-medium" :to="{ name: 'InternsList' }"
            >Intern List</router-link
          >
        </li>
      </ul>
    </div>
    <header class="px-6 text-center md:text-left">
      <h1 class="text-3xl font-bold">Interns List</h1>
    </header>
    <section class="md:px-6">
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Type here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="department">Department</option>
          <option value="fullName">Full Name</option>
        </select>
      </div>

      <EasyDataTable
        :headers="headers"
        :items="userStore.internsList"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
      >
        <template #item-dailytimerecord="item">
          <div class="flex justify-between gap-3 py-2">
            <router-link
              :to="{ name: 'DTRList', params: { id: item._id } }"
              class="btn btn-accent btn-outline text-gray-50"
            >
              View
            </router-link>
          </div>
        </template>
        <template #item-status="item">
          <div v-if="item.isInternshipReady && item.isEvaluationReady === 'Not Ready'">
            <p>Ongoing Internship</p>
          </div>
          <div v-if="item.isInternshipReady && item.isEvaluationReady === 'Ready'">
            <p>Waiting for evaluation</p>
          </div>
          <div v-if="item.isInternshipReady && item.isEvaluationReady === 'Finished'">
            <p class="inline-block rounded p-3 text-gray-50 bg-green-600">
              Done Internship
            </p>
          </div>
        </template>
        <template #item-evaluation="item">
          <div v-if="item.isEvaluationReady === 'Finished'">
            <router-link
              class="bg-blue-500 text-gray-50 btn"
              :to="{ name: 'AdminEvaluation', params: { id: item._id } }"
              >View evaluation</router-link
            >
          </div>
          <div v-else>
            <p>No evaluation found</p>
          </div>
        </template>
      </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, ref } from "vue";
const userStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "NAME", value: "fullName" },
  { text: "DEPARTMENT", value: "department" },
  { text: "CONTACT", value: "contact" },
  { text: "REQUIRED HOURS", value: "requiredHours" },
  { text: "RENDERED HOURS", value: "workedHours" },
  { text: "DAILY TIME RECORD", value: "dailytimerecord" },
  { text: "EVALUATION RESULTS", value: "evaluation" },
  { text: "STATUS", value: "status" },
];

onMounted(async () => {
  await userStore.fetchInternsList();
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
