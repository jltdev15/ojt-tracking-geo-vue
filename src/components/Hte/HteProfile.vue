<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Hte Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'hte_profile' }">Profile</router-link>
        </li>
      </ul>
    </div>
    <section class="px-6">
      <header class="">
        <h1 class="text-3xl font-bold">{{ authStore.hteInformation.name }}</h1>
      </header>
      <div class="flex flex-col pt-6">
        <label for="">Email</label>
        <input
          :disabled="!isEditEnable"
          type="text"
          v-model="authStore.hteInformation.email"
          placeholder="Type here"
          class="w-full max-w-xs input input-bordered"
        />
        <label for="">Contact Number</label>
        <input
          :disabled="!isEditEnable"
          type="number"
          v-model="authStore.hteInformation.contact"
          placeholder="Type here"
          class="w-full max-w-xs input input-bordered"
        />
        <label for="">Address</label>
        <input
          :disabled="!isEditEnable"
          type="text"
          v-model="authStore.hteInformation.address"
          placeholder="Type here"
          class="w-full max-w-xs input input-bordered"
        />
        <label for="">Map Coordinates</label>
        <div class="flex flex-col gap-2">
          <input
            :disabled="!isEditEnable"
            type="text"
            v-model="authStore.hteInformation.location.lat"
            placeholder="Latitude"
            class="w-full max-w-xs input input-bordered"
          />
          <input
            :disabled="!isEditEnable"
            type="text"
            v-model="authStore.hteInformation.location.lng"
            placeholder="Longtitude"
            class="w-full max-w-xs input input-bordered"
          />
        </div>
      </div>
      <div class="py-3">
        <button
          v-if="!isEditEnable"
          @click="toggleEdit"
          class="max-w-xs btn btn-outline btn-block btn-accent"
        >
          Edit Profile
        </button>
        <button
          @click="updateInformationHandler"
          v-if="isEditEnable"
          class="max-w-xs btn btn-block btn-primary"
        >
          Update Profile
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const isEditEnable = ref(false);

const updateInformationHandler = async () => {
  await authStore.updateHteInfo();
  alert("Update success!");
  router.replace({ name: "hte_profile" });
  isEditEnable.value = !isEditEnable.value;
};

const toggleEdit = () => {
  isEditEnable.value = !isEditEnable.value;
};
</script>

<style scoped></style>
