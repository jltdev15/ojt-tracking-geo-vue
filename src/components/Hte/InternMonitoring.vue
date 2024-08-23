<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Intern Monitoring</h1>
    </header>
    <EasyDataTable
      :headers="headers"
      :items="hteStore.onlineInternList"
      table-class-name="customize-table"
    >
      <template #item-status="item">
        <div
          v-if="
            item.currentLocation.lat === hteStore.hteLocationDefault.lat &&
            item.currentLocation.long === hteStore.hteLocationDefault.long
          "
        >
          <p class="bg-green-600 inline-block p-3 rounded-md text-gray-50 font-bold">
            Within Vicinity
          </p>
        </div>
        <div v-else>
          <p class="bg-red-600 inline-block p-3 rounded-md text-gray-50 font-bold">
            Outside Vicinity
          </p>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, onUnmounted } from "vue";
import { useHteStore } from "@/stores/HteStore";
const hteStore = useHteStore();
// console.log(hteStore.hteLocationDefault.lat);

const headers = [
  { text: "INTERN", value: "name" },
  { text: "TIME IN", value: "timeIn" },
  { text: "CURRENT LOCATION", value: "status" },
];

const getOnlineInternHandler = async () => {
  await hteStore.getOnlineInterns();
};
let intervalid = null;
onMounted(async () => {
  await hteStore.fetchInternships();
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
  await hteStore.getOnlineInterns();
  if (hteStore.onlineInternList.length > 0) {
    intervalid = setInterval(getOnlineInternHandler, 3000);
  } else {
    clearInterval(intervalid);
  }
});
onUnmounted(async () => {
  clearInterval(intervalid);
});
</script>

<style lang="scss" scoped></style>
