<template>
  <div
    v-if="props.id !== messengerStore.userStore.id"
    class="flex items-center p-3 cursor-pointer hover:bg-gray-100 max-sm:flex-col max-sm:p-2 max-sm:max-w-15 max-sm:mx-1 max-sm:text-center"
    @click="newConvo()"
  >
    <div class="relative">
      <img
        class="w-10 h-10 rounded-full max-sm:max-w-10 max-sm:max-h-10"
        src="/favicon.ico"
        alt="profile image"
      />
      <span
        v-if="props.id == UsersActive.activeUsers"
        class="top-0 start-7 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
      ></span>
    </div>
    <div
      class="pl-3 text-lg font-medium break-words max-sm:text-sm max-sm:max-w-15 max-sm:max-h-13 max-sm:p-0 max-sm:w-14"
    >
      <p class="capitalize">{{ props.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { useMessengerStore } from "@/store/useMessengerStore";
const props = defineProps(["id", "name"]);
// import { useUser } from '@/store/useMessengerStoregerStore';
import { useConversation } from "@/store/conversation";
import { io } from "socket.io-client";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
const messengerStore = useMessengerStore();
const socket = ref();
const UsersActive = reactive({
  activeUsers: [],
});
// const { id } = useUser();
const { newConversation, getConversation, fetchConversation } = useConversation();
const convo = getConversation.value;

const newConvo = async () => {
  await fetchConversation();
  // console.log('====================================');
  // console.log(getConversation.value);
  // console.log('====================================');
  try {
    await newConversation(
      getConversation.value._id,
      messengerStore.userStore.id,
      props.id
    );
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await messengerStore.fetchUser();
  await fetchConversation();
  socket.value = io("ws://localhost:8900");
  socket.value.on("getUsers", (users) => {
    try {
      const activeUser = users.find((user) => user.userId === props.id);
      if (activeUser) {
        UsersActive.activeUsers = activeUser.userId;
      }
      if (!activeUser) {
        UsersActive.activeUsers = null;
      }
    } catch (err) {}
  });
});
onUnmounted(() => {});
</script>
