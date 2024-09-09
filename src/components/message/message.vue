<template>
  <div
    class="flex flex-col p-3"
    :class="{ 'items-end': props.sender == messengerStore.userStore.id }"
  >
    <div class="flex">
      <img
        :class="{ hidden: props.sender == messengerStore.userStore.id }"
        class="object-cover w-8 h-8 mr-3 rounded-full"
        src="/favicon.ico"
        alt=""
      />
      <p
        class="p-3 break-words bg-blue-500 rounded-3xl max-w-80 max-sm:text-sm"
        :class="{
          'bg-gray-500 text-gray-50': props.sender === messengerStore.userStore.id,
          'text-white bg-blue-500': props.sender !== messengerStore.userStore.id,
        }"
      >
        {{ props.text }}
      </p>
    </div>
    <div class="pt-2 text-sm max-sm:text-xs">{{ format(props.time) }}</div>
  </div>
</template>

<script setup>
import { useMessengerStore } from "../../store/useMessengerStore";
import { format } from "timeago.js";
// import { useUser } from '@/store/useMessengerStore';
const messengerStore = useMessengerStore();

// const { id } = useUser();
const props = defineProps(["text", "time", "sender"]);
</script>
