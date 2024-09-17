<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'InternDepartmentList' }">Interns List</router-link>
        </li>
      </ul>
    </div>
    <header class="px-6">
      <h1 class="text-3xl font-bold">Interns List</h1>
    </header>
    <div class="flex justify-end gap-3 p-6">
      <input
        type="text"
        placeholder="Search here"
        class="w-full input input-bordered"
        v-model="searchValue"
      />
      <select class="w-48 select select-bordered" v-model.trim="searchField">
        <option selected disabled value="Set filter">Set filter</option>
        <option value="fullName">Intern Name</option>
        <option value="evaluation">Evaluation</option>
      </select>
    </div>
    <div class="px-6 py-1">
      <EasyDataTable
        :headers="headers"
        :search-field="searchField"
        :search-value="searchValue"
        :items="coorStore.internList"
        border-cell
        table-class-name="customize-table"
      >
        <template #item-dtr="item">
          <div v-if="item.dailyTimeRecords.length === 0" class="flex gap-3">
            <p>Not available</p>
          </div>
          <div v-if="item.dailyTimeRecords.length > 0">
            <router-link :to="{ name: 'CoorDailyTimeRecord', params: { id: item._id } }"
              >View DTR</router-link
            >
          </div>
        </template>
        <template #item-operation="item">
          <div v-if="item.requiredHours === 0" class="flex gap-3">
            <button
              @click="toggleRequiredHoursModal(item._id)"
              class="btn btn-block btn-primary"
            >
              Set required hours
            </button>
          </div>
          <div v-if="item.requiredHours != 0" class="">
            <button
              @click="toggleRequiredHoursModal(item._id)"
              class="btn btn-block btn-primary"
            >
              Update Required Hours
            </button>
          </div>
        </template>
        <template #item-evaluation="item">
          <div v-if="item.evaluationResults" class="flex gap-3">
            <button class="btn btn-block btn-primary">View evaluation</button>
          </div>
          <div v-else>
            <p>Not available</p>
          </div>
        </template>
        <template #item-rendered="item">
          <p>{{ item.workedHours.toFixed() }}</p>
        </template>
        <template #item-fullName="item">
          <p v-if="item.firstName===null && item.lastName === null">
            Profile not updated
          </p>
          <p>{{ item.firstName }} {{ item.lastName }}</p>
        </template>
      </EasyDataTable>
      <Modal :show="setRequiredHours" title="Set Required Hours">
        <template #default>
          <section class="">
            <input
              v-model="coorStore.requiredHours"
              type="number"
              placeholder="Type here"
              class="w-full input input-bordered"
            />
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
const searchField = ref("Set filter");
const searchValue = ref("");
const toggleRequiredHoursModal = (id) => {
  internId.value = id;
  setRequiredHours.value = !setRequiredHours.value;
};
const setHoursHandler = async () => {
  try {
    const response = await coorStore.setHoursRequired(internId.value);
    console.log(response);
    alert("Setting required hours success!");
    setRequiredHours.value = !setRequiredHours.value;
    await coorStore.fetchInternLists();
  } catch (err) {
    console.log(err);
  }
};
const headers = [
  { text: "Name", value: "fullName" },
  { text: "Department", value: "department" },
  { text: "Hours Required", value: "requiredHours" },
  { text: "Hours Rendered", value: "rendered" },
  { text: "Daily Time Record", value: "dtr" },
  { text: "Action", value: "operation", width: "250" },
];

onMounted(async () => {
  await coorStore.fetchInternLists();
});
</script>

<style>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
