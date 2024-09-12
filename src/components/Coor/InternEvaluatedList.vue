<template>
  <div class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Evaluation' }">Evaluated</router-link>
        </li>
      </ul>
    </div>
    <section class="px-6">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">List of Interns Evaluated</h1>
      </header>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="fullName">HTE Name</option>
          <option value="Intern">Intern Name</option>
          <option value="Department">Department</option>
        </select>
      </div>
      <EasyDataTable
        :headers="headers"
        :items="coorStore.internEvaluationList"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
        show-index
      >
        <template #item-results="item">
          <router-link :to="{ name: 'CoorEvaluationView', params: { id: item.internId } }"
            >View Results</router-link
          >
        </template>
      </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCoorStore } from "@/stores/CoorStore";
const searchField = ref("Set filter");
const searchValue = ref("");
const coorStore = useCoorStore();

const headers = [
  { text: "INTERN", value: "internName" },
  { text: "HTE NAME", value: "hteName" },
  { text: "REMARKS", value: "comment" },
  { text: "EVALUATION", value: "results" },
];

onMounted(async () => {
  await coorStore.getInternEvaluation();
});
</script>
