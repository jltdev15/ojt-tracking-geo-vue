<template>
  <div class="px-6 mx-auto md:w-9/12 lg:w-7/12">
    <div class="pt-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AcceptedList' }">Profile</router-link>
        </li>
      </ul>
    </div>

    <section class="">
      <header class="flex items-center justify-between pb-3 md:w-full lg:w-3/6">
        <h1 class="my-1 text-3xl font-bold capitalize">
          {{ authStore.internInformation.firstName }}
          {{ authStore.internInformation.lastName }}
        </h1>
      </header>

      <section class="grid p-6 bg-white rounded-md shadow-md md:gap-6 md:grid-cols-2">
        <!-- Left side -->
        <div class="flex flex-col gap-2">
          <div>
            <label class="block" for="">First Name</label>
            <input
              type="text"
              v-model="authStore.adminInformation.firstName"
              placeholder="Type here"
              class="w-full md:max-w-md input md:input-sm xl:input-md input-bordered"
              required
            />
          </div>
          <div>
            <label class="block" for="">Last Name</label>
            <input
              type="text"
              v-model="authStore.adminInformation.lastName"
              placeholder="Type here"
              class="w-full md:max-w-md input md:input-sm xl:input-md input-bordered"
              required
            />
          </div>
          <div>
            <label class="block" for="">Email</label>
            <input
              type="text"
              v-model="authStore.adminInformation.email"
              placeholder="Type here"
              class="w-full md:max-w-md input xl:input-md md:input-sm input-bordered"
              required
            />
          </div>
          <div>
            <label class="block" for="">Contact</label>
            <input
              v-model="authStore.adminInformation.contact"
              placeholder="Type here"
              class="w-full md:max-w-md input input-sm xl:input-md input-bordered"
              minlength="10"
              maxlength="10"
              type="number"
              pattern="\d{10}"
              required
            />
          </div>
        </div>
        <!-- right side -->
        <div class="flex flex-col gap-2">
          <div>
            <label class="block" for="">Province</label>
            <select
              class="w-full select md:select-sm xl:select-md select-bordered md:max-w-md"
              v-model="selectedProvinces"
              @change="onSelectProvince"
            >
              <option value="" selected>
                {{
                  authStore.adminInformation.province
                    ? authStore.adminInformation.province
                    : "Select Province"
                }}
              </option>
              <option v-for="item in provinces" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block" for="">City or Municipality</label>
            <select
              class="w-full select md:select-sm xl:select-md select-bordered md:max-w-md"
              v-model="selectedMunicipality"
              @change="onSelectMunicipality"
            >
              <option selected value="">
                {{
                  authStore.adminInformation.municipality
                    ? authStore.adminInformation.municipality
                    : "Select Municipality"
                }}
              </option>
              <option v-for="item in municipality" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block" for="">Barangay</label>
            <select
              class="w-full select md:select-sm select-bordered xl:select-md md:max-w-md"
              v-model="selectedBrgy"
              @change="onSelectBrgy"
            >
              <option value="" selected>
                {{
                  authStore.adminInformation.brgy
                    ? authStore.adminInformation.brgy
                    : "Select Barangay"
                }}
              </option>
              <option v-for="item in brgy" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="">House No. / Street</label>
            <input
              type="text"
              v-model="authStore.adminInformation.street"
              placeholder="Type here"
              class="w-full md:max-w-md md:input-sm xl:input-md input input-bordered"
              required
            />
          </div>
        </div>
        <div class="flex justify-end gap-3 py-3 md:py-0 md:col-span-2">
          <div v-if="!isEditing" @click="isEditing = !isEditing">
            <button class="btn btn-outline btn-accent">Edit Profile</button>
          </div>
          <div v-if="isEditing" class="flex gap-2">
            <button
              @click="isEditing = !isEditing"
              type="button"
              class="btn btn-outline btn-md btn-accent"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="updateAdminInfoHandler"
              class="btn-md btn btn-primary"
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const isEditingisEditEnable = ref(false);
const provinces = ref([]);
const municipality = ref([]);
const isEditing = ref(false);
const brgy = ref([]);
const selected = ref([]);
const selectedProvinces = ref("");
const selectedMunicipality = ref("");
const selectedBrgy = ref("");
const updateInformationHandler = async () => {
  await authStore.updatePersonalInfo();
  alert("Update success!");
  router.replace({ name: "intern_profile" });
  isEditing.value = !isEditing.value;
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
  authStore.adminInformation.province = selectedProvinces.value.name;
  console.log(selectedProvinces.value.code);
  console.log(selectedProvinces.value.name);
};
const onSelectMunicipality = async () => {
  await getBrgy(selectedMunicipality.value.code);
  authStore.adminInformation.municipality = selectedMunicipality.value.name;
};
const onSelectBrgy = () => {
  authStore.adminInformation.brgy = selectedBrgy.value.name;
};

const toggleEdit = () => {
  isEditEnable.value = !isEditEnable.value;
};

const updateAdminInfoHandler = async () => {
  await authStore.updateAdminInfo();
  router.replace({ name: "admin_profile" });
  isEditing.value = !isEditing.value;
};

onMounted(async () => {
  await getProvinces();
});
</script>

<style scoped>
label {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
