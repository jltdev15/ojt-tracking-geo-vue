<template>
  <div class="">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Admin Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'manage_users' }">Users management</router-link>
        </li>
        <li>
          <router-link class="text-red-800" :to="{ name: 'UpdateUser' }"
            >Update user</router-link
          >
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6 pb-3 bg-gray-200">
      <h1 class="text-3xl">
        Update <span class="font-bold">Information</span> {{ userStore.currentRole }}
      </h1>
    </header>
    <section class="grid w-4/6 gap-6 mx-6">
      <div class="flex flex-col w-full gap-3 bg-white rounded-md shadow-md">
        <h2 class="p-3 text-2xl bg-red-800 text-gray-50">Profile Information</h2>
        <!-- Coord -->
        <form @submit.prevent="updateHandlerCoor" action="">
          <section
            v-if="userStore.currentRole === 'Coordinator'"
            class="grid grid-cols-2 p-6 gap-x-6"
          >
            <div class="flex flex-col gap-3">
              <div>
                <label for="">Email</label>
                <input
                  v-model="userStore.updateInfo.email"
                  type="email"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">First Name</label>
                <input
                  v-model="userStore.updateInfo.firstName"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Last Name</label>
                <input
                  v-model="userStore.updateInfo.lastName"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Contact Number</label>
                <input
                  v-model="userStore.updateInfo.contactNumber"
                  minlength="11"
                  maxlength="11"
                  type="number"
                  pattern="\d{11}"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="">
                <label class="block" for="">Province</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedProvince"
                  @change="onSelectProvince"
                  required
                >
                  <option selected value="">{{ userStore.updateInfo.province }}</option>
                  <option v-for="item in provinces" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block" for="">Municipality / City</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedMunicipality"
                  @change="onSelectMunicipality"
                  required
                >
                  <option value="" selected>
                    {{ userStore.updateInfo.municipality }}
                  </option>
                  <option v-for="item in municipality" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block" for="">Barangay</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedBrgy"
                  @change="onSelectBrgy"
                  required
                >
                  <option value="" selected>{{ userStore.updateInfo.brgy }}</option>
                  <option v-for="item in brgy" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="">Street</label>
                <input
                  v-model="userStore.updateInfo.street"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Select Department</label>
                <select
                  @change="handleSelectDepartment"
                  v-model="userStore.updateInfo.department"
                  class="w-full py-3 select select-bordered"
                  required
                >
                  <option selected disabled value="">Select department</option>

                  <option
                    v-for="item in userStore.departmentlist"
                    :key="item._id"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex col-span-2 gap-3 mt-6 ml-auto">
              <router-link
                :to="{ name: 'manage_users' }"
                class="w-36 btn btn-accent btn-outline"
              >
                Cancel
              </router-link>
              <button type="submit" class="w-36 btn btn-primary">Update</button>
            </div>
          </section>
        </form>

        <!-- HTE -->
        <section v-if="userStore.currentRole === 'HTE'" class="">
          <label for="">Company Name</label>
          <input
            v-model="userStore.updateInfo.companyName"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label class="block" for="">Company Email</label>
          <input
            v-model="userStore.updateInfo.companyEmail"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <label class="block" for="">Company Address</label>
          <input
            v-model="userStore.updateInfo.companyAddress"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label for="">Contact Number</label>
          <input
            v-model="userStore.updateInfo.companyContact"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <p>Please provide exact map coordinates</p>
          <label class="flex items-center gap-2 input input-bordered">
            <input
              v-model="userStore.updateInfo.mapLocation.lat"
              type="number"
              class="grow"
              placeholder="Latitude"
            />
            <input
              v-model="userStore.updateInfo.mapLocation.lng"
              type="number"
              class="grow"
              placeholder="Longtitude"
            />
          </label>
          <label class="block py-3 text-center" for=""
            >Has Memorandum of Agreement?</label
          >
          <div class="flex justify-center gap-3 pb-4 join">
            <input
              class="join-item btn"
              type="radio"
              name="options"
              value="true"
              aria-label="Yes"
              v-model="userStore.updateInfo.hasMoa"
              @change="onChange"
            />
            <input
              class="join-item btn"
              type="radio"
              name="options"
              value="false"
              aria-label="No"
              v-model="userStore.updateInfo.hasMoa"
              @change="onChange"
            />
          </div>

          <button @click="updateHandlerHTE" class="btn btn-primary btn-block">
            Update
          </button>
        </section>
        <!-- Intern Information -->
        <form @submit.prevent="updateHandlerIntern" action="">
          <section
            v-if="userStore.currentRole === 'Intern'"
            class="grid w-full grid-cols-2 p-6 gap-x-6"
          >
            <div class="flex flex-col gap-3">
              <div>
                <label for="">Email</label>
                <input
                  v-model="userStore.updateInfo.internEmail"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">First Name</label>
                <input
                  v-model="userStore.updateInfo.internfirstName"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Middle Initial</label>
                <input
                  v-model="userStore.updateInfo.internMiddle"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Last Name</label>
                <input
                  v-model="userStore.updateInfo.internlastName"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>

              <div>
                <label for="">Contact Number</label>
                <input
                  v-model="userStore.updateInfo.internContact"
                  minlength="11"
                  maxlength="11"
                  type="text"
                  pattern="\d{11}"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <div class="">
                <label class="block" for="">Province</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedProvince"
                  @change="onSelectProvince"
                  required
                >
                  <option selected value="">
                    {{ userStore.updateInfo.internProvince }}
                  </option>
                  <option v-for="item in provinces" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block" for="">Municipality / City</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedMunicipality"
                  @change="onSelectMunicipality"
                  required
                >
                  <option value="" selected>
                    {{ userStore.updateInfo.internMunicipality }}
                  </option>
                  <option v-for="item in municipality" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block" for="">Barangay</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedBrgy"
                  @change="onSelectBrgy"
                  required
                >
                  <option value="" selected>{{ userStore.updateInfo.internBrgy }}</option>
                  <option v-for="item in brgy" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="">Street</label>
                <input
                  v-model="userStore.updateInfo.internStreet"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                  required
                />
              </div>
              <div>
                <label for="">Select Department</label>
                <select
                  @change="handleSelectDepartment"
                  v-model="userStore.updateInfo.internDepartment"
                  class="w-full py-3 select select-bordered"
                  required
                >
                  <option selected disabled value="">Select department</option>
                  <option
                    v-for="item in userStore.departmentlist"
                    :key="item._id"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex col-span-2 gap-3 mt-6 ml-auto">
              <router-link
                :to="{ name: 'manage_users' }"
                class="w-36 btn btn-accent btn-outline"
              >
                Cancel
              </router-link>
              <button type="submit" class="w-36 btn btn-primary">Update</button>
            </div>
          </section>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, reactive } from "vue";
