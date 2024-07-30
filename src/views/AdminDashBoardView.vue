<template>
    <div>
        <div class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
            :class="{ '-translate-x-full': isSidebarHidden }">
            <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">

                <h2 class="text-2xl font-bold text-gray-600">OJT Tracker
                </h2>
            </a>
            <ul class="mt-4">
                <span class="font-bold text-gray-400">ADMIN</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class="mr-3 text-lg ri-home-2-line"></i>
                        <span class="text-sm ">Dashboard</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='mr-3 text-lg bx bx-user'></i>
                        <span class="text-sm">Users</span>
                        <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
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
                        <i class='mr-3 text-lg bx bx-list-ul'></i>
                        <span class="text-sm">Activities</span>
                    </a>
                </li>
                <span class="font-bold text-gray-400">BLOG</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                        <i class='mr-3 text-lg bx bxl-blogger'></i>
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
                        <i class='mr-3 text-lg bx bx-archive'></i>
                        <span class="text-sm">Archive</span>
                    </a>
                </li>
                <span class="font-bold text-gray-400">PERSONAL</span>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='mr-3 text-lg bx bx-bell'></i>
                        <span class="text-sm">Notifications</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
                    </a>
                </li>
                <li class="mb-1 group">
                    <a href=""
                        class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                        <i class='mr-3 text-lg bx bx-envelope'></i>
                        <span class="text-sm">Messages</span>
                        <span
                            class=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2
                            New</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="fixed top-0 left-0 z-40 w-full h-full bg-black/50 md:hidden sidebar-overlay"
            :class="{ hidden: isSidebarHidden }"></div>
        <!-- end sidenav -->

        <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main"
            :class="{ active: isSidebarHidden }">
            <!-- navbar -->
            <div class="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                <button type="button" class="text-lg font-semibold text-gray-900 sidebar-toggle">
                    <i class="ri-menu-line" @click="toggleSidebar"></i>
                </button>

                <ul class="flex items-center ml-auto">
                    <li class="mr-1 dropdown">
                        <button type="button"
                            class="flex items-center justify-center w-8 h-8 mr-4 text-gray-400 rounded dropdown-toggle hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24"
                                style="fill: gray;transform: ;msFilter:;">
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
                                        placeholder="Search...">
                                    <i
                                        class="absolute text-gray-900 -translate-y-1/2 ri-search-line top-1/2 left-4"></i>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li class="dropdown">
                        <button type="button"
                            class="flex items-center justify-center w-8 h-8 mr-4 text-gray-400 rounded dropdown-toggle hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24"
                                style="fill: gray;transform: ;msFilter:;">
                                <path
                                    d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z">
                                </path>
                            </svg>
                        </button>
                        <div
                            class="z-30 hidden w-full max-w-xs bg-white border border-gray-100 rounded-md shadow-md dropdown-menu shadow-black/5">
                            <div class="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                                <button type="button" data-tab="notification" data-tab-page="notifications"
                                    class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                                <button type="button" data-tab="notification" data-tab-page="messages"
                                    class="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                            </div>
                            <div class="my-2">
                                <ul class="overflow-y-auto max-h-64" data-tab-for="notification"
                                    data-page="notifications">
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order</div>
                                                <div class="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order</div>
                                                <div class="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order</div>
                                                <div class="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order</div>
                                                <div class="text-[11px] text-gray-400">from a user</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    New order</div>
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
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe</div>
                                                <div class="text-[11px] text-gray-400">Hello there!</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe</div>
                                                <div class="text-[11px] text-gray-400">Hello there!</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe</div>
                                                <div class="text-[11px] text-gray-400">Hello there!</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe</div>
                                                <div class="text-[11px] text-gray-400">Hello there!</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-50 group">
                                            <img src="https://placehold.co/32x32" alt=""
                                                class="block object-cover w-8 h-8 align-middle rounded">
                                            <div class="ml-2">
                                                <div
                                                    class="text-[13px] text-gray-600 font-medium truncate group-hover:text-blue-500">
                                                    John Doe</div>
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
                            class="rounded-full hover:bg-gray-100" viewBox="0 0 24 24"
                            style="fill: gray;transform: ;msFilter:;">
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
            <!-- end navbar -->

            <!-- Content -->
            <div class="p-6">
                <div class="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
                        <div class="flex justify-between mb-6">
                            <div>
                                <div class="flex items-center mb-1">
                                    <div class="text-2xl font-semibold">2</div>
                                </div>
                                <div class="text-sm font-medium text-gray-400">Users</div>
                            </div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <a href="/gebruikers" class="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
                    </div>
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
                        <div class="flex justify-between mb-4">
                            <div>
                                <div class="flex items-center mb-1">
                                    <div class="text-2xl font-semibold">100</div>
                                    <div
                                        class="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                                        +30%</div>
                                </div>
                                <div class="text-sm font-medium text-gray-400">Companies</div>
                            </div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a href="/dierenartsen" class="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
                    </div>
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
                        <div class="flex justify-between mb-6">
                            <div>
                                <div class="mb-1 text-2xl font-semibold">100</div>
                                <div class="text-sm font-medium text-gray-400">Blogs</div>
                            </div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a href="" class="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                    <div
                        class="relative flex flex-col w-full min-w-0 p-6 mb-4 break-words rounded shadow-lg lg:mb-0 bg-gray-50 dark:bg-gray-800">
                        <div class="px-0 mb-0 border-0 rounded-t">
                            <div class="flex flex-wrap items-center px-4 py-2">
                                <div class="relative flex-1 flex-grow w-full max-w-full">
                                    <h3 class="text-base font-semibold text-gray-900 dark:text-gray-50">Users</h3>
                                </div>
                            </div>
                            <div class="block w-full overflow-x-auto">
                                <table class="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">
                                                Role</th>
                                            <th
                                                class="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap">
                                                Amount</th>
                                            <th
                                                class="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-100 border border-l-0 border-r-0 border-gray-200 border-solid dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 whitespace-nowrap min-w-140-px">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-gray-700 dark:text-gray-100">
                                            <th
                                                class="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                Administrator</th>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                1</td>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="mr-2">70%</span>
                                                    <div class="relative w-full">
                                                        <div
                                                            class="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                                                            <div style="width: 70%"
                                                                class="flex flex-col justify-center text-center text-white bg-blue-600 shadow-none whitespace-nowrap">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="text-gray-700 dark:text-gray-100">
                                            <th
                                                class="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                User</th>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                6</td>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="mr-2">40%</span>
                                                    <div class="relative w-full">
                                                        <div
                                                            class="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                                                            <div style="width: 40%"
                                                                class="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="text-gray-700 dark:text-gray-100">
                                            <th
                                                class="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                User</th>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                5</td>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="mr-2">45%</span>
                                                    <div class="relative w-full">
                                                        <div
                                                            class="flex h-2 overflow-hidden text-xs bg-pink-200 rounded">
                                                            <div style="width: 45%"
                                                                class="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="text-gray-700 dark:text-gray-100">
                                            <th
                                                class="p-4 px-4 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                User</th>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                4</td>
                                            <td
                                                class="p-4 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="mr-2">60%</span>
                                                    <div class="relative w-full">
                                                        <div
                                                            class="flex h-2 overflow-hidden text-xs bg-red-200 rounded">
                                                            <div style="width: 60%"
                                                                class="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="font-medium">Activities</div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="overflow-hidden">
                            <table class="w-full min-w-[540px]">
                                <tbody>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Lorem
                                                    Ipsum</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-gray-400">02-02-2024</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-gray-400">17.45</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="dropdown">
                                                <button type="button"
                                                    class="flex items-center justify-center w-6 h-6 text-sm text-gray-400 rounded dropdown-toggle hover:text-gray-600 bg-gray-50"><i
                                                        class="ri-more-2-fill"></i></button>
                                                <ul
                                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Lorem
                                                    Ipsum</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-gray-400">02-02-2024</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-gray-400">17.45</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="dropdown">
                                                <button type="button"
                                                    class="flex items-center justify-center w-6 h-6 text-sm text-gray-400 rounded dropdown-toggle hover:text-gray-600 bg-gray-50"><i
                                                        class="ri-more-2-fill"></i></button>
                                                <ul
                                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5 lg:col-span-2">
                        <div class="flex items-start justify-between mb-4">
                            <div class="font-medium">Order Statistics</div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
                            <div class="p-4 border border-gray-200 border-dashed rounded-md">
                                <div class="flex items-center mb-0.5">
                                    <div class="text-xl font-semibold">10</div>
                                    <span
                                        class="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                                </div>
                                <span class="text-sm text-gray-400">Active</span>
                            </div>
                            <div class="p-4 border border-gray-200 border-dashed rounded-md">
                                <div class="flex items-center mb-0.5">
                                    <div class="text-xl font-semibold">50</div>
                                    <span
                                        class="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                                </div>
                                <span class="text-sm text-gray-400">Completed</span>
                            </div>
                            <div class="p-4 border border-gray-200 border-dashed rounded-md">
                                <div class="flex items-center mb-0.5">
                                    <div class="text-xl font-semibold">4</div>
                                    <span
                                        class="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                                </div>
                                <span class="text-sm text-gray-400">Canceled</span>
                            </div>
                        </div>
                        <div>
                            <canvas id="order-chart"></canvas>
                        </div>
                    </div>
                    <div class="p-6 bg-white border border-gray-100 rounded-md shadow-md shadow-black/5">
                        <div class="flex items-start justify-between mb-4">
                            <div class="font-medium">Earnings</div>
                            <div class="dropdown">
                                <button type="button" class="text-gray-400 dropdown-toggle hover:text-gray-600"><i
                                        class="ri-more-fill"></i></button>
                                <ul
                                    class="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full min-w-[460px]">
                                <thead>
                                    <tr>
                                        <th
                                            class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                                            Service</th>
                                        <th
                                            class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                                            Earning</th>
                                        <th
                                            class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-emerald-500">+$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <div class="flex items-center">
                                                <img src="https://placehold.co/32x32" alt=""
                                                    class="block object-cover w-8 h-8 rounded">
                                                <a href="#"
                                                    class="ml-2 text-sm font-medium text-gray-600 truncate hover:text-blue-500">Create
                                                    landing page</a>
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span class="text-[13px] font-medium text-rose-500">-$235</span>
                                        </td>
                                        <td class="px-4 py-2 border-b border-b-gray-50">
                                            <span
                                                class="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Content -->
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSidebarHidden: false
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarHidden = !this.isSidebarHidden;
        },
        hideSidebar() {
            this.isSidebarHidden = true;
        }
    }
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
