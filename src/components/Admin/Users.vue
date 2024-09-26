<template>
  <section class="p-3 py-3 mx-auto md:w-10/12 xl:w-11/12">
    <div class="py-6 text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'manage_users' }">Manage users</router-link>
        </li>
      </ul>
    </div>
    <section class="p-6 rounded-md shadow-lg bg-gray-50">
      <header
        class="flex items-center justify-between gap-3 md:flex-row md:justify-between"
      >
        <h1 class="md:text-3xl">
          User <span class="font-bold md:text-3xl">Management</span>
        </h1>
        <div>
          <button
            @click="handleToggleModal"
            class="btn btn-sm btn-primary md:btn-md md:btn-block"
          >
            <i class="ri-add-line"></i>Add New User
          </button>
        </div>
      </header>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search Username"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
      </div>
      <section class="">
        <EasyDataTable
          :headers="headers"
          :items="userStore.usersList"
          :search-field="searchField"
          :search-value="searchValue"
          :rows-per-page="5"
          :hide-rows-per-page="true"
          table-class-name="customize-table"
        >
          <template #item-operation="item">
            <div class="flex justify-between gap-3 py-2">
              <button
                @click="toggleConfirmationModal(item._id)"
                class="flex items-center justify-center w-24 gap-2 py-3 btn-accent btn btn-outline"
              >
                Remove
              </button>
              <router-link
                :to="{ name: 'UpdateUser', params: { id: item._id } }"
                class="flex items-center justify-center w-24 gap-2 py-3 btn btn-primary text-gray-50"
              >
                Update
              </router-link>
            </div>
          </template>
          <template #item-status="item">
            <p class="inline-block px-3 bg-green-600 rounded-md text-gray-50">
              {{ item.status }}
            </p>
          </template>
        </EasyDataTable>
      </section>

      <Modal
        :show="isModalShow"
        @close="isModalShow = !isModalShow"
        :size="selectedRole === 'HTE'"
        title="New Account"
      >
        <!-- <Modal :show="true" title="New Account"> -->
        <template #default>
          <div>
            <p
              v-if="selectedRole === 'Select User Role'"
              class="pb-3 font-medium text-center text-gray-600"
            >
              Please select role to proceed
            </p>
            <select
              @change="handleSelectChange"
              v-model.trim="selectedRole"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled value="Select User Role">Select User Role</option>
              <option value="Admin">Admin</option>
              <option value="Coordinator">Coordinator</option>
              <option value="HTE">HTE</option>
              <option value="Intern">Intern</option>
            </select>
            <div v-if="selectedRole === 'Intern'">
              <form
                @submit.prevent="handleInternUser"
                action=""
                class="flex flex-col gap-3 pt-3"
              >
                <label class="flex items-center gap-2 input input-bordered">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4 opacity-70"
                  >
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                    />
                  </svg>
                  <input
                    v-model.trim="intern.username"
                    type="text"
                    class="grow"
                    placeholder="Username"
                    required
                  />
                </label>
                <label
                  class="flex items-center justify-between gap-2 input input-bordered"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="grow"
                    placeholder="Secure password"
                    v-model.trim="intern.password"
                    :type="passwordFieldType"
                    required
                  />
                </label>
                <div class="flex justify-end">
                  <div class="flex flex-row-reverse gap-3">
                    <button
                      class="ml-auto text-right btn btn-primary"
                      @click="handleGeneratePassword"
                    >
                      Generate password
                    </button>
                    <button
                      class="ml-auto text-right btn btn-outline"
                      @click="toggleShowPassword"
                    >
                      {{ showPassword ? "Hide" : "Show" }}
                    </button>
                  </div>
                </div>

                <label class="flex items-center gap-2 input input-bordered">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="w-4 h-4 opacity-70"
                  >
                    <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                    />
                    <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                    />
                  </svg>
                  <input
                    v-model="intern.email"
                    type="email"
                    class="grow"
                    placeholder="Email"
                    required
                  />
                </label>
                <label class="flex items-center gap-2 input input-bordered">
                  <input
                    v-model="intern.firstName"
                    type="text"
                    class="grow"
                    placeholder="First Name"
                    required
                  />
                </label>
                <label class="flex items-center gap-2 input input-bordered">
                  <input
                    v-model="intern.lastName"
                    type="text"
                    class="grow"
                    placeholder="Last Name"
                    required
                  />
                </label>
                <select
                  @change="handleSelectDepartmentIntern"
                  v-model="departmenValue"
                  class="w-full py-3 select select-bordered"
                >
                  <option selected disabled>{{ departmenValue }}</option>

                  <option
                    v-for="item in userStore.departmentlist"
                    :key="item._id"
                    :value="item"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div class="flex flex-col gap-2">
                  <button type="submit" class="text-lg btn btn-primary btn-block">
                    Create User
                  </button>
                  <button
                    type="button"
                    class="text-lg btn-accent btn btn-outline btn-block"
                    @click="handleToggleModal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
            <!-- <div v-if="selectedRole === 'HTE'" class="flex flex-col gap-3 pt-3"> -->
            <form @submit.prevent="handleHteUser" action="">
              <div
                v-if="selectedRole === 'HTE'"
                class="grid gap-3 pt-3 overflow-y-auto md:grid-cols-2"
              >
                <!-- <div v-if="true" class="grid grid-cols-2 gap-3 pt-3"> -->

                <!-- Left Side -->
                <div class="flex flex-col w-full gap-3 p-1">
                  <label class="flex items-center gap-2 input input-bordered">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4 opacity-70"
                    >
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                      />
                    </svg>
                    <input
                      v-model="hte.username"
                      type="text"
                      class="grow"
                      placeholder="Username"
                      required
                    />
                  </label>
                  <label
                    class="flex items-center justify-between gap-2 input input-bordered"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4 opacity-70"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <input
                      class="grow"
                      placeholder="Secure password"
                      v-model.trim="hte.password"
                      :type="passwordFieldType"
                      required
                    />
                  </label>
                  <div class="flex flex-row-reverse justify-start gap-3">
                    <button
                      class="text-right btn btn-primary"
                      @click="handleGeneratePassword"
                    >
                      Generate password
                    </button>
                    <button
                      class="text-right btn btn-accent btn-outline"
                      @click="toggleShowPassword"
                    >
                      {{ showPassword ? "Hide" : "Show" }}
                    </button>
                  </div>
                  <label class="flex items-center gap-2 input input-bordered">
                    <input
                      v-model="hte.fullName"
                      type="text"
                      class="grow"
                      placeholder="Company name"
                      required
                    />
                  </label>
                  <div class="flex flex-col gap-3">
                    <label class="flex items-center gap-2 input input-bordered">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="w-4 h-4 opacity-70"
                      >
                        <path
                          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                        />
                        <path
                          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                        />
                      </svg>
                      <input
                        v-model="hte.email"
                        type="email"
                        class="grow"
                        placeholder="Email"
                        required
                      />
                    </label>

                    <label class="flex items-center w-full gap-2 input input-bordered">
                      <input
                        v-model="hte.contact"
                        type="tel"
                        class="grow"
                        placeholder="11 Digits Contact Number"
                        minlength="11"
                        maxlength="11"
                        pattern="[0-9]{11,11}"
                        required
                      />
                    </label>
                  </div>

                  <div class="flex flex-col gap-3 md:flex-row">
                    <select
                      class="w-full select select-bordered"
                      v-model="selectedProvince"
                      @change="onSelectProvince"
                      required
                    >
                      <option selected disabled>Province</option>
                      <option v-for="item in provinces" :key="item" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                    <select
                      class="w-full select select-bordered"
                      v-model="selectedMunicipality"
                      @change="onSelectMunicipality"
                      required
                    >
                      <option selected disabled>Municipality/City</option>
                      <option v-for="item in municipality" :key="item" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="flex flex-col w-full gap-3">
                    <select
                      class="w-full select select-bordered"
                      v-model="selectedBrgy"
                      @change="onSelectBrgy"
                      required
                    >
                      <option selected disabled>Brgy</option>
                      <option v-for="item in brgy" :key="item" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                    <label class="flex items-center gap-2 input input-bordered">
                      <input
                        v-model="hte.street"
                        type="text"
                        class="grow"
                        placeholder="Street/House Number"
                        required
                      />
                    </label>
                  </div>
                </div>
                <!-- Right Side -->
                <div class="flex flex-col w-full gap-3">
                  <div class="flex gap-3">
                    <label
                      class="flex items-center justify-between w-full input input-bordered"
                    >
                      <input
                        v-model.trim="businessName"
                        type="text"
                        class="max-w-xs"
                        placeholder="Business Name"
                        required
                      />
                    </label>
                    <button
                      @click="getBusinessLocation"
                      class="btn btn-outline bt-bloc btn-accent"
                    >
                      <i class="text-3xl bx bx-search-alt"></i>
                    </button>
                  </div>

                  <label class="flex items-center gap-2 input input-bordered">
                    <input
                      v-model="hte.mapLocation.lat"
                      type="number"
                      class="w-full"
                      placeholder="Latitude"
                      required
                      readonly
                    />
                    <input
                      v-model="hte.mapLocation.lng"
                      type="number"
                      class="w-full"
                      placeholder="Longtitude"
                      required
                      readonly
                    />
                  </label>
                  <div v-if="errorMessage" class="p-3 text-center error">
                    {{ errorMessage }}
                  </div>
                  <div v-if="!locationRes && !errorMessage" class="p-3 text-center error">
                    No results to show
                  </div>

                  <div v-if="isMapShow" class="w-full h-[300px]" id="map"></div>
                </div>
                <div class="flex flex-row-reverse col-span-2 gap-2 md:mt-auto">
                  <button type="submit" class="w-32 btn btn-primary">Create User</button>
                  <button
                    class="w-32 text-lg btn btn-accent btn-outline"
                    @click="handleToggleModal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
            <div v-if="selectedRole === 'Coordinator'" class="flex flex-col gap-3 pt-3">
              <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
              <label
                class="flex items-center gap-2 md:input-md input-sm input input-bordered"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                  />
                </svg>
                <input
                  v-model.trim="coordinator.username"
                  type="text"
                  class="grow"
                  placeholder="Username"
                />
              </label>
              <label
                class="flex items-center justify-between gap-2 md:input-md input-sm input input-bordered"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  class="grow"
                  placeholder="Secure password"
                  v-model.trim="coordinator.password"
                  :type="passwordFieldType"
                />
              </label>
              <div class="flex justify-end">
                <div class="flex flex-row-reverse gap-3">
                  <button
                    class="ml-auto text-right btn btn-primary"
                    @click="handleGeneratePassword"
                  >
                    Generate password
                  </button>
                  <button
                    class="ml-auto text-right btn btn-outline"
                    @click="toggleShowPassword"
                  >
                    {{ showPassword ? "Hide" : "Show" }}
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="coordinator.firstName"
                    type="text"
                    class="grow"
                    placeholder="Coordinator First Name"
                  />
                </label>
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="coordinator.lastName"
                    type="text"
                    class="md:grow"
                    placeholder="Coordinator Last Name"
                  />
                </label>
              </div>
              <div class="flex flex-col gap-1 md:flex-row md:gap-6">
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="coordinator.email"
                    type="text"
                    class="grow"
                    placeholder="Email"
                  />
                </label>
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="coordinator.contactNumber"
                    type="tel"
                    class="grow"
                    placeholder="11 Digits Contact Number"
                    minlength="11"
                    maxlength="11"
                    pattern="[0-9]{11,11}"
                    required
                  />
                </label>
              </div>

              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <select
                  class="w-full select select-bordered select-sm md:select-md md:max-w-xs"
                  v-model="selectedProvince"
                  @change="onSelectProvince"
                >
                  <option selected disabled>Province</option>
                  <option v-for="item in provinces" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
                <select
                  class="w-full select select-bordered select-sm md:select-md md:max-w-md"
                  v-model="selectedMunicipality"
                  @change="onSelectMunicipality"
                >
                  <option selected disabled>Municipality/City</option>
                  <option v-for="item in municipality" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <select
                  class="w-full select select-sm select-bordered md:select-md"
                  v-model="selectedBrgy"
                  @change="onSelectBrgy"
                >
                  <option selected disabled>Brgy</option>
                  <option v-for="item in brgy" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
                <label
                  class="flex items-center w-full gap-2 input input-sm md:input-md input-bordered"
                >
                  <input
                    v-model="coordinator.street"
                    type="text"
                    class="grow"
                    placeholder="Street/House Number"
                  />
                </label>
              </div>

              <div class="md:py-3">
                <select
                  @change="handleSelectDepartmentCoor"
                  class="w-full py-3 select select-bordered"
                >
                  <option selected disabled value="">Select department</option>

                  <option
                    v-for="item in userStore.departmentlist"
                    :key="item._id"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-2">
                <button @click="handleCoorUser" class="text-lg btn btn-primary btn-block">
                  Create Account
                </button>
                <button
                  class="text-lg btn btn-outline btn-block btn-accent"
                  @click="handleToggleModal"
                >
                  Close
                </button>
              </div>
            </div>
            <div v-if="selectedRole === 'Admin'" class="flex flex-col gap-3 pt-3">
              <!-- <div v-if="true" class="flex flex-col gap-3 pt-3"> -->
              <label
                class="flex items-center gap-2 md:input-md input-sm input input-bordered"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
                  />
                </svg>
                <input
                  v-model.trim="admin.username"
                  type="text"
                  class="grow"
                  placeholder="Username"
                />
              </label>
              <label
                class="flex items-center justify-between gap-2 md:input-md input-sm input input-bordered"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="w-4 h-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  class="grow"
                  placeholder="Secure password"
                  v-model.trim="admin.password"
                  :type="passwordFieldType"
                />
              </label>
              <div class="flex justify-end">
                <div class="flex flex-row-reverse gap-3">
                  <button
                    class="ml-auto text-right btn btn-primary"
                    @click="handleGeneratePassword"
                  >
                    Generate password
                  </button>
                  <button
                    class="ml-auto text-right btn btn-outline"
                    @click="toggleShowPassword"
                  >
                    {{ showPassword ? "Hide" : "Show" }}
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="admin.firstName"
                    type="text"
                    class="grow"
                    placeholder="First Name"
                  />
                </label>
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="admin.lastName"
                    type="text"
                    class="md:grow"
                    placeholder="Last Name"
                  />
                </label>
              </div>
              <div class="flex flex-col gap-1 md:flex-row md:gap-6">
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="admin.email"
                    type="text"
                    class="grow"
                    placeholder="Email"
                  />
                </label>
                <label
                  class="flex items-center w-full gap-2 md:input-md input-sm input input-bordered"
                >
                  <input
                    v-model="admin.contactNumber"
                    type="tel"
                    class="grow"
                    placeholder="11 Digits Contact Number"
                    minlength="11"
                    maxlength="11"
                    pattern="[0-9]{11,11}"
                    required
                  />
                </label>
              </div>

              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <select
                  class="w-full select select-bordered select-sm md:select-md md:max-w-xs"
                  v-model="selectedProvince"
                  @change="onSelectProvince"
                >
                  <option selected disabled>Province</option>
                  <option v-for="item in provinces" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
                <select
                  class="w-full select select-bordered select-sm md:select-md md:max-w-md"
                  v-model="selectedMunicipality"
                  @change="onSelectMunicipality"
                >
                  <option selected disabled>Municipality/City</option>
                  <option v-for="item in municipality" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2 md:gap-6 md:flex-row">
                <select
                  class="w-full select select-sm select-bordered md:select-md"
                  v-model="selectedBrgy"
                  @change="onSelectBrgy"
                >
                  <option selected disabled>Brgy</option>
                  <option v-for="item in brgy" :key="item" :value="item">
                    {{ item.name }}
                  </option>
                </select>
                <label
                  class="flex items-center w-full gap-2 input input-sm md:input-md input-bordered"
                >
                  <input
                    v-model="admin.street"
                    type="text"
                    class="grow"
                    placeholder="Street/House Number"
                  />
                </label>
              </div>

              <div class="flex flex-col gap-2">
                <button
                  @click="handleAdminUser"
                  class="text-lg btn btn-primary btn-block"
                >
                  Create Account
                </button>
                <button
                  class="text-lg btn btn-outline btn-block btn-accent"
                  @click="handleToggleModal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </template>
      </Modal>
      <Modal :show="isConfirmationModalShow" title="Confirmation">
        <template #default>
          <p class="text-xl font-medium">Are you sure you want to remove this account?</p>
          <div class="flex justify-end gap-3 pt-9">
            <button
              @click="isConfirmationModalShow = !isConfirmationModalShow"
              class="btn btn-accent btn-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="handleDeleteAccount"
              class="bg-red-600 btn text-gray-50"
            >
              Proceed
            </button>
          </div>
        </template>
      </Modal>
    </section>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useRouter } from "vue-router";
