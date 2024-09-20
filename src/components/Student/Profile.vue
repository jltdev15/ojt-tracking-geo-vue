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
        <header class="flex items-center justify-between pb-3 md:w-full lg:w-3/6">
          <h1 class="my-1 text-3xl font-bold capitalize">
            {{ authStore.internInformation.firstName }}
            {{ authStore.internInformation.lastName }}
          </h1>
          <p class="inline-block p-1 px-3 font-medium rounded text-gray-50 bg-primary">
            Intern ID : {{ authStore.internInformation.internId.substring(0, 10) }}
          </p>
        </header>

        <section
          class="grid px-6 py-6 bg-white rounded-md shadow-md md:gap-6 md:grid-cols-2 md:w-full lg:w-3/6"
        >
          <!-- Left side -->
          <div class="flex flex-col gap-4">
            <div>
              <label for="">Department</label>
              <input
                disabled
                type="text"
                v-model="authStore.internInformation.department"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
              />
            </div>
            <div>
              <label class="block" for="">First Name</label>
              <input
                :disabled="!isEditEnable"
                type="text"
                v-model="authStore.internInformation.firstName"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>

            <div>
              <label class="block" for="">Middle Initial</label>
              <input
                :disabled="!isEditEnable"
                type="text"
                v-model="authStore.internInformation.middleInitial"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
            <div>
              <label class="block" for="">Last Name</label>
              <input
                :disabled="!isEditEnable"
                type="text"
                v-model="authStore.internInformation.lastName"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
            <div>
              <label class="block" for="">Email</label>
              <input
                :disabled="!isEditEnable"
                type="text"
                v-model="authStore.internInformation.email"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
            <div>
              <label class="block" for="">Contact</label>
              <input
                :disabled="!isEditEnable"
                v-model="authStore.internInformation.contact"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                minlength="11"
                maxlength="11"
                type="text"
                pattern="\d{11}"
                required
              />
            </div>
          </div>
          <!-- right side -->
          <div class="flex flex-col gap-4">
            <div>
              <label class="block" for="">Age</label>
              <input
                :disabled="!isEditEnable"
                type="number"
                v-model="authStore.internInformation.age"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
            <div>
              <label class="block" for="">Birthday</label>
              <input
                :disabled="!isEditEnable"
                type="date"
                v-model="authStore.internInformation.birthday"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
            <div>
              <label class="block" for="">Province</label>
              <select
              :disabled="!isEditEnable"
                class="w-full select select-bordered md:max-w-md"
                v-model="selectedProvinces"
                @change="onSelectProvince"
              >
                <option value="" selected>{{ authStore.internInformation.province ? authStore.internInformation.province : 'Select Province'  }}</option>
                <option v-for="item in provinces" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block" for="">City or Municipality</label>
              <select
              :disabled="!isEditEnable"
                class="w-full select select-bordered md:max-w-md"
                v-model="selectedMunicipality"
                @change="onSelectMunicipality"
              >
                <option selected value="">{{ authStore.internInformation.municipality ? authStore.internInformation.municipality : 'Select Municipality'  }}</option>
                <option v-for="item in municipality" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block" for="">Barangay</label>
              <select
              :disabled="!isEditEnable"
                class="w-full select select-bordered md:max-w-md"
                v-model="selectedBrgy"
                @change="onSelectBrgy"
              >
                <option value="" selected >{{ authStore.internInformation.brgy ? authStore.internInformation.brgy : 'Select Barangay' }}</option>
                <option v-for="item in brgy" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="">House No. / Street</label>
              <input
                :disabled="!isEditEnable"
                type="text"
                v-model="authStore.internInformation.street"
                placeholder="Type here"
                class="w-full md:max-w-md input input-bordered"
                required
              />
            </div>
          </div>
          <div class="flex justify-end col-span-2">
            <button
              type="button"
              v-if="!isEditEnable"
              @click="toggleEdit"
              class="btn btn-outline btn-block btn-accent"
            >
              Edit Profile
            </button>
            <button
              type="submit"
              v-if="isEditEnable"
              class="w-full btn md:btn-block btn-primary"
            >
              Update Profile
            </button>
          </div>
        </section>
      </section>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const isEditEnable = ref(false);
const provinces = ref([]);
const municipality = ref([]);
const brgy = ref([]);
const selected = ref([]);
const selectedProvinces = ref("");
const selectedMunicipality = ref("");
const selectedBrgy = ref("");
const updateInformationHandler = async () => {
  await authStore.updatePersonalInfo();
  alert("Update success!");
  router.replace({ name: "intern_profile" });
  isEditEnable.value = !isEditEnable.value;
};

const getProvinces = async () => {
  try {
    const response = await axios.get("https://psgc.gitlab.io/api/provinces/");
    console.log(response.data);
    provinces.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};
const getMunicipalities = async (selectedProvince) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
    );
    console.log(response.data);
    municipality.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
const getBrgy = async (selectedMunicipality) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/cities-municipalities/${selectedMunicipality}/barangays/`
    );
    console.log(response.data);
    brgy.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

const onSelectProvince = async () => {
  await getMunicipalities(selectedProvinces.value.code);
  authStore.internInformation.province = selectedProvinces.value.name;
  console.log(selectedProvinces.value.code);
  console.log(selectedProvinces.value.name);
};
const onSelectMunicipality = async () => {
  await getBrgy(selectedMunicipality.value.code);
  authStore.internInformation.municipality = selectedMunicipality.value.name;
};
const onSelectBrgy = () => {
  authStore.internInformation.brgy = selectedBrgy.value.name;
};

const toggleEdit = () => {
  isEditEnable.value = !isEditEnable.value;
};

onMounted(async () => {
  await getProvinces();
});
</script>

<style scoped>
label {
  font-weight: 700;
}
</style>
