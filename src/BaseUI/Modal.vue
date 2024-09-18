<template>
  <teleport to="body">
    <div v-if="show" @click="closeHandler" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" class="w-5/6 md:w-2/6">
        <header class="bg-primary">
          <slot name="header">
            <h2 class="py-3 font-bold text-center md:text-2xl">{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>

      </dialog>
    </transition>
  </teleport>
</template>
<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function closeHandler() {
  emit("close");
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  color: white;
  width: 100%;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 0rem;
  display: flex;
  justify-content: flex-center;
  margin: 0;
  gap: 0.6rem;
}
</style>
