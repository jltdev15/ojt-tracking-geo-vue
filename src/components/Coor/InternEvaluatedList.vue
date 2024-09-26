<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Evaluation' }">Evaluated</router-link>
        </li>
      </ul>
    </div>
    <section class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="font-bold md:text-3xl">List of Interns Evaluated</h1>
      </header>
      <div class="flex flex-col justify-end gap-3 py-3 md:flex-row">
        <input
          type="text"
          placeholder="Search here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="md:w-48 select select-bordered" v-model.trim="searchField">
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
                  :rows-per-page="5"
          :hide-rows-per-page="true"
        table-class-name="customize-table"
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
  { text: "INTERN", value: "internName", widht:150 },
  { text: "HTE NAME", value: "hteName",width:150 },
  { text: "REMARKS", value: "comment",width:150 },
  { text: "EVALUATION", value: "results" },
];

onMounted(async () => {
  await coorStore.getInternEvaluation();
});
</script>
