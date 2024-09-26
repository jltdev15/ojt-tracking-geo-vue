<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
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

    <section class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Interns List</h1>
      </header>
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
        :rows-per-page="5"
        :hide-rows-per-page="true"
        border-cell
      >
        <template #item-dailytimerecord="item">
          <div class="flex justify-start gap-3 py-2">
            <router-link
              :to="{ name: 'DTRList', params: { id: item._id } }"
              class="w-32 btn btn-accent btn-sm btn-outline text-gray-50"
            >
              View
            </router-link>
          </div>
        </template>
        <template #item-status="item">
          <div v-if="item.isEvaluationReady === 'Not Ready'">
            <button border-0 class="bg-red-600 rounded btn-sm text-gray-50">Ongoing Internship</button>
          </div>
          <div v-if="item.isInternshipReady && item.isEvaluationReady === 'Ready'">
            <p>Waiting for evaluation</p>
          </div>
          <div v-if="item.isInternshipReady && item.isEvaluationReady === 'Finished'">
            <p class="inline-block p-3 bg-green-600 rounded text-gray-50">
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
        <template #item-fullName="item">
          <p>{{ item.firstName }} {{ item.lastName }}</p>
        </template>
        <template #item-renderedHours="item">
          <p>{{ item.workedHours.toFixed(0) }}</p>
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
  { text: "NAME", value: "fullName", width: 200 },
  { text: "DEPARTMENT", value: "department" },
  { text: "CONTACT", value: "contact" },
  { text: "REQUIRED HOURS", value: "requiredHours" },
  { text: "RENDERED HOURS", value: "renderedHours" },
  { text: "DAILY TIME RECORD", value: "dailytimerecord" },
  { text: "EVALUATION RESULTS", value: "evaluation",width: 200 },
  { text: "STATUS", value: "status",width: 200 },
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

@media only screen and (max-width: 390px) {
  .customize-table {
    --easy-table-header-item-padding: 0 50px;
  }
}
</style>
