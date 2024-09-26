<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
.customize-table {
  --easy-table-border: 1px rounded #445269;
  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 60px;
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
  --easy-table-body-row-font-size: 16px;

  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 16px;
}

@media only screen and (max-width: 390px) {
  .customize-table {
    --easy-table-body-item-padding: 0px 10px;
    --easy-table-body-row-font-size: 12px;
  }
}
</style>
