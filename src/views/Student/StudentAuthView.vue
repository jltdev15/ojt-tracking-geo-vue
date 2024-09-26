<template>
  <div class="bg-[url('/dhvsu.jpg')]">
    <!-- component -->
    <div class="flex items-center justify-center w-full min-h-screen dark:bg-gray-50">
      <img src="/dhvsu.jpg" alt="Background Image" class="absolute object-cover object-center w-full h-full" />
      <div
        class="md:w-2/5 max-w-xl xl:w-2/6 2xl:w-1/6 z-[9999] px-8 py-6 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/10">
        <div class="p-6">
          <img class="w-24 h-24 mx-auto" src="/logo.png" alt="" />
        </div>
        <form @submit.prevent="handleLogin" action="#">
          <div class="mb-4">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50">Registered
              Username</label>
            <input v-model.trim="username" type="text" id="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com" required />
          </div>
          <div class="mb-4">
            <label for="password"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-50">Password</label>
            <input v-model.trim="password" type="password" id="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password" required />
            <router-link :to="{ name: 'recovery' }"
              class="text-xs text-gray-50 md:text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forget
              Password</router-link>
          </div>

          <button type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#da1f26] border border-transparent rounded-md shadow-sm hover:bg-[#da1f25d8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
          <div class="text-center capitalize text-gray-50">
            <router-link class="inline-block w-full py-3" to="/">
              <span>&larr;</span> home page</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");

const sessionCode = ref(localStorage.getItem("sessionCode"));

const handleLogin = async () => {
  const loginData = {
    username: username.value,
    password: password.value,
    sessionCode: sessionCode.value,
  };
  await authStore.internLogin(loginData);
};
</script>

<style lang="scss" scoped></style>
