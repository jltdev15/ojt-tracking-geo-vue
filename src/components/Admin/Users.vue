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
        class="w-full input input-bordered"
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
      table-class-name="customize-table"
    >
      <template #item-operation="item">
        <div class="flex justify-between gap-3 py-2">
          <button
            @click="adminAuthStore.showUpdateModal(item)"
            class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50"
          >
            Update <i class="fa-solid fa-pen-to-square"></i>
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
            v-if="selectedRole === 'Select User Role'"
            class="pb-3 font-medium text-center text-gray-600"
          >
            Please select role to proceed
          </p>
          <select
            @change="handleSelectChange"
            v-model.trim="selectedRole"
            class="w-full py-3 select select-bordered"
          >
            <option selected disabled value="Select User Role">Select User Role</option>
            <option value="Admin">Admin</option>
            <option value="Coordinator">Coordinator</option>
            <option value="HTE">HTE</option>
            <option value="Intern">Intern</option>
          </select>
          <div v-if="selectedRole === 'Intern'" class="flex flex-col gap-3 pt-3">
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
                v-model.trim="intern.username"
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
                v-model.trim="intern.password"
                :type="passwordFieldType"
              />
            </label>
            <div class="flex justify-end">
              <div class="flex flex-row-reverse gap-3">
                <button
                  class="ml-auto text-right btn btn-primary"
                  @click="handleGeneratePassword"
                >
                  Generate password
                </button>
                <button
                  class="ml-auto text-right btn btn-outline"
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
                v-model="intern.email"
                type="text"
                class="grow"
                placeholder="Email"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="intern.fullName"
                type="text"
                class="grow"
                placeholder="Full Name"
              />
            </label>
            <select
              @change="handleSelectDepartment"
              v-model="intern.department"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled>Select department</option>

              <option
                v-for="item in userStore.departmentlist"
                :key="item._id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="flex flex-col gap-2">
              <button @click="handleInternUser" class="text-lg btn btn-primary btn-block">
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
          <div v-if="selectedRole === 'HTE'" class="flex flex-col gap-3 pt-3">
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
                v-model.trim="hte.username"
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
                v-model.trim="hte.password"
                :type="passwordFieldType"
              />
            </label>
            <div class="flex justify-end">
              <div class="flex flex-row-reverse gap-3">
                <button
                  class="ml-auto text-right btn btn-primary"
                  @click="handleGeneratePassword"
                >
                  Generate password
                </button>
                <button
                  class="ml-auto text-right btn btn-outline"
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
              <input v-model="hte.email" type="text" class="grow" placeholder="Email" />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="hte.name"
                type="text"
                class="grow"
                placeholder="Company name"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="hte.contactNumber"
                type="text"
                class="grow"
                placeholder="Contact number"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="hte.address"
                type="text"
                class="grow"
                placeholder="Company Address"
              />
            </label>
            <label for="" class="font-medium text-center"
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
            </div>

            <div class="flex flex-col gap-2">
              <button @click="handleHteUser" class="text-lg btn btn-primary btn-block">
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
          <div v-if="selectedRole === 'Coordinator'" class="flex flex-col gap-3 pt-3">
            <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
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
                v-model.trim="coordinator.username"
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
                v-model.trim="coordinator.password"
                :type="passwordFieldType"
              />
            </label>
            <div class="flex justify-end">
              <div class="flex flex-row-reverse gap-3">
                <button
                  class="ml-auto text-right btn btn-primary"
                  @click="handleGeneratePassword"
                >
                  Generate password
                </button>
                <button
                  class="ml-auto text-right btn btn-outline"
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
                v-model="coordinator.email"
                type="text"
                class="grow"
                placeholder="Email"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="coordinator.fullName"
                type="text"
                class="grow"
                placeholder="Coordinator Full Name"
              />
            </label>
            <label class="flex items-center gap-2 input input-bordered">
              <input
                v-model="coordinator.contactNumber"
                type="text"
                class="grow"
                placeholder="Contact number"
              />
            </label>

            <select
              @change="handleSelectDepartment"
              v-model="coordinator.department"
              class="w-full py-3 select select-bordered"
            >
              <option value="" disabled>Select Department</option>
              <option
                v-for="item in userStore.departmentlist"
                :key="item._id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>

            <div class="flex flex-col gap-2">
              <button @click="handleCoorUser" class="text-lg btn btn-primary btn-block">
                Create Account
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
import { useAdminUserStore } from "@/stores/AdminUserStore";
const userStore = useAdminUserStore();
import { ref, onMounted, reactive } from "vue";

const searchField = ref("Set filter");
const searchValue = ref("");
const isModalShow = ref(false);
const selectedRole = ref("Select User Role");
const passwordFieldType = ref("password");
const showPassword = ref(false);

const intern = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  fullName: "",
  department: "Select Department",
});
const hte = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  name: "",
  contactNumber: "",
  address: "",
  hasMoa: "",
});
const coordinator = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  fullName: "",
  contactNumber: "",
  department: "Select Department",
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
  console.log(hte.role);
};
const resetForms = () => {
  (intern.username = ""),
    (intern.password = ""),
    (intern.role = "Select Role"),
    (intern.email = ""),
    (intern.fullName = ""),
    (intern.department = "Select Department");
};

onMounted(async () => {
  await userStore.fetchUsers();
  await userStore.fetchDepartmentList();
});

const handleInternUser = async () => {
  await userStore.addIntern(intern);
  (intern.username = ""), resetForms();
  await handleToggleModal();
};
const handleHteUser = async () => {
  try {
    await userStore.addHTE(hte);
    await handleToggleModal();
  } catch (err) {
    console.log(err);
  }
};
const handleCoorUser = async () => {
  try {
    await userStore.addCoordinator(coordinator);
    await handleToggleModal();
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
  { text: "USERNAME", value: "username", width: 80 },

  { text: "ROLE", value: "role" },
  { text: "STATUS", value: "status" },
  { text: "DATE CREATED", value: "createdAt" },
  { text: "ACTIONS", value: "operation", width: 10 },
];
</script>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 16px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #2b2828;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}
</style>
