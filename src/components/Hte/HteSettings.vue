<template>
    <div>
      <div class="p-6 text-sm breadcrumbs">
        <ul>
          <li>
            <router-link :to="{ name: 'hte_dashboard' }">Hte Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'hte_settings' }">Settings</router-link>
          </li>
        </ul>
        <section>
          <header class="flex items-center justify-between py-3 bg-gray-200">
            <h1 class="text-3xl">
              Change <span class="text-3xl font-bold">Password</span>
            </h1>
          </header>
          <form @submit.prevent="changePasswordHandler" action="">
            <div class="flex flex-col max-w-md gap-4">
              <label class="flex items-center gap-2 input input-bordered">
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
                  v-model.trim="passwordData.oldPassword"
                  type="password"
                  class="grow"
                  value=""
                  placeholder="Old Password"
                  required
                />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
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
                  v-model.trim="passwordData.newPassword"
                  type="password"
                  class="grow"
                  value=""
                  placeholder="New Password"
                  required
                />
              </label>
              <label class="flex items-center gap-2 input input-bordered">
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
                  v-model.trim="passwordData.confirmPassword"
                  type="password"
                  class="grow"
                  value=""
                  placeholder="Confirm Password"
                  required
                />
              </label>
              <button type="submit" class="btn btn-primary">Change Password</button>
            </div>
          </form>
        </section>
        <div class="w-3/6 p-3 shadow-md">
          <p class="py-3 font-medium capitalize">Reset Device Restrictions</p>
          <span></span>
          <div class="flex justify-end gap-3 py-3">
            <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
            <select class="w-48 select select-bordered" v-model.trim="searchField">
              <option selected disabled value="Set filter">Set filter</option>
              <option value="Username">Username</option>
            </select>
          </div>
          <div class="py-3">
            <EasyDataTable :headers="headers" :items="adminUserStore.getInternAccounts" :search-field="searchField"
              :search-value="searchValue">
              <template #item-department="item">
                <p>{{ item.profile.department }}</p>
              </template>
              <template #item-operation="item">
                <div>
                  <button @click="toggleConfirmationModal(item.profile._id)" class="btn btn-sm btn-accent"> Reset
                    Account</button>
                </div>
              </template>
            </EasyDataTable>
          </div>
          <Modal title="Confirmation" :show="confirmModalShow">
            <template #default>
              <p class="text-xl font-medium capitalize"> Reset account restriction?</p>
              <div class="flex justify-end gap-3 pt-9">
                <button @click="confirmModalShow = !confirmModalShow" class="btn btn-accent btn-outline">Cancel</button>
                <button type="button" @click="resetDeviceHandler" class="btn-primary btn text-gray-50">
                  Proceed
                </button>
              </div>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import apiClient from "@/config/axiosClient";
  const passwordData = reactive({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const changePasswordHandler = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("Confirm password doesnt match");
    }
    try {
      const response = await apiClient.patch("/hte/password/change", {
        oldpass: passwordData.oldPassword,
        newpass: passwordData.newPassword,
      });
      console.log(response);
      alert("Password successfully changed!");
    } catch (err) {
      console.log(err);
      alert(err.response.data.content);
    }
  };
  </script>
  
  <style lang="scss" scoped></style>
  