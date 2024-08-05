<template>
  <div>
    <!-- component -->
    <div class="flex items-center justify-center w-full min-h-screen dark:bg-gray-950">
      <div class="max-w-md px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h1 class="mb-4 text-2xl font-bold text-center dark:text-gray-200">Intern</h1>
        <form @submit.prevent="handleLogin" action="#">
          <div class="mb-4">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Registered Email Address</label
            >
            <input
              v-model.trim="username"
              type="text"
              id="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Password</label
            >
            <input
              v-model.trim="password"
              type="password"
              id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
            <a
              href="#"
              class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Forgot Password?</a
            >
          </div>

          <button
            type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div class="text-center capitalize text-gray-50">
            <router-link class="inline-block w-full py-3" to="/">
              <span>&larr;</span> home page</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const handleLogin = async () => {
  const loginData = {
    username: username.value,
    password: password.value,
  };
  await authStore.internLogin(loginData);
  router.push("/student/dashboard");
};
</script>

<style lang="scss" scoped></style>
