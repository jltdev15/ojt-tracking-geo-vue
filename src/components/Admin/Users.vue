<template>
  <section class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-200">
      <h1 class="text-3xl">User <span class="text-3xl font-bold">Management</span></h1>
      <div>
        <button @click="handleToggleModal" class="btn btn-block">
          <i class="ri-add-line"></i>Add New User
        </button>
      </div>
    </header>
    <div class="flex justify-end gap-3 p-3">
      <input
        type="text"
        placeholder="Type here"
        class="w-full max-w-xs input input-bordered"
        v-model="searchValue"
      />
      <select class="w-48 select select-bordered" v-model.trim="searchField">
        <option selected disabled value="Set filter">Set filter</option>
        <option value="role">Role</option>
        <option value="name">Name</option>
      </select>
    </div>

    <EasyDataTable
      :headers="headers"
      :items="userStore.usersList"
      :search-field="searchField"
      :search-value="searchValue"
      show-index
    >
      <template #item-operation="item">
        <div class="flex justify-between gap-3 py-2">
          <button
            @click="adminAuthStore.showUpdateModal(item)"
            class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50"
          >
            Edit <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            @click="adminAuthStore.showDeleteModal(item)"
            class="flex items-center justify-center w-24 gap-2 py-3 bg-red-500 text-gray-50"
          >
            Remove<i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </template>
    </EasyDataTable>
    <Modal :show="isModalShow" title="New Account">
      <!-- <Modal :show="true" title="New Account"> -->
      <template #default>
        <div>
          <p
            v-if="profile.role === 'Select Role'"
            class="pb-3 font-medium text-center text-gray-600"
          >
            Please select role to proceed
          </p>
          <select
            @change="handleSelectChange"
            v-model.trim="profile.role"
            class="w-full py-3 select select-bordered"
          >
            <option selected disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="coordinator">Coordinator</option>
            <option value="HTE">HTE</option>
            <option value="intern">Intern</option>
          </select>
          <div v-if="profile.role === 'intern'" class="flex flex-col gap-3 pt-3">
            <label class="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                />
              </svg>
              <input
                v-model.trim="profile.username"
                type="text"
                class="grow"
                placeholder="Username"
              />
            </label>
            <label class="flex items-center justify-between gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="grow"
                placeholder="Secure password"
                v-model.trim="profile.password"
                :type="passwordFieldType"
              />
            </label>
            <div class="flex justify-end">
              <div class="flex gap-3 flex-row-reverse">
                <button
                  class="btn ml-auto text-right btn-primary"
                  @click="handleGeneratePassword"
                >
                  Generate password
                </button>
                <button
                  class="btn ml-auto text-right btn-outline"
                  @click="toggleShowPassword"
                >
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>
            </div>

            <label class="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                />
              </svg>
              <input
                v-model="profile.email"
                type="text"
                class="grow"
                placeholder="Email"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="profile.fullName"
                type="text"
                class="grow"
                placeholder="Full Name"
              />
            </label>
            <select
              @change="handleSelectDepartment"
              v-model="profile.department"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled value="Select Department">
                Select Department
              </option>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Tourism">Tourism</option>
            </select>
            <div class="flex flex-col gap-2">
              <button @click="handleSubmitForm" class="text-lg btn btn-primary btn-block">
                Create User
              </button>
              <button
                class="text-lg btn btn-outline btn-block"
                @click="handleToggleModal"
              >
                Close
              </button>
            </div>
          </div>
          <div v-if="profile.role === 'hte'" class="flex flex-col gap-3 pt-3">
            <label class="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                />
              </svg>
              <input
                v-model.trim="profile.username"
                type="text"
                class="grow"
                placeholder="Username"
              />
            </label>
            <label class="flex items-center justify-between gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="grow"
                placeholder="Secure password"
                v-model.trim="profile.password"
                :type="passwordFieldType"
              />
            </label>
            <div class="flex justify-end">
              <div class="flex gap-3 flex-row-reverse">
                <button
                  class="btn ml-auto text-right btn-primary"
                  @click="handleGeneratePassword"
                >
                  Generate password
                </button>
                <button
                  class="btn ml-auto text-right btn-outline"
                  @click="toggleShowPassword"
                >
                  {{ showPassword ? "Hide" : "Show" }}
                </button>
              </div>
            </div>

            <label class="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                />
              </svg>
              <input
                v-model="profile.email"
                type="text"
                class="grow"
                placeholder="Email"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="profile.fullName"
                type="text"
                class="grow"
                placeholder="Full Name"
              />
            </label>
            <select
              @change="handleSelectDepartment"
              v-model="profile.department"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled value="Select Department">
                Select Department
              </option>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Tourism">Tourism</option>
            </select>
            <div class="flex flex-col gap-2">
              <button @click="handleSubmitForm" class="text-lg btn btn-primary btn-block">
                Create User
              </button>
              <button
                class="text-lg btn btn-outline btn-block"
                @click="handleToggleModal"
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
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
import { ref, onMounted, reactive } from "vue";

const searchField = ref("Set filter");
const searchValue = ref("");
const isModalShow = ref(false);

const passwordFieldType = ref("password");
const showPassword = ref(false);

const profile = reactive({
  username: "",
  password: "",
  role: "Select Role",
  email: "",
  fullName: "",
  department: "Select Department",
});

const handleGeneratePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let generatedPassword = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    generatedPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  profile.password = generatedPassword;
};
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
  passwordFieldType.value = showPassword.value ? "text" : "password";
};
const handleToggleModal = async () => {
  isModalShow.value = !isModalShow.value;
  profile.role = "Select Role";
};

onMounted(async () => {
  await userStore.fetchUsers();
});

const handleSubmitForm = async () => {
  await userStore.addIntern(profile);
  (profile.username = ""),
    (profile.password = ""),
    (profile.role = "Select Role"),
    (profile.email = ""),
    (profile.fullName = ""),
    (profile.department = "Select Department");
  await handleToggleModal();
};

const headers = [
  { text: "USERNAME", value: "username" },

  { text: "ROLE", value: "role" },
  { text: "STATUS", value: "status" },
  { text: "DATE CREATED", value: "createdAt" },
  { text: "ACTIONS", value: "operation", width: 10 },
];
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: rgb(30 64 175);
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
