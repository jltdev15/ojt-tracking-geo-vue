<template>
  <div
    v-if="props.id !== messengerStore.userStore.id"
    class="flex items-center my-3 md:my-0 shadow gap-3 p-3 cursor-pointer md:gap-3 transition-all rounded-md hover:bg-gray-100"
    @click="newConvo()"
  >
    <div class="relative">
      <img
        class="w-16 h-16 md:h-12 md:w-14 rounded-full"
        src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
        alt="profile image"
      />
    </div>
    <div class="flex flex-col justify-start text-lg font-medium md:w-full">
      <p class="capitalize md:text-lg text-left">
        {{ props.name }}
      </p>
      <div
        class="flex text-gray-400 font-medium text-sm items-center gap-3 md:gap-2 md:justify-start"
      >
        <p v-if="props.department" class="">
          {{ props.department ? props.department : "" }}
        </p>
        <span class="">{{ props.role ? props.role : "" }}</span>
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
});
onUnmounted(() => {});
</script>
