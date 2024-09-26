<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="p-6 text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Evaluation' }">Evaluated</router-link>
        </li>
      </ul>
    </div>
    <section class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between md:pb-6">
        <h1 class="text-lg font-bold md:text-3xl">List of Interns Evaluated</h1>
      </header>
      <div class="flex justify-end gap-3 pb-3">
        <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="department">Department</option>
          <option value="fullName">Full Name</option>
        </select>
      </div>
      <EasyDataTable :headers="headers" :items="hteStore.getListOfFinishedInterns" :search-field="searchField"
        :search-value="searchValue" table-class-name="customize-table"      :rows-per-page="5"
        :hide-rows-per-page="true">
        <template #item-results="item">
          <router-link :to="{ name: 'EvaluationView', params: { id: item.internId } }">View Results</router-link>
        </template>
      </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useHteStore } from "@/stores/HteStore";
const searchField = ref("Set filter");
const searchValue = ref("");
const hteStore = useHteStore();

const headers = [
  { text: "INTERNSHIP POSITION", value: "jobTitle",width: 150 },
  { text: "INTERN", value: "name",width: 150 },
  { text: "DEPARTMENT", value: "department",width: 150 },
  { text: "REMARKS", value: "evaluationStatus",width: 150 },
  { text: "EVALUATION", value: "results",width: 150 },
];

onMounted(async () => {
  await hteStore.fetchApplicantAccepted();
});
</script>
