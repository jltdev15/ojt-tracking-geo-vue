<template>
  <div class="w-5/12 mx-auto rounded-md shadow-md mt-9 lg:w-3/12 bg-gray-50">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'admin_change_password' }"
            >Account Settings</router-link
          >
        </li>
      </ul>
      <section class="w-full">
        <header class="flex items-center justify-between py-3">
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
    const response = await apiClient.patch("/intern/password/change", {
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
