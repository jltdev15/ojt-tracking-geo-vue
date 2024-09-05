<template>
    <div class="bg-[url('/dhvsu.jpg')]">
        <!-- component -->
        <div class="flex items-center justify-center w-full min-h-screen dark:bg-gray-50">
            <img src="/dhvsu.jpg" alt="Background Image" class="absolute object-cover object-center w-full h-full" />
            <div
                class="md:w-1/5 max-w-xl z-[9999] px-8 py-6 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/10">
                <div class="p-6">
                    <img class="w-24 h-24 mx-auto" src="/logo.png" alt="" />
                </div>
                <form @submit.prevent="submitPasswordHandler" class="px-6 py-9">
                    <div>
                        <h1 class="pb-3 text-3xl font-bold text-center text-gray-50">
                            Password Reset
                        </h1>
                    </div>
                    <div>
                        <label class="flex items-center gap-2 input input-bordered">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="w-4 h-4 opacity-70">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input v-model.trim="password" type="password" class="grow" value=""
                                placeholder="New Password" />
                        </label>
                    </div>
                    <div>
                        <label class="flex items-center gap-2 input input-bordered">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                class="w-4 h-4 opacity-70">
                                <path fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input v-model.trim="confirmPassowrd" type="password" class="grow" value=""
                                placeholder="Confirm New Password" />
                        </label>
                    </div>
                    <div class="flex justify-end py-3">
                        <button class="text-lg btn-primary btn btn-block">Set Password</button>
                    </div>
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useToast } from "vue-toastification";
const toast = useToast();
const auth = useAuthStore();
const password = ref("");
const confirmPassowrd = ref("");

const route = useRoute();
console.log(route);
console.log(route.query.token);
console.log(route.query.id);

const submitPasswordHandler = async () => {
    if (password.value !== confirmPassowrd.value) {
        return toast.error("Password doesnt match", {
            timeout: 1500,
        });
    }
    await auth.sumbitSetPassword({
        userId: route.query.id,
        token: route.query.token,
        password: password.value,
    });
};
</script>
<style scoped>
div {
    padding: 0.4rem 0;
}
</style>
