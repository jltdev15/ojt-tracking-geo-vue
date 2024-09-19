<template>
  <section class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'manage_users' }">Manage users</router-link>
        </li>
      </ul>
    </div>
    <header class="flex flex-col items-center gap-3 px-6 bg-gray-200 md:flex-row md:justify-between">
      <h1 class="text-3xl">User <span class="text-3xl font-bold">Management</span></h1>
      <div>
        <button @click="handleToggleModal" class="btn btn-block">
          <i class="ri-add-line"></i>Add New User
        </button>
      </div>
    </header>
    <div class="flex justify-end gap-3 py-3 md:px-6 md:p-6">
      <!-- <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" /> -->
      <select class="w-full select select-bordered" @change="handleUserFilter">
        <option selected disabled value="Set filter">Search filter</option>
        <option value="Intern">Intern</option>
        <option value="HTE">HTE</option>
        <option value="Coordinator">Coordinator</option>
        <option value="">All</option>
      </select>
    </div>
    <section class="md:px-6">
      <EasyDataTable :headers="headers" :items="userStore.getNumberOfUsersOnly" :search-field="searchField"
        :search-value="searchValue" :rows-per-page="10" show-index table-class-name="customize-table">
        <template #item-operation="item">
          <div class="flex justify-between gap-3 py-2">
            <button @click="toggleConfirmationModal(item._id)"
              class="flex items-center justify-center w-24 gap-2 py-3 btn-accent btn btn-outline">
              Remove<i class="fa-solid fa-trash"></i>
            </button>
            <router-link :to="{ name: 'UpdateUser', params: { id: item._id } }"
              class="flex items-center justify-center w-24 gap-2 py-3 btn btn-primary text-gray-50">
              Update <i class="fa-solid fa-pen-to-square"></i>
            </router-link>
          </div>
        </template>
      </EasyDataTable>
    </section>

    <Modal :show="isModalShow" @close="isModalShow = !isModalShow" title="New Account">
      <!-- <Modal :show="true" title="New Account"> -->
      <template #default>
        <div>
          <p v-if="selectedRole === 'Select User Role'" class="pb-3 font-medium text-center text-gray-600">
            Please select role to proceed
          </p>
          <select @change="handleSelectChange" v-model.trim="selectedRole" class="w-full py-3 select select-bordered">
            <option selected disabled value="Select User Role">Select User Role</option>
            <option value="Admin">Admin</option>
            <option value="Coordinator">Coordinator</option>
            <option value="HTE">HTE</option>
            <option value="Intern">Intern</option>
          </select>
          <div v-if="selectedRole === 'Intern'">
            <form @submit.prevent="handleInternUser" action="" class="flex flex-col gap-3 pt-3">
              <label class="flex items-center gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input v-model.trim="intern.username" type="text" class="grow" placeholder="Username" required />
              </label>
              <label class="flex items-center justify-between gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input class="grow" placeholder="Secure password" v-model.trim="intern.password"
                  :type="passwordFieldType" required />
              </label>
              <div class="flex justify-end">
                <div class="flex flex-row-reverse gap-3">
                  <button class="ml-auto text-right btn btn-primary" @click="handleGeneratePassword">
                    Generate password
                  </button>
                  <button class="ml-auto text-right btn btn-outline" @click="toggleShowPassword">
                    {{ showPassword ? "Hide" : "Show" }}
                  </button>
                </div>
              </div>

              <label class="flex items-center gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input v-model="intern.email" type="email" class="grow" placeholder="Email" required />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="intern.firstName" type="text" class="grow" placeholder="First Name" required />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="intern.lastName" type="text" class="grow" placeholder="Last Name" required />
              </label>
              <!-- <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="intern.contact"
                type="number"
                class="grow"
                placeholder="Contact"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="intern.address"
                type="text"
                class="grow"
                placeholder="Complete Address"
              />
            </label> -->
              <select @change="handleSelectDepartmentIntern" class="w-full py-3 select select-bordered">
                <option selected disabled value="">Select department</option>

                <option v-for="item in userStore.departmentlist" :key="item._id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
              <div class="flex flex-col gap-2">
                <button type="submit" class="text-lg btn btn-primary btn-block">
                  Create User
                </button>
                <button type="button" class="text-lg btn-accent btn btn-outline btn-block" @click="handleToggleModal">
                  Close
                </button>
              </div>
            </form>
          </div>
          <!-- <div v-if="selectedRole === 'HTE'" class="flex flex-col gap-3 pt-3"> -->
          <div v-if="selectedRole === 'HTE'" class="flex gap-3 pt-3">
            <div class="flex flex-col w-full gap-3">
              <label class="flex items-center gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input v-model="hte.username" type="text" class="grow" placeholder="Username" />
              </label>
              <label class="flex items-center justify-between gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd" />
                </svg>
                <input class="grow" placeholder="Secure password" v-model.trim="hte.password"
                  :type="passwordFieldType" />
              </label>
              <div class="flex flex-row-reverse justify-start gap-3">
                <button class="text-right btn btn-primary" @click="handleGeneratePassword">
                  Generate password
                </button>
                <button class="text-right btn btn-accent btn-outline" @click="toggleShowPassword">
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>

              <label class="flex items-center gap-2 input input-bordered">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="w-4 h-4 opacity-70">
                  <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input v-model="hte.email" type="email" class="grow" placeholder="Email" />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="hte.fullName" type="text" class="grow" placeholder="Company name" />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="hte.contactNumber" type="number" class="grow" placeholder="Contact number" />
              </label>

              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="hte.address" type="text" class="grow" placeholder="Company Address" />
                <input v-model="hte.address" type="text" class="grow" placeholder="Company Address" />
              </label>
              <p>
                Please provide exact map coordinates
                <span class="text-blue-500 underline">
                  <a href="https://www.google.com/maps" target="_blank">open google map</a></span>
              </p>
              <label class="flex items-center gap-2 input input-bordered">
                <input v-model="hte.mapLocation.lat" type="number" class="w-full" placeholder="Latitude" />
                <input v-model="hte.mapLocation.lng" type="number" class="w-full" placeholder="Longtitude" />
              </label>

              <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="center" :zoom="15"
                mapId="DEMO_MAP_ID">
                <Marker :options="{ position: center }" />
              </GoogleMap>
              <!-- <label for="" class="font-medium text-center"
                >Is Memorandum of Agreement provided?</label
              >
              <div class="justify-center gap-3 pb-4 join">
                <input
                  class="join-item btn"
                  type="radio"
                  name="options"
                  value="true"
                  aria-label="Yes"
                  v-model="hte.hasMoa"
                  @change="onChange"
                />
                <input
                  class="join-item btn"
                  type="radio"
                  name="options"
                  value="false"
                  aria-label="No"
                  v-model="hte.hasMoa"
                  @change="onChange"
                />
              </div> -->
              <div class="flex flex-col gap-2 mt-auto">
                <button @click="handleHteUser" class="text-lg btn btn-primary btn-block">
                  Create User
                </button>
                <button class="text-lg btn btn-accent btn-outline btn-block" @click="handleToggleModal">
                  Close
                </button>
              </div>
            </div>
          </div>
          <div v-if="selectedRole === 'Coordinator'" class="flex flex-col gap-3 pt-3">
            <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
            <label class="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input v-model.trim="coordinator.username" type="text" class="grow" placeholder="Username" />
            </label>
            <label class="flex items-center justify-between gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd" />
              </svg>
              <input class="grow" placeholder="Secure password" v-model.trim="coordinator.password"
                :type="passwordFieldType" />
            </label>
            <div class="flex justify-end">
              <div class="flex flex-row-reverse gap-3">
                <button class="ml-auto text-right btn btn-primary" @click="handleGeneratePassword">
                  Generate password
                </button>
                <button class="ml-auto text-right btn btn-outline" @click="toggleShowPassword">
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>
            </div>

            <label class="flex items-center gap-2 input input-bordered">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                class="w-4 h-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input v-model="coordinator.email" type="text" class="grow" placeholder="Email" />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input v-model="coordinator.fullName" type="text" class="grow" placeholder="Coordinator Full Name" />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input v-model="coordinator.contactNumber" type="text" class="grow" placeholder="Contact number" />
            </label>

            <div class="py-3">
              <select @change="handleSelectDepartmentCoor" class="w-full py-3 select select-bordered">
                <option selected disabled value="">Select department</option>

                <option v-for="item in userStore.departmentlist" :key="item._id" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <button @click="handleCoorUser" class="text-lg btn btn-primary btn-block">
                Create Account
              </button>
              <button class="text-lg btn btn-outline btn-block" @click="handleToggleModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <Modal :show="isConfirmationModalShow" title="Confirmation">
      <template #default>
        <p class="text-xl font-medium">Are you sure you want to remove this account?</p>
        <div class="flex justify-end gap-3 pt-9">
          <button @click="isConfirmationModalShow = !isConfirmationModalShow" class="btn btn-accent btn-outline">
            Cancel
          </button>
          <button type="button" @click="handleDeleteAccount" class="bg-red-600 btn text-gray-50">
            Proceed
          </button>
        </div>
      </template>
    </Modal>
  </section>
