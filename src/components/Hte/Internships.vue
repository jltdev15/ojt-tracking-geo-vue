<template>
  <section class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'hte_vacancy' }">Listing</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between gap-3 md:flex-row">
        <div>
          <h1 class="font-bold md:text-3xl">Internships Listing</h1>
          <!-- <p>No. of listing {{ hteStore.getNumberOfListing }}</p> -->
        </div>

        <div>
          <button @click="handleToggleModal" class="btn btn-block btn-primary">
            <i class="ri-add-line"></i>New Internship
          </button>
        </div>
      </header>
      <section class="">
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
        <section class="">
          <EasyDataTable
            :headers="headers"
            :items="hteStore.internshipList"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="5"
            :hide-rows-per-page="true"
            table-class-name="customize-table"
          >
            <!-- <template #item-applicants="item">
          <div class="flex justify-between gap-3 py-2">
            <h1>{{ item.applicants }}</h1>
          </div>
        </template> -->
            <template #item-status="item">
              <p class="inline-block px-3 bg-green-600 rounded-md text-gray-50">
                {{ item.status }}
              </p>
            </template>
            <template #item-operation="item">
              <div class="flex justify-between gap-3 py-2">
                <button
                  @click="handleToggleUpdateModal(item._id)"
                  class="flex items-center justify-center gap-2 py-3 btn btn-primary text-gray-50"
                >
                  Update
                </button>
                <button
                  @click="handleDeleteModalToggle(item._id)"
                  class="flex items-center justify-center w-24 gap-2 py-3 btn btn-outline btn-accent text-gray-50"
                >
                  Remove
                </button>
              </div>
            </template>
          </EasyDataTable>
        </section>
      </section>
    </div>

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
                type="number"
                class="grow"
                placeholder="Number of slots"
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
                class="text-lg btn btn-outline btn-accent btn-block"
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
    <Modal :show="isUpdateModalShow" title="Update Listing">
      <template #default>
        <div>
          <div class="flex flex-col gap-3 pt-3">
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="hteStore.internshipData.title"
                type="text"
                class="grow"
                placeholder="Title"
              />
            </label>
            <div class="py-3">
              <select
                class="w-full py-3 select select-bordered"
                @change="handleSelectStatus"
              >
                <option disabled value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <label class="flex items-center justify-between gap-2">
              <textarea
                class="w-full textarea textarea-bordered"
                placeholder="Description"
                v-model.trim="hteStore.internshipData.requirements"
              ></textarea>
            </label>

            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="hteStore.internshipData.slots"
                type="text"
                class="grow"
                placeholder="Number of slots"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model.trim="hteStore.internshipData.location"
                type="text"
                class="grow"
                placeholder="Location"
              />
            </label>

            <div class="flex flex-col gap-2">
              <button
                @click="handleUpdateListingItem"
                class="text-lg btn btn-primary btn-block"
              >
                Update Internship
              </button>
              <button
                class="text-lg btn btn-accent btn-outline btn-block"
                @click="isUpdateModalShow = !isUpdateModalShow"
              >
                Close
              </button>
            </div>
          </div>
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
const isUpdateModalShow = ref(false);
const newInternship = reactive({
  title: "",
  requirements: "",
  slots: "",
  location: authStore.hteInformation.address,
});

const handleToggleModal = async () => {
  isModalShow.value = !isModalShow.value;
};
const handleToggleUpdateModal = async (id) => {
  console.log(id);
  await hteStore.getListingItem(id);
  isUpdateModalShow.value = !isUpdateModalShow.value;
};
const handleUpdateListingItem = async () => {
  const response = await hteStore.updateListingItem();
  alert(response.data.status);
  console.log(response);
  await hteStore.fetchInternships();
  isUpdateModalShow.value = !isUpdateModalShow.value;
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
const handleSelectStatus = async (event) => {
  hteStore.internshipData.status = event.target.value;
};

onMounted(async () => {
  await hteStore.fetchInternships();
});

const headers = [
  { text: "TITLE", value: "title" },

  { text: "REQUIREMENTS", value: "requirements", width: 100 },
  { text: "SLOTS", value: "slots", width: 100 },
  { text: "LOCATION", value: "location", width: 200 },
  { text: "POSTED ON", value: "createdAt", width: 100 },
  { text: "STATUS", value: "status", width: 100 },
  { text: "ACTIONS", value: "operation", width: 100 },
];
</script>

<style scoped>
textarea {
  resize: none;
}

.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 14px;
}
@media only screen and (max-width: 390px) {
  .customize-table {
    --easy-table-body-item-padding: 0px 10px;
    --easy-table-body-row-font-size: 12px;
  }
}
</style>