const userStore = useAdminUserStore();
const route = useRoute();
const router = useRouter();
const selectedProvince = ref("");
const selectedMunicipality = ref("");
const selectedBrgy = ref("");
const provinces = ref([]);
const municipality = ref([]);
const brgy = ref([]);

const updateHandlerCoor = async () => {
  const response = await userStore.updateInformationCoor();
  alert(response.data.message);
  router.push({ name: "manage_users" });
};
const updateHandlerHTE = async () => {
  await userStore.updateInformationHTE();
  // alert(response.data.message);
  router.push({ name: "manage_users" });
};
const updateHandlerIntern = async () => {
  const response = await userStore.updateInformationIntern();
  console.log(response);
  alert(response.data.message);
  router.push({ name: "manage_users" });
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
  await getMunicipalities(selectedProvince.value.code);
  if (userStore.currentRole === "Coordinator") {
    return (userStore.updateInfo.province = selectedProvince.value.name);
  }
  if (userStore.currentRole === "Intern") {
    return (userStore.updateInfo.internProvince = selectedProvince.value.name);
  }
  if (userStore.currentRole === "HTE") {
    return (userStore.updateInfo.companyProvince = selectedProvince.value.name);
  }
};
const onSelectMunicipality = async () => {
  await getBrgy(selectedMunicipality.value.code);
  if (userStore.currentRole === "Coordinator") {
    return (userStore.updateInfo.municipality = selectedMunicipality.value.name);
  }
  if (userStore.currentRole === "Intern") {
    return (userStore.updateInfo.internMunicipality = selectedMunicipality.value.name);
  }
  if (userStore.currentRole === "HTE") {
    return (userStore.updateInfo.companyMunicipality = selectedMunicipality.value.name);
  }
};
const onSelectBrgy = () => {
  if (userStore.currentRole === "Coordinator") {
    return (userStore.updateInfo.brgy = selectedBrgy.value.name);
  }
  if (userStore.currentRole === "Intern") {
    return (userStore.updateInfo.internBrgy = selectedBrgy.value.name);
  }
  if (userStore.currentRole === "HTE") {
    return (userStore.updateInfo.companyBrgy = selectedBrgy.value.name);
  }
  // coordinator.brgy = selectedBrgy.value.name;
};
onMounted(async () => {
  userStore.fetchUpdateInformation(route.params.id);
  await userStore.fetchDepartmentList();
  await getProvinces();
});
</script>

<style lang="scss" scoped></style>
