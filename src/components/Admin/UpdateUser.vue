<template>
  <div class="px-1 mx-auto md:px-0 md:w-9/12">
    <div class="px-2 py-6 text-sm md:p-6 breadcrumbs">
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
    <header class="flex items-center justify-between px-1 pb-3 bg-gray-200 md:px-6">
      <h1 class="text-3xl">
        Update <span class="font-bold">Information</span>
        {{ userStore.currentRole === "Coordinator" ? "Coor" : userStore.currentRole }}
      </h1>
    </header>
    <section class="gap-6 mx-auto bg-white rounded-md shadow-md md:mx-6">
      <div class="flex flex-col gap-3 rounded-md shadow-md">
        <h2 class="p-3 text-2xl bg-red-800 text-gray-50">Profile Information</h2>
        <section
          v-if="userStore.currentRole === 'Coordinator'"
          class="grid p-3 md:p-6 md:grid-cols-2 gap-x-6"
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
                v-model="userStore.contactNumbers"
                 class="w-full input input-bordered"
                minlength="11"
                maxlength="11"
                type="tel"
                pattern="\d{11}"
                 placeholder="11 Digits Contact Number"
                @input="validateContactNumber"
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
                  {{ userStore.updateInfo.province }}
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
                <option value="" selected>
                  {{ userStore.updateInfo.brgy }}
                </option>
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
                @change="handleSelectDepartmentCoor"
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
          <div
            class="flex justify-between w-full gap-3 mt-6 ml-auto md:justify-end md:col-span-2"
          >
            <router-link
              :to="{ name: 'manage_users' }"
              class="w-36 btn btn-accent btn-outline"
            >
              Cancel
            </router-link>
            <button type="button" @click="updateHandlerCoor" class="w-36 btn btn-primary">
              Update
            </button>
          </div>
        </section>
        <!-- HTE -->
        <section
          v-if="userStore.currentRole === 'HTE'"
          class="grid grid-cols-1 p-1 md:grid-cols-2 md:p-3 gap-y-6 gap-x-6"
        >
          <!-- Left side HTE -->
          <div class="flex flex-col gap-3">
            <div>
              <label for="">Company Name</label>
              <input
                v-model="userStore.updateInfo.companyName"
                type="text"
                placeholder="Type here"
                class="w-full input input-bordered"
              />
            </div>

            <div>
              <label class="block" for="">Company Email</label>
              <input
                v-model="userStore.updateInfo.companyEmail"
                type="text"
                placeholder="Type here"
                class="w-full input input-bordered"
              />
            </div>

            <div>
              <label for="">Contact Number</label>
              <input
                v-model="userStore.contactNumbers"
                class="w-full input input-bordered"
                type="tel"
                placeholder="11 Digits Contact Number"
                minlength="11"
                maxlength="11"
                pattern="[0-9]{11,11}"
                @input="validateContactNumber"
              />
              <p v-if="errMessage">{{ errMessage }}</p>
            </div>

            <div class="">
              <label class="block" for="">Province</label>
              <select
                class="w-full text-base select select-bordered"
                v-model="selectedProvince"
                @change="onSelectProvince"
                required
              >
                <option selected value="">
                  {{ userStore.updateInfo.companyProvince }}
                </option>
                <option v-for="item in provinces" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="">
              <label class="block" for="">Municipality/City</label>
              <select
                class="w-full text-base select select-bordered"
                v-model="selectedMunicipality"
                @change="onSelectMunicipality"
                required
              >
                <option selected value="">
                  {{ userStore.updateInfo.companyMunicipality }}
                </option>
                <option v-for="item in municipality" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col w-full gap-3 md:flex-row">
              <div class="md:w-96">
                <label class="block" for="">Barangay</label>
                <select
                  class="w-full text-base select select-bordered"
                  v-model="selectedBrgy"
                  @change="onSelectBrgy"
                  required
                >
                  <option selected value="">
                    {{ userStore.updateInfo.companyBrgy }}
                  </option>
                  <option v-for="item in brgy" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="md:w-3/6">
                <label class="block" for="">Street </label>
                <input
                  v-model="userStore.updateInfo.companyStreet"
                  type="text"
                  placeholder="Type here"
                  class="w-full input input-bordered"
                />
              </div>
            </div>
          </div>
          <!-- Right side -->
          <div class="flex flex-col w-full">
            <label for="">Business Name</label>
            <div class="flex gap-3 pb-3">
              <label
                class="flex items-center justify-between w-full input input-bordered"
              >
                <input
                  v-model.trim="businessName"
                  type="text"
                  class="max-w-xs"
                  placeholder="Business Name"
                />
              </label>
              <button
                @click="getBusinessLocation"
                class="btn btn-outline bt-bloc btn-accent"
              >
                <i class="text-3xl bx bx-search-alt"></i>
              </button>
            </div>

            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="userStore.updateInfo.mapLocation.lat"
                type="number"
                class="w-full"
                placeholder="Latitude"
                readonly
              />
              <input
                v-model="userStore.updateInfo.mapLocation.lng"
                type="number"
                class="w-full"
                placeholder="Longtitude"
                readonly
              />
            </label>
            <div v-if="errorMessage" class="p-3 text-center error">
              {{ errorMessage }}
            </div>
            <div v-if="!locationRes && !errorMessage" class="p-3 text-center error">
              No results to show
            </div>
            <div v-if="isMapShow" id="map" class="h-[300px] w-[100%] mt-3"></div>
          </div>
          <div class="flex justify-between gap-3 md:col-span-2 md:mt-6 md:ml-auto">
            <router-link
              :to="{ name: 'manage_users', query: { users: 'HTE' } }"
              class="w-3/6 md:w-36 btn btn-accent btn-outline"
            >
              Cancel
            </router-link>
            <button
              type="button"
              @click="updateHandlerHTE"
              class="w-3/6 md:w-36 btn btn-md btn-primary"
            >
              Update
            </button>
          </div>
        </section>
        <!-- Intern Information -->
        <section
          v-if="userStore.currentRole === 'Intern'"
          class="grid w-full p-3 md:p-6 xl:p-2 xl:px-3 md:grid-cols-2 gap-x-6"
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
                v-model="userStore.contactNumbers"
                minlength="11"
                maxlength="11"
                type="tel"
                pattern="\d{11}"
                placeholder="Type here"
                class="w-full input input-bordered"
                @input="validateContactNumber"
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
                  {{
                    userStore.updateInfo.internProvince
                      ? userStore.updateInfo.internProvince
                      : "Select Province"
                  }}
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
                  {{
                    userStore.updateInfo.internMunicipality
                      ? userStore.updateInfo.internMunicipality
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
                class="w-full text-base select select-bordered"
                v-model="selectedBrgy"
                @change="onSelectBrgy"
                required
              >
                <option value="" selected>
                  {{
                    userStore.updateInfo.internBrgy
                      ? userStore.updateInfo.internBrgy
                      : "Select Barangay"
                  }}
                </option>
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
                @change="handleSelectDepartmentCoor"
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
          <div
            class="flex justify-between w-full gap-3 mt-6 ml-auto md:justify-end md:col-span-2"
          >
            <button
               @click="router.back()"
              class="w-36 btn btn-accent btn-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="updateHandlerIntern"
              class="w-36 btn btn-primary"
            >
              Update
            </button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
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
const businessName = ref('');
const errMessage = ref('');

const validateContactNumber = () => {
      // Remove any non-digit characters
      userStore.contactNumbers = userStore.contactNumbers.replace(/\D/g, '');
      userStore.contactNumbers = userStore.contactNumbers.slice(0, 11);
      // Check if the input exceeds 11 digits
      // if (contactNumber.value.length > 11) {
      //   errorMessage.value = 'Contact number cannot exceed 11 digits';
      //   // Truncate the value to 11 digits
      
      // } else {
      //   errorMessage.value = '';
      // }
    };


const updateHandlerCoor = async () => {
  if (userStore.updateInfo.email === "") {
    return alert("Email cannot be empty");
  }
  if (userStore.updateInfo.firstName === "") {
    return alert("First Name cannot be empty");
  }
  if (userStore.updateInfo.lastName === "") {
    return alert("Last Name cannot be empty");
  }
  if (userStore.contactNumbers === "") {
    return alert("Contact number cannot be empty");
  }
  if (userStore.contactNumbers.length < 11 ) {
    return alert("Contact number must 11 digits");
  }
  if (userStore.updateInfo.department === "") {
    return alert("Department cannot be empty");
  }
  if (userStore.updateInfo.street === "") {
    return alert("Street cannot be empty");
  }
  if (userStore.updateInfo.brgy === "") {
    return alert("Brgy cannot be empty");
  }
  if (userStore.updateInfo.municipality === "") {
    return alert("Municipality cannot be empty");
  }
  if (userStore.updateInfo.province === "") {
    return alert("Province cannot be empty");
  }
  const response = await userStore.updateInformationCoor();
  alert(response.data.message);
  router.push({
    name: "manage_users"
  });
};

// Update HTE function
async function updateHandlerHTE() {
  if (userStore.updateInfo.companyEmail === "") {
    return alert("Email cannot be empty");
  }
  if (userStore.updateInfo.companyName === "") {
    return alert("Company Name cannot be empty");
  }
  if (userStore.contactNumbers === "") {
    return alert("Contact number cannot be empty");
  }
  if (userStore.contactNumbers.length < 11 ) {
    return alert("Contact number must 11 digits");
  }
  if (userStore.updateInfo.companyStreet === "") {
    return alert("Street cannot be empty");
  }
  if (userStore.updateInfo.companyBrgy === "") {
    return alert("Barangay cannot be empty");
  }
  if (userStore.updateInfo.companyMunicipality === "") {
    return alert("Municipality or City cannot be empty");
  }
  if (userStore.updateInfo.companyProvince === "") {
    return alert("Province cannot be empty");
  }
  if (userStore.updateInfo.mapLocation.lat === "") {
    return alert("Please provide lat value");
  }
  if (userStore.updateInfo.mapLocation.lng === "") {
    return alert("Please provice lat value");
  }
  const response = await userStore.updateInformationHTE();
  alert(response.data.message);
  router.push({
    name: "manage_users"
  });
}
// Update Intern function
const updateHandlerIntern = async () => {
  if (userStore.updateInfo.internEmail === "") {
    return alert("Email cannot be empty");
  }
  if (userStore.updateInfo.internfirstName === "") {
    return alert("First Name cannot be empty");
  }
  if (userStore.updateInfo.internlastName === "") {
    return alert("Last Name cannot be empty");
  }
  if (userStore.contactNumbers === "") {
    return alert("Contact number cannot be empty");
  }
  if (userStore.contactNumbers.length < 11 ) {
    return alert("Contact number must 11 digits");
  }
  if (userStore.updateInfo.internProvince === "") {
    return alert("Province cannot be empty");
  }
  if (userStore.updateInfo.internMunicipality === "") {
    return alert("Municipality or City cannot be empty");
  }
  if (userStore.updateInfo.internBrgy === "") {
    return alert("Barangay cannot be empty");
  }
  if (userStore.updateInfo.internStreet === "") {
    return alert("Street cannot be empty");
  }
  if (userStore.updateInfo.internDepartment === "") {
    return alert("Department cannot be empty");
  }
  const response = await userStore.updateInformationIntern();
  alert(response.data.message);
  router.push({
    name: "manage_users",
    query: {
      users: "All",
    },
  });
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
const handleSelectDepartmentCoor = (event) => {
  console.log(event.target.value);
  userStore.updateInfo.department = event.target.value;
  userStore.updateInfo.internDepartment = event.target.value;
};

onMounted(async () => {
  userStore.fetchUpdateInformation(route.params.id);
  await userStore.fetchDepartmentList();
  await getProvinces();
  // await getBusinessLocation();
});

const locationRes = ref(null);
const errorMessage = ref(null);
const map = ref(null);
const marker = ref(null);
const isMapShow = ref(true);
const getBusinessLocation = async () => {
  if (!businessName.value.trim()) {
    userStore.updateInfo.mapLocation.lat = "";
    userStore.updateInfo.mapLocation.lng = "";
    errorMessage.value = "Please enter a business name.";
    isMapShow.value = false;
    return;
  }
  isMapShow.value = true;
  errorMessage.value = null;
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_API_GOOGLE_KEY, // Replace with your actual API key
      libraries: ["places"],
      version: "weekly",
    });

    const { PlacesService } = await loader.importLibrary("places");

    const service = new PlacesService(document.createElement("div"));

    const request = {
      query: businessName.value,
      fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const place = results[0];
        locationRes.value = place.geometry.location.toJSON();
        userStore.updateInfo.mapLocation.lat = locationRes.value.lat;
        userStore.updateInfo.mapLocation.lng = locationRes.value.lng;
        initMap();
      } else {
        errorMessage.value = "Business not found.";
        locationRes.value = null;
        isMapShow.value = false;
        initMap();
      }
    });
  } catch (err) {
    console.error(err);
    errorMessage.value = "An error occurred while fetching the location.";
  }
};

const initMap = () => {
  map.value = new google.maps.Map(document.getElementById("map"), {
    center: locationRes.value,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });
  marker.value = new google.maps.Marker({
    position: locationRes.value,
    map: map.value,
    draggable: true,
  });
  marker.value.addListener("dragend", (event) => {
    userStore.updateInfo.mapLocation.lat = event.latLng.lat().toFixed(7);
    userStore.updateInfo.mapLocation.lng = event.latLng.lng().toFixed(6);
  });
  map.value.addListener("click", (event) => {
    const clickedLocation = event.latLng;
    userStore.updateInfo.mapLocation.lat = clickedLocation.lat().toFixed(7);
    userStore.updateInfo.mapLocation.lng = clickedLocation.lng().toFixed(6);

    // Move the marker to the clicked location
    marker.value.setPosition(clickedLocation);
  });
};
</script>

<style scoped>
label {
  font-weight: 600;
  margin-bottom: 3px;
  color: rgb(87, 42, 42);
}
</style>
