<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Admin Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'InternDepartmentList' }">Interns List</router-link>
        </li>

      </ul>
    </div>
    <header class="px-6">
      <h1 class="text-3xl font-bold">Interns List</h1>
    </header>
    <div class="p-6">
      <EasyDataTable :headers="headers" :items="coorStore.internList" border-cell table-class-name="customize-table">
        <template #item-operation="item">
          <div v-if="item.requiredHours === 0" class="flex gap-3">
            <button @click="toggleRequiredHoursModal(item._id)" class="btn btn-block btn-primary">
              Set required hours
            </button>
          </div>
          <div v-else>
            <p>No action needed</p>
          </div>
        </template>
        <template #item-evaluation="item">
          <div v-if="item.evaluationResults" class="flex gap-3">
            <button class="btn btn-block btn-primary">
              View evaluation
            </button>
          </div>
          <div v-else>
            <p>Not available</p>
          </div>
        </template>
        <template #item-rendered="item">
          <p>{{ item.workedHours.toFixed() }}</p>
        </template>
      </EasyDataTable>
      <Modal :show="setRequiredHours" title="Set Required Hours">
        <template #default>
          <section class="">
            <input v-model="coorStore.requiredHours" type="number" placeholder="Type here"
              class="w-full input input-bordered" />
            <div class="flex items-center justify-end gap-3">
              <button @click="toggleRequiredHoursModal" class="btn btn-secondary">
                Close
              </button>
              <button @click="setHoursHandler" class="my-3 btn btn-primary">
                Set hours
              </button>
            </div>
          </section>
        </template>
      </Modal>
    </div>
  </div>

</template>

<script setup>
import { useCoorStore } from "@/stores/CoorStore";
import { onMounted, ref } from "vue";
const coorStore = useCoorStore();
const internId = ref("");
const setRequiredHours = ref(false);

const toggleRequiredHoursModal = (id) => {
  internId.value = id;
  setRequiredHours.value = !setRequiredHours.value;
};
const setHoursHandler = async () => {
  const response = await coorStore.setHoursRequired(internId.value);
  console.log(response);
  alert(response.data.content.message);
  setRequiredHours.value = !setRequiredHours.value;
  await coorStore.fetchInternLists();
};
const headers = [
  { text: "Full name", value: "fullName" },
  { text: "Department", value: "department" },
  { text: "Hours Required", value: "requiredHours" },
  { text: "Hours Rendered", value: "rendered" },
  { text: "Evaluation", value: "evaluation" },
  { text: "Action", value: "operation" },
];

onMounted(async () => {
  await coorStore.fetchInternLists();
});
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

  --easy-table-body-row-height: 60px;
  --easy-table-body-row-font-size: 14px;
}
</style>
