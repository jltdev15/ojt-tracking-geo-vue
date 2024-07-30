<template>
    <div class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
        :class="{ '-translate-x-full': props.isSidebarHidden }">
        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
        </a>
        <ul class="mt-4">
            <span class="font-bold text-gray-400">ADMIN</span>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="mr-3 text-lg ri-home-2-line"></i>
                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="mr-3 text-lg bx bx-user"></i>
                    <span class="text-sm">Users</span>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-45"></i>
                </a>
                <ul class="pl-7 mt-2 hidden group-[.selected]:block">
                    <li class="mb-4">
                        <a href=""
                            class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</a>
                    </li>
                    <li class="mb-4">
                        <a href=""
                            class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Roles</a>
                    </li>
                </ul>
            </li>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="mr-3 text-lg bx bx-list-ul"></i>
                    <span class="text-sm">Activities</span>
                </a>
            </li>
            <span class="font-bold text-gray-400">BLOG</span>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="mr-3 text-lg bx bxl-blogger"></i>
                    <span class="text-sm">Post</span>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </a>
                <ul class="pl-7 mt-2 hidden group-[.selected]:block">
                    <li class="mb-4">
                        <a href=""
                            class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</a>
                    </li>
                    <li class="mb-4">
                        <a href=""
                            class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Categories</a>
                    </li>
                </ul>
            </li>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="mr-3 text-lg bx bx-archive"></i>
                    <span class="text-sm">Archive</span>
                </a>
            </li>
            <span class="font-bold text-gray-400">SETTINGS</span>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="mr-3 text-lg bx bx-bell"></i>
                    <span class="text-sm">Notifications</span>
                    <span
                        class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
                </a>
            </li>
            <li class="mb-1 group">
                <a href=""
                    class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="mr-3 text-lg bx bx-envelope"></i>
                    <span class="text-sm">Messages</span>
                    <span
                        class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                        New</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(["isSidebarHidden"]);
</script>

<style>
/* Add your styles here */
.hidden {
    display: none;
}

@media (min-width: 768px) {
    .main.active {
        margin-left: 0px;
        width: 100%;
    }
}

.translate-x-full {
    transform: translateX(-100%);
}
</style>
