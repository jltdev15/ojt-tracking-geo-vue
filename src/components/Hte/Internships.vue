<template>
  <section class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-200">
      <div>
        <h1 class="text-3xl font-bold">Internships Listing</h1>
        <p>No. of listing {{ hteStore.getNumberOfListing }}</p>
      </div>

      <div>
        <button @click="handleToggleModal" class="btn btn-block">
          <i class="ri-add-line"></i>New Internship
        </button>
      </div>
    </header>
    <div class="divider"></div>
    <div class="flex justify-end gap-3 pb-3">
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
      :items="hteStore.internshipList"
      :search-field="searchField"
      :search-value="searchValue"
      table-class-name="customize-table"
      show-index
    >
      <!-- <template #item-applicants="item">
        <div class="flex justify-between gap-3 py-2">
          <h1>{{ item.applicants }}</h1>
        </div>
      </template> -->
      <template #item-operation="item">
        <div class="flex justify-between gap-3 py-2">
          <button
            @click="adminAuthStore.showUpdateModal(item)"
            class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50"
          >
            Edit <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            @click="handleDeleteModalToggle(item._id)"
            class="flex items-center justify-center w-24 gap-2 py-3 bg-red-500 text-gray-50"
          >
            Remove<i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </template>
      <template #item-applicants="item">
        <div class="flex flex-col justify-between gap-3 py-2">
          <!-- <ul v-for="i in item.applicants" :key="i.id" class="flex flex-col">
              <li class="flex ">{{i.fullName}}</li>
          </ul> -->
          <router-link
            class="btn btn-outline"
            :to="{ name: 'InternshipItem', params: { jobId: item._id } }"
            >View Applicants</router-link
          >
        </div>
      </template>
    </EasyDataTable>
    <Modal :show="isModalShow" title="New Internship">
      <!-- <Modal :show="true" title="New Account"> -->
      <template #default>
        <div>
          <div class="flex flex-col gap-3 pt-3">
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="newInternship.title"
                type="text"
                class="grow"
                placeholder="Title"
              />
            </label>
            <label class="flex items-center justify-between gap-2">
              <textarea
                class="w-full textarea textarea-bordered"
                placeholder="Description"
                v-model.trim="newInternship.description"
              ></textarea>
            </label>

            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="newInternship.slots"
                type="text"
                class="grow"
                placeholder="Number of slots"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="newInternship.location"
                type="text"
                class="grow"
                placeholder="Location"
              />
            </label>

            <div class="flex flex-col gap-2">
              <button
                @click="handleNewInternship"
                class="text-lg btn btn-primary btn-block"
              >
                Add Internship
              </button>
              <button
                class="text-lg btn btn-outline btn-block"
                @click="handleToggleModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <Modal :show="isConfirmationModalShow" title="Confirmation">
      <template #default>
        <p class="text-xl font-medium">Are you sure you want to remove this listing?</p>
        <div class="flex justify-between pt-9">
          <button @click="handleDeleteModalToggle" class="btn btn-outline">Cancel</button>
          <button
            type="button"
            @click="handleDeleteItem"
            class="bg-red-600 btn text-gray-50"
          >
            Remove
          </button>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useHteStore } from "@/stores/HteStore";

const hteStore = useHteStore();
const authStore = useAuthStore();
import { ref, onMounted, reactive } from "vue";

const searchField = ref("Set filter");
const searchValue = ref("");
const itemId = ref("");
const isModalShow = ref(false);
const isConfirmationModalShow = ref(false);
const newInternship = reactive({
  title: "",
  description: "",
  slots: "",
  location: "",
});

const handleToggleModal = async () => {
  isModalShow.value = !isModalShow.value;
};
const handleDeleteModalToggle = async (id) => {
  console.log(id);
  itemId.value = id;
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};
const handleDeleteItem = async () => {
  await hteStore.removeInternship(itemId.value);
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};

const handleNewInternship = async () => {
  await hteStore.postInternship(newInternship);
  newInternship.title = "";
  newInternship.description = "";
  newInternship.slots = "";
  newInternship.location = "";
  await handleToggleModal();
};
onMounted(async () => {
  await hteStore.fetchInternships();
});

const headers = [
  { text: "TITLE", value: "title" },

  { text: "DESCRIPTION", value: "description" },
  { text: "SLOTS", value: "slots" },
  { text: "LOCATION", value: "location", width: 200 },
  { text: "POSTED ON", value: "createdAt", width: 200 },
  { text: "STATUS", value: "status", width: 200 },
  { text: "APPLICANTS", value: "applicants", width: 200 },
  { text: "ACTIONS", value: "operation", width: 200 },
];
</script>

<style>
textarea {
  resize: none;
}
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #2b2828;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
