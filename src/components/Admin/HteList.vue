<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'hteLists' }">List</router-link>
        </li>
        <!-- <li>
                    <router-link class="text-red-800" :to="{ name: 'UpdateUser' }">Update user</router-link>
                </li> -->
      </ul>
    </div>
    <section class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="text-lg font-bold md:text-3xl">
          Register Host Training Establishments
        </h1>
      </header>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search Company Name"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
      </div>
      <div class="">
        <EasyDataTable
          :headers="headers"
          :items="useUserStore.htesList"
          :search-field="searchField"
          :search-value="searchValue"
          table-class-name="customize-table"
          border-cell
        >
          <template #item-moa="item">
            <div v-if="item.moaAttachement" class="flex justify-start">
              <a
                class="w-32 btn btn-sm btn-primary text-gray-50"
                :href="item.moaAttachement"
                target="_blank"
                >View MOA</a
              >
            </div>
            <div v-else class="flex justify-start">
              <button
                @click="openUpdateModal(item._id, item.name)"
                class="w-32 btn btn-sm btn-outline btn-accent text-gray-50"
              >
                Upload MOA
              </button>
            </div>
          </template>
          <template #item-internships="item">
            <div class="flex justify-start">
              <router-link
                class="w-32 btn btn-sm btn-outline btn-accent text-gray-50"
                :to="{ name: 'hteItem', params: { id: item._id } }"
                >View</router-link
              >
            </div>
          </template>
          <template #item-address="item">
            <p>
              {{ item.street }} {{ item.brgy }} {{ item.municipality }}
              {{ item.province }}
            </p>
          </template>
        </EasyDataTable>
      </div>
    </section>

    <Modal :show="isUpdateModalShow" title="Update MOA">
      <form @submit.prevent="submitUpdatedMOA">
        <div class="flex flex-col gap-3 pt-3">
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              MOA
              <span class="px-3 text-sm text-red-600 font-extralight">(required)</span>
            </h2>
          </header>
          <div class="py-1 mb-3 border">
            <input
              placeholder="Supporting documents"
              type="file"
              name="files"
              accept="application/pdf, image/jpeg, image/png"
              id="supporting_document"
              ref="fileInput "
              class="w-full max-w-3xl file-input file-input-bordered"
              @change="handleFileChange"
              required
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <button type="submit" class="text-lg btn btn-primary btn-block">
              Update
            </button>
            <button
              class="text-lg btn btn-accent btn-outline btn-block"
              @click="isUpdateModalShow = !isUpdateModalShow"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useCoorStore } from "@/stores/CoorStore";
const coorStore = useCoorStore();
const useUserStore = useAdminUserStore();
const searchField = ref("fullName");
const searchValue = ref("");
const isUpdateModalShow = ref(false);
const isFileSizeExceed = ref(false);
const hteId = ref("");
const fileMoa = ref(null);

const openUpdateModal = (id) => {
  hteId.value = id;
  isUpdateModalShow.value = !isUpdateModalShow.value;
};

const handleFileChange = (event) => {
  fileMoa.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};

const submitUpdatedMOA = async () => {
  const formData = new FormData();
  formData.append("file", fileMoa.value);
  try {
    await coorStore.updateMOAhte(hteId.value, formData);
    isUpdateModalShow.value = !isUpdateModalShow.value;
    await useUserStore.fetchHTEList();
  } catch (err) {
    console.log(err);
  }
};

const headers = [
  { text: "Company Name", value: "fullName" },
  { text: "Address", value: "address" },
  { text: "Contact", value: "contactNumber" },
  { text: "Memorandum of Agreement", value: "moa" },
  { text: "Internships", value: "internships", width: 200 },
];

onMounted(async () => {
  await useUserStore.fetchHTEList();
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}

@media only screen and (max-width: 390px) {
  .customize-table {
    --easy-table-header-item-padding: 10px 25px;
  }
}
</style>
