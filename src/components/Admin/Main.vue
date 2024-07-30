<template>
    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main"
        :class="{ active: props.isSidebarHidden }">
        <!-- navbar -->
        <div class="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <button type="button" class="text-lg font-semibold text-gray-900 sidebar-toggle">
                <i class="ri-menu-line" @click="handleToggleSidebar"></i>
            </button>

            <ul class="flex items-center ml-auto">
                <li class="mr-1 dropdown">
                    <button type="button"
                        class="flex items-center justify-center w-8 h-8 mr-4 text-gray-400 rounded dropdown-toggle hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24">
                            <path
                                d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z">
                            </path>
                        </svg>
                    </button>
                    <div
                        class="z-30 hidden w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-md dropdown-menu shadow-black/5">
                        <form action="" class="p-4 border-b border-b-gray-100">
                            <div class="relative w-full">
                                <input type="text"
                                    class="w-full py-2 pl-10 pr-4 text-sm border border-gray-100 rounded-md outline-none bg-gray-50 focus:border-blue-500"
                                    placeholder="Search..." />
                                <i class="absolute text-gray-900 -translate-y-1/2 ri-search-line top-1/2 left-4"></i>
                            </div>
                        </form>
                    </div>
                </li>
                <li class="dropdown">
                    <button type="button"
                        class="flex items-center justify-center w-8 h-8 mr-4 text-gray-400 rounded dropdown-toggle hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24">
                            <path
                                d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z">
                            </path>
                        </svg>
                    </button>
                    <div
                        class="z-30 hidden w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-md dropdown-menu shadow-black/5">
                        <div class="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                            <button type="button" data-tab="notification" data-tab-page="notifications"
                                class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">
                                Notifications
                            </button>
                            <button type="button" data-tab="notification" data-tab-page="messages"
                                class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">
                                Messages
                            </button>
                        </div>
                        <div class="my-2">
                            <ul class="overflow-y-auto max-h-64" data-tab-for="notification" data-page="notifications">
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                New order
                                            </div>
                                            <div class="text-[11px] text-gray-400">from a user</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                New order
                                            </div>
                                            <div class="text-[11px] text-gray-400">from a user</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                New order
                                            </div>
                                            <div class="text-[11px] text-gray-400">from a user</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                New order
                                            </div>
                                            <div class="text-[11px] text-gray-400">from a user</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                New order
                                            </div>
                                            <div class="text-[11px] text-gray-400">from a user</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <ul class="hidden overflow-y-auto max-h-64" data-tab-for="notification"
                                data-page="messages">
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                John Doe
                                            </div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                John Doe
                                            </div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                John Doe
                                            </div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                John Doe
                                            </div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                        <img src="https://placehold.co/32x32" alt=""
                                            class="block object-cover w-8 h-8 align-middle rounded" />
                                        <div class="ml-2">
                                            <div
                                                class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                John Doe
                                            </div>
                                            <div class="text-[11px] text-gray-400">Hello there!</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <button id="fullscreen-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24">
                        <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path>
                    </svg>
                </button>

                <li class="ml-3 dropdown">
                    <button type="button" class="flex items-center dropdown-toggle">
                        <div class="relative flex-shrink-0 w-10 h-10">
                            <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img class="w-8 h-8 rounded-full"
                                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                    alt="" />
                                <div
                                    class="absolute top-0 w-3 h-3 border-2 border-white rounded-full left-7 bg-lime-400 animate-ping">
                                </div>
                                <div
                                    class="absolute top-0 w-3 h-3 border-2 border-white rounded-full left-7 bg-lime-500">
                                </div>
                            </div>
                        </div>
                        <div class="p-2 text-left md:block">
                            <h2 class="text-sm font-semibold text-gray-800">John Doe</h2>
                            <p class="text-xs text-gray-500">Administrator</p>
                        </div>
                    </button>
                    <ul
                        class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                        <li>
                            <a href="#"
                                class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Settings</a>
                        </li>
                        <li>
                            <form method="POST" action="">
                                <a role="menuitem"
                                    class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                    onclick="event.preventDefault();
                                    this.closest('form').submit();">
                                    Log Out
                                </a>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <router-view />
    </main>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["isSidebarHidden"]);
const emit = defineEmits(["toggleSidebar"]);

const handleToggleSidebar = () => {
    emit("toggleSidebar");
};
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
