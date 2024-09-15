<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AcceptedList' }">Profile</router-link>
        </li>
      </ul>
    </div>
    <form @submit.prevent="updateInformationHandler">
      <section class="px-6">
        <header class="">
          <h1 class="text-3xl font-bold capitalize">
            {{ authStore.internInformation.firstName }}
          </h1>
          <p class="font-medium text-gray-500">
            Intern ID : {{ authStore.internInformation.internId.substring(0, 10) }}
          </p>
        </header>

        <section class="grid grid-cols-2">
          <!-- Left side -->
          <div class="flex flex-col pt-6">
            <label for="">Department</label>
            <input
              disabled
              type="text"
              v-model="authStore.internInformation.department"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
            />
            <label for="">First Name</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.firstName"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Middle Initial</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.middleInitial"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Last Name</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.lastName"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Email</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.email"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Contact</label>
            <input
              :disabled="!isEditEnable"
              type="number"
              v-model="authStore.internInformation.contact"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
          </div>
          <!-- right side -->
          <div class="flex flex-col pt-6">
            <label for="">Age</label>
            <input
              :disabled="!isEditEnable"
              type="number"
              v-model="authStore.internInformation.age"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Birthday</label>
            <input
              :disabled="!isEditEnable"
              type="date"
              v-model="authStore.internInformation.birthday"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Street</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.street"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Brgy.</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.brgy"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Zip Code</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.zipcode"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Municipality/City</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.municipality"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
            <label for="">Province</label>
            <input
              :disabled="!isEditEnable"
              type="text"
              v-model="authStore.internInformation.province"
              placeholder="Type here"
              class="w-full max-w-xs input input-bordered"
              required
            />
          </div>
        </section>

        <div class="flex py-6 pr-12">
          <button
            type="button"
            v-if="!isEditEnable"
            @click="toggleEdit"
            class="btn btn-outline btn-block btn-accent"
          >
            Edit Profile
          </button>
          <button type="submit" v-if="isEditEnable" class="btn btn-block btn-primary">
            Update Profile
          </button>
        </div>
      </section>
    </form>
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
  await authStore.updatePersonalInfo();
  alert("Update success!");
  router.replace({ name: "intern_profile" });
  isEditEnable.value = !isEditEnable.value;
};

const toggleEdit = () => {
  isEditEnable.value = !isEditEnable.value;
};
</script>

<style scoped></style>
