<template>
  <div
    v-if="props.id === getFreindId"
    class="flex items-center gap-3 bg-white p-3 max-sm:pl-4 max-sm:py-2"
  >
    <div @click="backHandler" class="md:hidden">
      <i class="bx text-3xl bx-left-arrow-alt"></i>
    </div>
    <img
      class="w-9 h-9 object-fill mr-2 rounded-full"
      src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
      alt=""
    />
    <span class="font-medium text-xl capitalize">{{ props.name }}</span>
  </div>
</template>

<script setup>
const emit = defineEmits(["back"]);
const props = defineProps(["name", "id", "role"]);
import { useConversation } from "@/store/conversation";
const { getFreindId } = useConversation();

const backHandler = () => {
  emit("back");
};
</script>
