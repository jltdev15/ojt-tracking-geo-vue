<template>
  <div v-for="(item, index) in props.appInfoArr" :key="index">
    <div class="card card-compact">
      <p>{{ item.jobTitle }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  appInfoArr: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped></style>
