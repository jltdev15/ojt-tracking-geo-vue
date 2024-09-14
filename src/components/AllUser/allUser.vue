<template>
  <div
    v-if="props.id !== messengerStore.userStore.id"
    class="items-center gap-1 md:gap-3 cursor-pointer hover:bg-gray-100 pt-3 px-3 flex md:flex-row flex-col"
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
    <div class="w-24 md:w-full text-lg font-medium">
      <p class="capitalize md:text-lg text-[0.7rem] leading-3 text-center">
        {{ props.name }}
      </p>
      <div class="flex gap-1 md:gap-2 justify-center items-center">
        <p v-if="props.department" class="text-[0.6rem] md:text-xs">
          {{ props.department ? props.department : "" }}
        </p>
        <span class="text-[0.6rem] md:text-xs">{{ props.role ? props.role : "" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessengerStore } from "@/store/useMessengerStore";
const props = defineProps(["id", "name", "department", "role"]);
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