</template>

<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useRouter } from "vue-router";
const userStore = useAdminUserStore();
import { ref, onMounted, reactive } from "vue";
const center = { lat: 40.689247, lng: -74.044502 };
const router = useRouter();
const searchField = ref("role");
const searchValue = ref("");
const isModalShow = ref(false);
const selectedRole = ref("Select User Role");
const passwordFieldType = ref("password");
const showPassword = ref(false);
const isConfirmationModalShow = ref(false);
const apiKey = import.meta.env.VITE_API_GOOGLE_KEY;
const handleUserFilter = async (event) => {
  console.log("====================================");
  console.log(event.target.value);
  console.log("====================================");
  searchValue.value = event.target.value;
};
const intern = reactive({
  username: "",
  password: "",
  contact: "",
  address: "",
  role: selectedRole.value,
  email: "",
  firstName: "",
  lastName: "",
  department: "",
});
const hte = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  fullName: "",
  contactNumber: "",
  address: "",
  hasMoa: "",
  mapLocation: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});
const coordinator = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  fullName: "",
  contactNumber: "",
  department: "",
});
const admin = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  firstname: "",
  middlename: "",
  lastname: "",
});
const selectedOption = ref("Select Department");
const userId = ref("");

const toggleConfirmationModal = (id) => {
  console.log(id);
  userId.value = id;
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};
const handleDeleteAccount = async () => {
  await userStore.removeAccount(userId.value);
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};
const handleGeneratePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let generatedPassword = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    generatedPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  if (selectedRole.value === "Intern") {
    return (intern.password = generatedPassword);
  }
  if (selectedRole.value === "HTE") {
    return (hte.password = generatedPassword);
  }
  if (selectedRole.value === "Coordinator") {
    return (intern.password = generatedPassword);
  }
  // if(selectedRole.value === 'intern'){
  //   return intern.password = generatedPassword;
  // }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
  passwordFieldType.value = showPassword.value ? "text" : "password";
};
const handleToggleModal = async () => {
  isModalShow.value = !isModalShow.value;
  selectedRole.value = "Select User Role";
};
const resetInternForms = () => {
  intern.username = "";
  intern.password = "";
  intern.role = "Select Role";
  intern.email = "";
  // intern.fullName = "";
  intern.department = "";
  // intern.contact = "";
  // intern.address = "";
  intern.firstName = "";
  intern.lastName = "";
};
const resetHTEForms = () => {
  hte.username = "";
  hte.password = "";
  hte.role = "Select Role";
  hte.email = "";
  hte.fullName = "";
  hte.contactNumber = "";
  hte.address = "";
  hte.hasMoa = "";
  hte.mapLocation.lat = "";
  hte.mapLocation.lng = "";
};
const resetCoorForms = () => {
  coordinator.username = "";
  coordinator.password = "";
  coordinator.role = "Select Role";
  coordinator.email = "";
  coordinator.fullName = "";
  coordinator.contactNumber = "";
  coordinator.department = "Select Department";
};

