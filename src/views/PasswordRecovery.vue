<template>
    <!-- component -->
    <div class="flex items-center justify-center w-full min-h-screen dark:bg-gray-50">
        <img src="/dhvsu.jpg" alt="Background Image" class="absolute object-cover object-center w-full h-full" />
        <div class="md:w-1/5 max-w-xl z-[9999] px-8 py-6 bg-white rounded-lg shadow-md backdrop-blur bg-white/10">
            <div class="p-6">
                <img class="w-24 h-24 mx-auto" src="/logo.png" alt="" />
            </div>
            <form @submit.prevent="submitRequest" class="px-6 py-9">
                <div class="">
                    <h1 class="pb-3 text-3xl font-bold text-center text-gray-50">
                        Password Recovery
                    </h1>
                </div>
                <div>
                    <label class="flex items-center gap-2 input input-bordered">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input @focus="auth.removeErrorMessage" v-model.trim="email" type="email" class="grow" value=""
                            placeholder="Enter your email address" required />
                    </label>
                    <div v-if="auth.isEmailExist">
                        <p class="text-red-600">{{ auth.errorMessage }}</p>
                    </div>
                </div>
                <div class="flex justify-end py-3">
                    <button class="text-lg btn-primary btn btn-block">Send Reset Email</button>
                </div>
                <div class="text-center capitalize text-gray-50">
                    <router-link class="inline-block w-full py-3" to="/">
                        <span>&larr;</span> Home page</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useToast } from "vue-toastification";

const toast = useToast();
const email = ref("");
const route = useRoute();
const auth = useAuthStore();

const submitRequest = async () => {
    try {
        await auth.submitPasswordRequest({ email: email.value });
    } catch (err) {
        console.log(err);
    }
};
onMounted(async () => {
    auth.isEmailExist = false;
});
</script>

<style scoped>
div {
    padding: 0.4rem 0;
}
</style>
