<template>
  <div class="">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Admin Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ApplicantsList' }">Applicants</router-link>
        </li>
      </ul>
    </div>
    <section class="px-6">
      <header class="flex items-center justify-between pb-6">
        <h1 class="text-3xl font-bold">Applicant</h1>
      </header>

      <div class="flex justify-end gap-3 pb-3">
        <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="status">Status</option>
          <option value="applicantName">Applicant Name</option>
          <option value="title">Job Title</option>
        </select>
      </div>
      <EasyDataTable :headers="headers" :items="hteStore.getListOfInternApplication" :search-field="searchField"
        :search-value="searchValue" table-class-name="customize-table" border-cell>
        <template #item-viewRequirements="item">
          <div class="flex justify-between gap-3 py-2">
            <p class="text-blue-600 underline cursor-pointer" @click="handleSetInternId(item.internId, item.jobId)">
              Check Requirements
            </p>
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
          <!-- Parent Consent -->
          <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
            <p class="flex items-center gap-2">
              Parent Consent - {{ item.parentConsentFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.parentConsentFile,
                'bxs-x-circle text-red-600': item.parentConsentFile === '',
              }"></i>
            </p>

            <div>
              <a :class="{ 'underline text-blue-600': item.parentConsentFile }" class="" target="_blank"
                :href="item.parentConsentPath">{{
                  item.parentConsentPath ? "View Parent Consent" : "Unavailable" }}</a>
            </div>
          </li>
          <!-- Intern Endorsement Form -->
          <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
            <p class="flex items-center gap-2">
              Intern Endorsment Form - {{ item.internEndorsementFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.internEndorsementFile,
                'bxs-x-circle text-red-600': item.internEndorsementFile === '',
              }"></i>
            </p>

            <div>
              <a :class="{ 'underline text-blue-600': item.internEndorsementPath }" class="" target="_blank"
                :href="item.internEndorsementPath">{{
                  item.internEndorsementPath ? "View Intern Endorsement" : "Unavailable" }}</a>
            </div>
          </li>

          <!-- MOA HTE -->
          <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
            <p class="flex items-center gap-2">
              MOA HTE - {{ item.moaFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.moaFile,
                'bxs-x-circle text-red-600': item.moaFile === '',
              }"></i>
            </p>

            <div>
              <a :class="{ 'underline text-blue-600': item.moaPath }" class="" target="_blank" :href="item.moaPath">{{
                item.moaPath ? "View MOA HTE" : "Unavailable" }}</a>
            </div>
          </li>

          <!-- First Endorsement -->
          <li class="flex items-center justify-between gap-2 p-3 text-sm">
            <p class="flex items-center gap-2">
              First Endorsement - {{ item.firstEndorsementFormFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.firstEndorsementFormFile,
                'bxs-x-circle text-red-600': item.firstEndorsementFormFile === '',
              }"></i>
            </p>

            <div>
              <a class="" target="_blank" :href="item.firstEndorsementFormPath ? item.firstEndorsementFormPath : '#'"
                :class="{ 'underline text-blue-600': item.firstEndorsementFormPath }">{{ item.firstEndorsementFormPath ?
                  "View First Endorsement"
                  : "Unavailable" }}</a>
            </div>
          </li>
          <!-- Certification Form-->
          <li class="flex items-center justify-between gap-2 p-3 text-sm">
            <p class="flex items-center gap-2">
              Certification Form - {{ item.certificationFormFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.certificationFormFile,
                'bxs-x-circle text-red-600': item.certificationFormFile === '',
              }"></i>
            </p>

            <div>
              <a class="" target="_blank" :href="item.certificationFormPath ? item.certificationFormPath : '#'"
                :class="{ 'underline text-blue-600': item.certificationFormPath }">{{ item.certificationFormPath ?
                  "View Certification Form"
                  : "Unavailable" }}</a>
            </div>
          </li>
          <!-- Internship Agreement -->
          <li class="flex items-center justify-between gap-2 p-3 text-sm">
            <p class="flex items-center gap-2">
              Internship Agreement - {{ item.internshipAgreementFile ? "Available" : "Not available"
              }}<i class="bx" :class="{
                'bxs-check-circle text-green-600': item.internshipAgreementFile,
                'bxs-x-circle text-red-600': item.internshipAgreementFile === '',
              }"></i>
            </p>

            <div>
              <a class="" target="_blank" :href="item.internshipAgreementPath ? item.internshipAgreementPath : '#'"
                :class="{ 'underline text-blue-600': item.internshipAgreementPath }">{{ item.internshipAgreementPath ?
                  "View Internship Agreement"
                  : "Unavailable" }}</a>
            </div>
          </li>
        </ul>
        <section class="flex justify-end p-3 border-2" v-if="item.status === 'Pending'">
          <div class="flex items-center gap-3">
            <button class="btn btn-danger" @click="rejectApplicantHandler(item._id)">Reject</button>
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
  console.log(hteStore.getListOfAcceptedInterns);
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
};
const rejectApplicantHandler = async (applicationId) => {
  await hteStore.rejectInternshipApplication(applicationId)
  modalRequirementShow.value = !modalRequirementShow.value;
  alert('Reject')
  router.push({ name: 'hte_dashboard' })
}
const headers = [
  { text: "APPLICATION ID", value: "applicationId" },
  { text: "JOB TITLE", value: "title" },
  { text: "APPLICANT NAME", value: "name" },
  { text: "DEPARTMENT", value: "department" },
  { text: "REQUIREMENTS LIST", value: "viewRequirements" },
  { text: "STATUS", value: "status" },
  { text: "REMARKS", value: "remarks" },
];
</script>

<style scoped>
.customize-table {

  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;

}
</style>