const handleSelectDepartmentIntern = (event) => {
  console.log(event.target.value);
  intern.department = event.target.value;
};
const handleSelectDepartmentCoor = (event) => {
  console.log(event.target.value);
  coordinator.department = event.target.value;
};

onMounted(async () => {
  await userStore.fetchUsers();
  await userStore.fetchDepartmentList();
});

const handleInternUser = async () => {
  try {
    if (intern.username === "") {
      return alert("Please enter username");
    }
    if (intern.password === "") {
      return alert("Please enter password");
    }
    if (intern.email === "") {
      return alert("Please enter email");
    }

    if (intern.department === "") {
      return alert("Please select department");
    }
    await userStore.addIntern(intern);

    resetInternForms();
    await handleToggleModal();
  } catch (err) {
    console.log(err);
  }
};
const handleHteUser = async () => {
  try {
    if (hte.username === "") {
      return alert("Please enter username");
    }
    if (hte.password === "") {
      return alert("Please enter password");
    }
    if (hte.email === "") {
      return alert("Please enter email");
    }
    if (hte.fullName === "") {
      return alert("Please enter company name");
    }
    if (hte.contactNumber === "") {
      return alert("Please enter contact number");
    }
    if (hte.address === "") {
      return alert("Please enter address");
    }
    if (hte.mapLocation.lat === "") {
      return alert("Please enter lat value");
    }
    if (hte.mapLocation.lng === "") {
      return alert("Please enter lng value");
    }

    const response = await userStore.addHTE(hte);
    alert("HTE Added");
    resetHTEForms();
    await handleToggleModal();
  } catch (err) {
    console.log(err);
  }
};
const handleCoorUser = async () => {
  try {
    await userStore.addCoordinator(coordinator);

    await handleToggleModal();
    resetCoorForms();
  } catch (err) {
    console.log(err);
  }
};

const handleSelectChange = async () => {
  if (selectedRole.value === "Intern") {
    intern.role = selectedRole.value;
  }
  if (selectedRole.value === "HTE") {
    hte.role = selectedRole.value;
  }
  if (selectedRole.value === "Admin") {
    admin.role = selectedRole.value;
  }
  if (selectedRole.value === "Coordinator") {
    coordinator.role = selectedRole.value;
  }
};
const headers = [
  { text: "USERNAME", value: "username" },

  { text: "ROLE", value: "role" },
  { text: "STATUS", value: "status" },
  { text: "DATE CREATED", value: "createdAt" },
  { text: "ACTIONS", value: "operation", width: 10 },
];
</script>

<style></style>
