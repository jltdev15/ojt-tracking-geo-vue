<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">HTE Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AcceptedList' }">Accepted</router-link>
        </li>
      </ul>
    </div>
    <section class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between pb-6">
        <h1 class="text-3xl font-bold">Interns</h1>
      </header>
      <div class="flex justify-end gap-3 pb-3">
        <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="status">Status</option>
          <option value="Intern">Intern Name</option>
          <option value="Department">Department</option>
        </select>
      </div>
      <EasyDataTable :headers="headers" :items="hteStore.getListOfAcceptedInterns" :search-field="searchField"
        :search-value="searchValue" table-class-name="customize-table" border-cell>
        <template #item-viewRequirements="item">
          <div class="flex justify-between gap-3 py-2">
            <p class="text-blue-600 underline cursor-pointer" @click="handleSetInternId(item.internId, item.jobId)">
              Check Requirements
            </p>
          </div>
        </template>
        <template #item-online="item">
          <div class="flex justify-between gap-3 py-2">
            <p v-if="item.isClockIn">Online</p>
            <p v-else>Offline</p>
          </div>
        </template>
        <template #item-dailytimerecord="item">
          <div class="flex justify-between gap-3 py-2">
            <router-link :to="{ name: 'DailyTimeRecord', params: { internId: item.internId } }"
              class="w-32 btn-accent btn btn-outline text-gray-50">
              View
            </router-link>
          </div>
        </template>
        <template #item-remarks="item">
          <div v-if="item.remarks === null">
            <p>No remarks</p>
          </div>
          <div v-else>
            <p>{{ item.remarks }}</p>
          </div>
        </template>
        <template #item-hours_rendered="item">
          <p>{{ item.workedHours }}</p>
        </template>
        <template #item-evaluation="item">
          <div v-if="item.evaluationStatus === 'Not Ready'">
            <p>{{ item.evaluationStatus }}</p>
          </div>
          <div v-if="item.evaluationStatus === 'Ready'">
            <router-link class="btn btn-primary" :to="{ name: 'EvaluationForm', params: { id: item.internId } }">
              <p>Ready for evaluation</p>
            </router-link>
          </div>
          <div v-if="item.evaluationStatus === 'Finished'">
            <router-link class="p-3 font-bold bg-green-700 rounded text-gray-50" :to="{ name: 'EvaluationView', params: { id: item.internId } }">View Results</router-link>
          </div>
        </template>
      </EasyDataTable>
    </section>

    <ModalRequirements :show="modalRequirementShow" title="Approved Application" v-for="item in applicantRequirements"
      :key="item.ids">
      <template #default>
        <p class="py-3 text-base font-medium t">Submitted Requirements</p>
        <ul class="p-3 border border-b-2">
          <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
            <p class="flex items-center gap-2">
              Resume - {{ item.resumeFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.resumeFile,
                'bxs-x-circle text-red-600': item.resumeFile === '',
              }"></i>
            </p>

            <div>
              <a class="text-blue-600 underline" target="_blank" :href="item.resumePath">View Resume</a>
            </div>
          </li>
          <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
            <p class="flex items-center gap-2">
              Memorandum - {{ item.moaFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.moaFile,
                'bxs-x-circle text-red-600': item.moaFile === '',
              }"></i>
            </p>

            <div>
              <a :class="{ 'underline text-blue-600': item.endorsementPath }" class="" target="_blank"
                :href="item.moaPath">{{ item.moaPath ? "View Endorsement" : "Unavailable" }}</a>
            </div>
          </li>
          <li class="flex items-center justify-between gap-2 p-3 text-sm">
            <p class="flex items-center gap-2">
              Endorsement - {{ item.eformFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.eformFile,
                'bxs-x-circle text-red-600': item.eformFile === '',
              }"></i>
            </p>

            <div>
              <a class="" target="_blank" :href="item.endorsementPath ? item.endorsementPath : ''"
                :class="{ 'underline text-blue-600': item.endorsementPath }">{{ item.endorsementPath ? "ViewEndorsement"
                  : "Unavailable" }}</a>
            </div>
          </li>
        </ul>
        <section class="flex justify-end p-3 border-2" v-if="item.status === 'Pending'">
          <div class="flex items-center gap-3">
            <button class="btn btn-danger">Reject</button>
            <button class="btn btn-primary" @click="handleAcceptApplicant(item._id)">
              Accept
            </button>
          </div>
        </section>
        <p @click="modalRequirementShow = !modalRequirementShow"
          class="p-3 text-center underline capitalize cursor-pointer">
          Close
        </p>
      </template>
    </ModalRequirements>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { storeToRefs } from "pinia";
const hteStore = useHteStore();
const router = useRouter();
const { applicantRequirements } = storeToRefs(hteStore);
const modalRequirementShow = ref(false);
const searchField = ref("Set filter");
const searchValue = ref("");
onMounted(async () => {
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
});

// function to select single application
const handleSetInternId = async (internId, jobId) => {
  await hteStore.fetchSingleApplication(jobId, internId);
  modalRequirementShow.value = !modalRequirementShow.value;
};
const handleAcceptApplicant = async (applicationId) => {
  await hteStore.acceptIntershipApplication(applicationId);
  modalRequirementShow.value = !modalRequirementShow.value;
  // await hteStore.fetchSingleInternships(route.params.jobId);
  router.push({ name: "hte_dashboard" });
};
const headers = [
  { text: "INTERNSHIP POSITION", value: "jobTitle",width:120 },
  { text: "INTERN", value: "name",width:150 },
  { text: "DEPARTMENT", value: "department",width:150 },
  { text: "HOURS RENDERED", value: "workedHours",width:120 },
  { text: "Daily Time Record", value: "dailytimerecord",width:200 },
  { text: "Online Status", value: "online",width:120 },
  { text: "REMARKS", value: "evaluation",width:120 },
];
</script>

<style scoped></style>