const userStore = useAdminUserStore();
import { ref, onMounted, reactive, computed, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
const route = useRoute();
const router = useRouter();
const searchField = ref("username");
const searchValue = ref("");
const isModalShow = ref(false);
const selectedRole = ref("Select User Role");
const passwordFieldType = ref("password");
const showPassword = ref(false);
const isConfirmationModalShow = ref(false);
const provinces = ref([]);
const municipality = ref([]);
const brgy = ref([]);
const businessName = ref("");
const locationResults = ref(null);
const selectedProvince = ref("Province");
const selectedMunicipality = ref("Municipality/City");
const selectedBrgy = ref("Brgy");
const userListFiltered = ref([]);
const getProvinces = async () => {
  try {
    const response = await axios.get("https://psgc.gitlab.io/api/provinces/");
    console.log(response.data);
    provinces.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};
const getMunicipalities = async (selectedProvince) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
    );
    console.log(response.data);
    municipality.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
const getBrgy = async (selectedMunicipality) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/cities-municipalities/${selectedMunicipality}/barangays/`
    );
    console.log(response.data);
    brgy.value = response.data;
  } catch (err) {
    console.log(err);
  }
};

const onSelectProvince = async () => {
  await getMunicipalities(selectedProvince.value.code);
  if (selectedRole.value === "HTE") {
    return (hte.province = selectedProvince.value.name);
  }
  if (selectedRole.value === "Coordinator") {
    return (coordinator.province = selectedProvince.value.name);
  }
  if (selectedRole.value === "Admin") {
    return (admin.province = selectedProvince.value.name);
  }
};
const onSelectMunicipality = async () => {
  await getBrgy(selectedMunicipality.value.code);
  // coordinator.municipality = selectedMunicipality.value.name;
  // hte.municipality = selectedMunicipality.value.name;
  if (selectedRole.value === "HTE") {
    return (hte.municipality = selectedMunicipality.value.name);
  }
  if (selectedRole.value === "Coordinator") {
    return (coordinator.municipality = selectedMunicipality.value.name);
  }
  if (selectedRole.value === "Admin") {
    return (admin.municipality = selectedMunicipality.value.name);
  }
};
const onSelectBrgy = () => {
  if (selectedRole.value === "HTE") {
    return (hte.brgy = selectedBrgy.value.name);
  }
  if (selectedRole.value === "Coordinator") {
    return (coordinator.brgy = selectedBrgy.value.name);
  }
  if (selectedRole.value === "Admin") {
    return (admin.brgy = selectedBrgy.value.name);
  }
};
const departmenValue = ref("Select department");
const intern = reactive({
  username: "",
  password: "",
  contact: "",
  role: selectedRole.value,
  email: "",
  firstName: "",
  lastName: "",
  department: "",
  hours: 0,
});
const hte = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  fullName: "",
  contact: "",
  province: "",
  municipality: "",
  brgy: "",
  street: "",
  mapLocation: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});
const coordinator = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  firstName: "",
  lastName: "",
  street: "",
  brgy: "",
  municipality: "",
  province: "",
  contactNumber: "",
  department: "",
});
const admin = reactive({
  username: "",
  password: "",
  role: selectedRole.value,
  email: "",
  firstName: "",
  lastName: "",
  street: "",
  brgy: "",
  municipality: "",
  province: "",
  contactNumber: "",
});
const selectedOption = ref("Select Department");
const userId = ref("");

const toggleConfirmationModal = (id) => {
  console.log(id);
  userId.value = id;
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};
const handleDeleteAccount = async () => {
  await userStore.removeAccount(userId.value);
  router.push({
    name: route.manage_users, // or use `path: route.path`
  });
  isConfirmationModalShow.value = !isConfirmationModalShow.value;
};
const handleGeneratePassword = () => {
  const length = 12;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let generatedPassword = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    generatedPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  if (selectedRole.value === "Intern") {
    return (intern.password = generatedPassword);
  }
  if (selectedRole.value === "HTE") {
    return (hte.password = generatedPassword);
  }
  if (selectedRole.value === "Coordinator") {
    return (coordinator.password = generatedPassword);
  }
  if (selectedRole.value === "Admin") {
    return (admin.password = generatedPassword);
  }
  // if(selectedRole.value === 'intern'){
  //   return intern.password = generatedPassword;
  // }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
  passwordFieldType.value = showPassword.value ? "text" : "password";
};
const handleToggleModal = async () => {
  isModalShow.value = !isModalShow.value;
  selectedRole.value = "Select User Role";
  locationRes.value = null;
  marker.value = null;
  map.value = null;
  hte.mapLocation.lat = "";
  hte.mapLocation.lng = "";
  businessName.value = "";
};
const resetInternForms = () => {
  intern.username = "";
  intern.password = "";
  intern.role = "Select Role";
  intern.email = "";
  intern.department = "";
  intern.hours = 0;
  intern.firstName = "";
  intern.lastName = "";
};
const resetHTEForms = () => {
  hte.username = "";
  hte.password = "";
  hte.role = "Select Role";
  hte.email = "";
  hte.fullName = "";
  hte.contact = "";
  hte.address = "";
  hte.hasMoa = "";
  hte.street = "";
  hte.mapLocation.lat = "";
  hte.mapLocation.lng = "";
  businessName.value = "";
  selectedProvince.value = "Province";
  selectedMunicipality.value = "Municipality/City";
  selectedBrgy.value = "Brgy";
};
const resetCoorForms = () => {
  coordinator.username = "";
  coordinator.password = "";
  coordinator.role = "Select Role";
  coordinator.email = "";
  coordinator.firstName = "";
  coordinator.lastName = "";
  coordinator.contactNumber = null;
  coordinator.department = "Select Department";
  selectedProvince.value = "Province";
  selectedMunicipality.value = "Municipality/City";
  selectedBrgy.value = "Brgy";
  coordinator.street = "";
};

const handleSelectDepartmentIntern = () => {
  intern.department = departmenValue.value.name;
  intern.hours = departmenValue.value.hours;
};
const handleSelectDepartmentCoor = (event) => {
  console.log(event.target.value);
  coordinator.department = event.target.value;
};

const handleInternUser = async () => {
  try {
    if (intern.username === "") {
      return alert("Please enter username");
    }
    if (intern.password === "") {
      return alert("Please enter password");
    }
    if (intern.email === "") {
      return alert("Please enter email");
    }

    if (intern.department === "") {
      return alert("Please select department");
    }
    await userStore.addIntern(intern);

    resetInternForms();
    await handleToggleModal();
    router.push({ name: "manage_users" });
  } catch (err) {
    console.log(err);
  }
};
const handleHteUser = async () => {
  try {
    if (hte.username === "") {
      return alert("Please enter username");
    }
    if (hte.password === "") {
      return alert("Please enter password");
    }
    if (hte.email === "") {
      return alert("Please enter email");
    }
    if (hte.fullName === "") {
      return alert("Please enter company name");
    }
    if (hte.contact === "") {
      return alert("Please enter contact number");
    }
    // if (hte.contact.length != 10) {
    //   return alert("Please complete contact number");
    // }
    if (hte.street === "") {
      return alert("Please enter street");
    }
    if (hte.brgy === "") {
      return alert("Please select brgy");
    }
    if (hte.municipality === "") {
      return alert("Please select municipality");
    }
    if (hte.province === "") {
      return alert("Please select province");
    }
    if (hte.mapLocation.lat === "") {
      return alert("Please enter lat value");
    }
    if (hte.mapLocation.lng === "") {
      return alert("Please enter lng value");
    }

    await userStore.addHTE(hte);

    resetHTEForms();
    await handleToggleModal();
    router.push({
      name: route.manage_users, // or use `path: route.path`
    });
  } catch (err) {
    console.log(err);
  }
};
const handleCoorUser = async () => {
  if (coordinator.username === "") {
    return alert("Please enter username");
  }
  if (coordinator.password === "") {
    return alert("Please enter password");
  }
  if (coordinator.email === "") {
    return alert("Please enter email");
  }
  if (coordinator.firstName === "") {
    return alert("Please enter firstName");
  }
  if (coordinator.lastName === "") {
    return alert("Please enter lastName");
  }
  if (coordinator.street === "") {
    return alert("Please enter street");
  }
  if (coordinator.brgy === "") {
    return alert("Please enter brgy");
  }
  if (coordinator.municipality === "") {
    return alert("Please enter municipality");
  }
  if (coordinator.province === "") {
    return alert("Please enter province");
  }
  if (coordinator.contactNumber == "") {
    return alert("Please enter contactNumber");
  }

  if (coordinator.department === "") {
    return alert("Please select department");
  }
  try {
    await userStore.addCoordinator(coordinator);

    await handleToggleModal();
    resetCoorForms();
    router.push({
      name: route.manage_users, // or use `path: route.path`
      query: { users: "All" },
    });
  } catch (err) {
    console.log(err);
  }
};
const handleAdminUser = async () => {
  // function limitLength(input, maxLength) {
  //   if (input.value.length > maxLength) {
  //     input.value = input.value.slice(0, maxLength); // Limit to maxLength digits
  //   }
  // }
  if (admin.username === "") {
    return alert("Please enter username");
  }
  if (admin.password === "") {
    return alert("Please enter password");
  }
  if (admin.email === "") {
    return alert("Please enter email");
  }
  if (admin.firstName === "") {
    return alert("Please enter firstName");
  }
  if (admin.lastName === "") {
    return alert("Please enter lastName");
  }
  if (admin.street === "") {
    return alert("Please enter street");
  }
  if (admin.brgy === "") {
    return alert("Please enter brgy");
  }
  if (admin.municipality === "") {
    return alert("Please enter municipality");
  }
  if (admin.province === "") {
    return alert("Please enter province");
  }
  if (admin.contactNumber === "") {
    return alert("Please enter contactNumber");
  }
  try {
    await userStore.addAdmin(admin);

    await handleToggleModal();
    // resetCoorForms();
    router.push({
      name: route.manage_users, // or use `path: route.path`
    });
  } catch (err) {
    console.log(err);
  }
};

const handleSelectChange = async () => {
  if (selectedRole.value === "Intern") {
    intern.role = selectedRole.value;
  }
  if (selectedRole.value === "HTE") {
    hte.role = selectedRole.value;
  }
  if (selectedRole.value === "Admin") {
    admin.role = selectedRole.value;
  }
  if (selectedRole.value === "Coordinator") {
    coordinator.role = selectedRole.value;
  }
};
const headers = [
  { text: "USERNAME", value: "username" },

  { text: "ROLE", value: "role" },
  { text: "STATUS", value: "status" },
  // { text: "DATE CREATED", value: "createdAt" },
  { text: "ACTIONS", value: "operation", width: 10 },
];

watch(
  () => route.query,
  () => {
    userStore.fetchUsers(route.query.users);
  }
);
onMounted(async () => {
  await userStore.fetchUsers(route.query.users);
  await userStore.fetchDepartmentList();
  await getProvinces();
  initMap();
});

const locationRes = ref(null);
const errorMessage = ref(null);
const map = ref(null);
const marker = ref(null);
const isMapShow = ref(true);

const getBusinessLocation = async () => {
  if (!businessName.value.trim()) {
    hte.mapLocation.lat = "";
    hte.mapLocation.lng = "";
    errorMessage.value = "Please enter a business name.";
    isMapShow.value = false;
    return;
  }
  isMapShow.value = true;
  errorMessage.value = null;
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_API_GOOGLE_KEY, // Replace with your actual API key
      libraries: ["places"],
      version: "weekly",
    });

    const { PlacesService } = await loader.importLibrary("places");

    const service = new PlacesService(document.createElement("div"));

    const request = {
      query: businessName.value,
      fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const place = results[0];
        locationRes.value = place.geometry.location.toJSON();
        hte.mapLocation.lat = locationRes.value.lat;
        hte.mapLocation.lng = locationRes.value.lng;
        initMap();
      } else {
        errorMessage.value = "Business not found.";
        locationRes.value = null;
        isMapShow.value = false;
        initMap();
      }
    });
  } catch (err) {
    console.error(err);
    errorMessage.value = "An error occurred while fetching the location.";
  }
};

const initMap = () => {
  map.value = new google.maps.Map(document.getElementById("map"), {
    center: locationRes.value,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });
  marker.value = new google.maps.Marker({
    position: locationRes.value,
    map: map.value,
    draggable: true,
  });

  marker.value.addListener("dragend", (event) => {
    hte.mapLocation.lat = event.latLng.lat().toFixed(6);
    hte.mapLocation.lng = event.latLng.lng().toFixed(6);
  });
  map.value.addListener("click", (event) => {
    const clickedLocation = event.latLng;
    hte.mapLocation.lat = clickedLocation.lat().toFixed(6);
    hte.mapLocation.lng = clickedLocation.lng().toFixed(6);

    // Move the marker to the clicked location
    marker.value.setPosition(clickedLocation);
  });
};
</script>

<style></style>
