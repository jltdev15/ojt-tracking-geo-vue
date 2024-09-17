<template>
  <div
    v-if="props.id !== messengerStore.userStore.id"
    class="flex flex-col items-center gap-1 p-3 cursor-pointer md:gap-3 hover:bg-gray-100 md:flex-row"
    @click="newConvo()"
  >
    <div class="relative">
      <img
        class="w-12 h-10 rounded-full max-sm:max-w-10 max-sm:max-h-10"
        src="/favicon.ico"
        alt="profile image"
      />

    </div>
    <div class="flex flex-col justify-start w-24 text-lg font-medium md:w-full">
      <p class="capitalize md:text-lg text-[0.7rem] leading-3 text-left">
        {{ props.name }}
      </p>
      <div class="flex items-center gap-1 md:gap-2 md:justify-start">
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
