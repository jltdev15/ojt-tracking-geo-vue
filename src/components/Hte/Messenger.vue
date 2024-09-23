<template>
  <div class="flex md:h-[100dvh] max-sm:flex-col max-sm:h-auto max-sm:relative">
    <div :class="{ 'hidden md:block': setConversation === null }"
      class="w-full md:h-[100dvh] pt-3 max-sm:w-full max-sm:p-0 max-sm:order-3">
      <conversation v-for="item in messengerStore.userStore.allUser"
        :name="item.profile?.firstName || item.profile.fullName" :id="item._id" :key="item._id"
        @back="setConversation = null" />
      <div ref="scrollView"
        class="p-6 overflow-y-scroll h-4/6 scroll-smooth max-sm:h-full max-sm:overflow-y-auto max-sm:fixed max-sm:w-full max-sm:pb-80">
        <div v-if="setConversation === null">
          <h1 class="text-4xl text-center md:pt-20">Start a conversation</h1>
        </div>
        <div v-if="setConversation !== null">
          <message v-for="item in messages" :text="item.text" :time="item.createdAt" :sender="item.sender"
            :key="item._id" />
        </div>
      </div>
      <div v-if="setConversation !== null"
        class="flex items-center justify-between p-6 max-sm:w-full max-sm:bg-gray-100 max-sm:px-2 max-sm:py-1 max-sm:fixed max-sm:bottom-0">
        <textarea v-model="inputMessage.text" required class="w-full h-20 p-3 mr-2 border-2 rounded-xl border-gray"
          name="" id="" placeholder="Send a message ..."></textarea>
        <button @click="addNewMessage"
          class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Send
        </button>
      </div>
    </div>
    <div :class="{ 'hidden md:flex ': setConversation != null }"
      class="flex-col w-1/4 gap-3 bg-white md:pt-3 md:p-6 max-sm:w-full max-sm:overflow-y-auto max-sm:pt-0 max-sm:bg-gray-50 max-sm:order-1">
      <h2 class="p-2 text-3xl font-bold text-center text-gray-800">Contacts</h2>
      <allUsers v-for="item in messengerStore.userStore.allUser" :id="item._id"
        :name="item.profile?.firstName || item.profile.fullName" :key="item._id" :department="item.profile.department"
        :role="item.role"></allUsers>
    </div>
  </div>
</template>

<script setup>
import { useMessengerStore } from "@/store/useMessengerStore";
import conversation from "@/components/conversation/conversation.vue";
import message from "@/components/message/message.vue";
import allUsers from "@/components/AllUser/allUser.vue";
import { useConversation } from "@/store/conversation";
import { useMessage } from "@/store/message";
import { ref, reactive, onMounted, watch, onUnmounted } from "vue";

// import { useUser } from '@/store/useMessengerStoregerStore';
import { io } from "socket.io-client";
const messengerStore = useMessengerStore();
// const { id, allUser } = useUser();
const { setConversation, getFreindId, ReceiverConversationId } = useConversation();
const { messages, newMessage, fetchMessage } = useMessage();

const scrollView = ref();
const socket = ref();

// const userId = ref("");
const arrivalMessage = reactive({});
let intervalid = null;
onMounted(async () => {
  await messengerStore.fetchUser();
  await messengerStore.fetchAllUser();

  if (intervalid) {
    clearInterval(intervalid);
  }
  intervalid = setInterval(() => {
    fetchMessage();
    messengerStore.fetchAllUser();
    // scrollToBottom();
  }, 2000);
});

onUnmounted(() => {
  if (intervalid) {
    clearInterval(intervalid);
  }
});

const scrollToBottom = () => {
  const container = scrollView.value;
  container.scrollTop = container.scrollHeight;
};

const inputMessage = reactive({
  ReceiverConversationId,
  SenderConversationId: setConversation,
  sender: messengerStore.userId,
  receiverId: getFreindId,
  text: "",
});

const addNewMessage = async () => {
  inputMessage.sender = messengerStore.userId;

  try {
    if (inputMessage.text === "") {
      return alert("Input is blank");
    }

    // socket.value.emit("sendMessage", {
    //   senderId: messengerStore.userId,
    //   receiverId: getFreindId.value,
    //   text: inputMessage.text,
    // });

    await newMessage(
      inputMessage.SenderConversationId,
      inputMessage.ReceiverConversationId,
      inputMessage.sender,
      inputMessage.receiverId,
      inputMessage.text
    );
    // inputMessage.text = "";
    await fetchMessage();
    scrollToBottom();
  } catch (err) {
    console.log(err);
  }
};

watch(arrivalMessage, async () => {
  scrollToBottom();
  setTimeout(async () => {
    fetchMessage();
  }, 500);

  setTimeout(async () => {
    scrollToBottom();
  }, 800);
});
watch(setConversation, async () => {
  await fetchMessage();
  scrollToBottom();
});
</script>
