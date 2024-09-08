<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.customize-table {

  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;
}
</style>
