<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'coor_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'coor_announcement' }"
            >Announcement</router-link
          >
        </li>
      </ul>
    </div>
    <div class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between pb-3">
      <h1 class="text-xl text-center md:text-3xl">
        Announcement <span class="text-xl font-bold md:text-3xl">Management</span>
      </h1>
      <div class="p-6 md:p-0">
        <button @click="toggleNewAnnouncement" class="btn btn-block btn-primary">
          <i class="ri-add-line"></i>New Announcement
        </button>
      </div>
    </header>
    <section class="">
      <EasyDataTable
        :headers="headers"
        :items="userStore.getCoorAnnouncementList"
        :search-field="searchField"
        :search-value="searchValue"
                               :rows-per-page="5"
          :hide-rows-per-page="true"
        table-class-name="customize-table"
      >
        <template #item-date="item">
          <p>{{ moment(item.date).tz("Asia/Manila").format("YYYY-MM-DD") }}</p>
        </template>
        <template #item-operation="item">
          <div class="flex justify-between gap-3 py-2">
            <button
              @click="toggleConfirmationModal(item._id)"
              class="flex items-center justify-center w-24 gap-2 py-3 btn-accent btn btn-outline"
            >
              Remove<i class="fa-solid fa-trash"></i>
            </button>
            <button
              @click="toggleUpdateAnnouncement(item._id, item.title, item.description)"
              class="flex items-center justify-center w-24 gap-2 py-3 btn btn-primary text-gray-50"
            >
              Update <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </template>
        <template #item-description="item">
            <p>{{ truncateString(item.description, 50)}}</p>
          </template>
      </EasyDataTable>
    </section>
    </div>
   
    <Modal :show="isNewModalShow" title="New Announcement">
      <template #default>
        <form @submit.prevent="createAnnouncementHandler" action="">
          <div class="flex flex-col py-1">
            <label for="">Title</label>
            <input
              v-model="annouceData.title"
              type="text"
              placeholder="Type here"
              class="w-full max-w-3xl input input-bordered"
              required
            />
          </div>
          <div class="flex flex-col py-1">
            <label for="">Description</label>
            <textarea
              v-model="annouceData.description"
              class="textarea textarea-bordered"
              placeholder="Content here"
              required
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-9">
            <button
              type="button"
              class="btn btn-accent btn-outline"
              @click="isNewModalShow = !isNewModalShow"
            >
              Cancel
            </button>
            <button type="submit" class="btn-primary btn text-gray-50">
              Create Announcement
            </button>
          </div>
        </form>
      </template>
    </Modal>
    <Modal :show="isUpdateModalShow" title="Update Announcement">
      <template #default>
        <form @submit.prevent="updateAnnouncementHandler">
          <div class="flex flex-col py-1">
            <label for="">Title</label>
            <input
              v-model="annouceData.title"
              type="text"
              placeholder="Type here"
              class="w-full max-w-3xl input input-bordered"
              required
            />
          </div>
          <div class="flex flex-col py-1">
            <label for="">Description</label>
            <textarea
              v-model="annouceData.description"
              class="textarea textarea-bordered"
              placeholder="Content here"
              required
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-9">
            <button
              type="button"
              class="btn btn-accent btn-outline"
              @click="isUpdateModalShow = !isUpdateModalShow"
            >
              Cancel
            </button>
            <button type="submit" class="btn-primary btn text-gray-50">
              Update Announcement
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import moment from "moment-timezone";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, ref, reactive } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const annouceData = reactive({
  title: "",
  description: "",
  category: "",
});
const isNewModalShow = ref(false);
const isUpdateModalShow = ref(false);
const userStore = useAdminUserStore();
const authStore = useAuthStore();
const searchField = ref("role");
const searchValue = ref("");
const announceId = ref("");
const toggleNewAnnouncement = () => {
  isNewModalShow.value = !isNewModalShow.value;
};

const categoryHandler = (event) => {
  annouceData.category = event.target.value;
};
const toggleUpdateAnnouncement = (id, title, description) => {
  announceId.value = id;
  annouceData.title = title;
  annouceData.description = description;
  isUpdateModalShow.value = !isUpdateModalShow.value;
};
const createAnnouncementHandler = async () => {
  const payload = {
    title: annouceData.title,
    description: annouceData.description,
    department: authStore.currentDepartment,
    role: authStore.currentRole,
    createdBy: authStore.currentUser,
  };
  try {
    await userStore.addAnnouncement(payload);
    annouceData.title = "";
    annouceData.description = "";
    annouceData.category = "";
    isNewModalShow.value = !isNewModalShow.value;
  } catch (err) {
    console.log(err);
  }
};

const updateAnnouncementHandler = async () => {
  const payload = {
    title: annouceData.title,
    description: annouceData.description,
  };
  await userStore.updateAnnouncement(announceId.value, payload);
  annouceData.title = "";
  annouceData.description = "";
  isUpdateModalShow.value = !isUpdateModalShow.value;
};

const headers = [
  { text: "Title", value: "title" },
  { text: "Description", value: "description" },
  { text: "Date Created", value: "date" },
  { text: "Author", value: "author" },
  { text: "Actions", value: "operation", width: 10 },
];
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
}
onMounted(async () => {
  console.log(authStore.currentRole);
  await userStore.fetchAnnouncement();
});
</script>

<style scoped>

</style>
