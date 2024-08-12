<template>
  <div class="p-3">
    <p class="p-2 text-3xl cursor-pointer" @click="router.back">
      <i class="bx bx-arrow-back"></i>
    </p>
    <header class="flex items-center justify-between p-3 0">
      <div v-for="item in applicantItemList" :key="item.id">
        <h1 class="text-3xl font-bold">{{ item.jobTitle }}</h1>
        <p class="text-xs">Posted on {{ item.postedOn }}</p>
      </div>
      <div>
        <h1 class="text-base font-bold">Number of Applicants</h1>
        <p>{{ getNumberOfApplicants }}</p>
      </div>
    </header>
    <section class="p-3">
      <p class="font-bold text-gray-600">List of Applicants</p>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </div>
      <EasyDataTable
        :headers="headers"
        :items="applicantItemList"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
        show-index
      >
        <template #item-viewRequirements="item">
          <div class="flex justify-between gap-3 py-2">
            <p
              class="text-blue-600 underline cursor-pointer"
              @click="handleSetInternId(item.internId)"
            >
              Check Requirements
            </p>
          </div>
        </template>
      </EasyDataTable>
      <ModalRequirements
        :show="modalRequirementShow"
        title="Approved Application"
        v-for="item in applicantRequirements"
        :key="item.ids"
      >
        <template #default>
          <p class="py-3 text-base font-medium t">Submitted Requirements</p>
          <ul class="p-3 border border-b-2">
            <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
              <p class="flex items-center gap-2">
                Resume - {{ item.resumeFile ? "Available" : "Not available"
                }}<i
                  class="bx"
                  :class="{
                    'bxs-check-circle text-green-600': item.resumeFile,
                    'bxs-x-circle text-red-600': item.resumeFile === '',
                  }"
                ></i>
              </p>

              <div>
                <a class="text-blue-600 underline" target="_blank" :href="item.resumePath"
                  >View Resume</a
                >
              </div>
            </li>
            <li class="flex items-center justify-between gap-2 p-3 text-sm border-b-2">
              <p class="flex items-center gap-2">
                Memorandum - {{ item.moaFile ? "Available" : "Not available"
                }}<i
                  class="bx"
                  :class="{
                    'bxs-check-circle text-green-600': item.moaFile,
                    'bxs-x-circle text-red-600': item.moaFile === '',
                  }"
                ></i>
              </p>

              <div>
                <a
                  :class="{ 'underline text-blue-600': item.endorsementPath }"
                  class=""
                  target="_blank"
                  :href="item.moaPath"
                  >{{ item.moaPath ? "View Endorsement" : "Unavailable" }}</a
                >
              </div>
            </li>
            <li class="flex items-center justify-between gap-2 p-3 text-sm">
              <p class="flex items-center gap-2">
                Endorsement - {{ item.eformFile ? "Available" : "Not available"
                }}<i
                  class="bx"
                  :class="{
                    'bxs-check-circle text-green-600': item.eformFile,
                    'bxs-x-circle text-red-600': item.eformFile === '',
                  }"
                ></i>
              </p>

              <div>
                <a
                  class=""
                  target="_blank"
                  :href="item.endorsementPath ? item.endorsementPath : ''"
                  :class="{ 'underline text-blue-600': item.endorsementPath }"
                  >{{ item.endorsementPath ? "View Endorsement" : "Unavailable" }}</a
                >
              </div>
            </li>
          </ul>
          <section class="flex justify-end p-3 border-2">
            <div class="flex items-center gap-3">
              <button class="btn btn-danger">Reject</button>
              <button class="btn btn-primary" @click="handleAcceptApplicant(item._id)">
                Accept
              </button>
            </div>
          </section>
          <p
            @click="modalRequirementShow = !modalRequirementShow"
            class="p-3 text-center underline capitalize cursor-pointer"
          >
            Close
          </p>
        </template>
      </ModalRequirements>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const hteStore = useHteStore();
const router = useRouter();
const {
  jobName,
  datePosted,
  applicantItemList,
  getNumberOfApplicants,
  applicantId,
  applicantRequirements,
} = storeToRefs(hteStore);
const route = useRoute();

const searchField = ref("Set filter");
const searchValue = ref("");
const modalRequirementShow = ref(false);

const headers = [
  { text: "APPLICANT NAME", value: "name" },
  { text: "DEPARTMENT", value: "department" },
  { text: "ACTIONS", value: "viewRequirements", width: 200 },
];

onMounted(async () => {
  await hteStore.fetchSingleInternships(route.params.jobId);
});

// function to select single application
const handleSetInternId = async (id) => {
  await hteStore.fetchSingleApplication(route.params.jobId, id);
  modalRequirementShow.value = !modalRequirementShow.value;
};

// function to accept applicant
const handleAcceptApplicant = async (applicationId) => {
  await hteStore.acceptIntershipApplication(applicationId);
  modalRequirementShow.value = !modalRequirementShow.value;
  await hteStore.fetchSingleInternships(route.params.jobId);
  router.push({name:'hte_vacancy'})
};
</script>

<style lang="scss" scoped></style>
