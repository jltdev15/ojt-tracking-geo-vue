<template>
    <li  class="p-3 rounded-md cursor-pointer bg-slate-50 hover:bg-slate-100">
        <header class="flex justify-between font-medium">
            <p class="capitalize" :class="{'bg-red-800 inline-block px-3 py-1 text-gray-50 rounded': props.role == 'Admin', 'bg-green-800 inline-block px-3 py-1 text-gray-50 rounded': props.role == 'Coordinator'}">{{props.role}}</p>
            <p>{{convertedDate}}</p>
        </header>
        <div class="py-3 font-bold capitalize">
            <p>{{props.title}}</p>
        </div>
  
        <p class="pb-3 leading-4">{{props.description}}</p>
    </li>
</template>

<script  setup>
import moment from 'moment-timezone';
import { onMounted,ref } from 'vue';
const props = defineProps(['title','description','date','author','role'])
const convertedDate = ref(null)
onMounted(async () =>{
    convertedDate.value = moment(props.date).tz('Asia/Manila').format('YYYY-MM-DD');
})

</script>

<style>

</style>