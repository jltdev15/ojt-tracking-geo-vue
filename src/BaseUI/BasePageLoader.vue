<template>
    <transition name="fade">
    <div v-if="authStore.isLoading" class="full-page-loader">
        <span class="loading loading-spinner loading-lg bg-gray-50"></span>
    </div>
</transition>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/AuthStore';
  const authStore = useAuthStore()
  import { ref } from 'vue';
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .full-page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* semi-transparent background */
    z-index: 9999; /* Ensure it's above other content */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loader {
    border: 12px solid #f3f3f3;
    border-radius: 50%;
    border-top: 12px solid #f84525;
    width: 50px;
    height: 50px;
    animation: spin 1.5s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  