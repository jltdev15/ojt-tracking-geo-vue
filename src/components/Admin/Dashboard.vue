<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Overview</h1>
    </header>
    <div class="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      <div class="container max-w-6xl p-5">
        <!-- Coordinator -->
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Coordinator</h1>
        </header>
        <div class="grid grid-cols-2 gap-7 lg:grid-cols-3">
          <div class="p-5 bg-white rounded shadow-sm hover:bg-gray-200">
            <router-link :to="{ name: 'appSettings' }" class="flex items-center space-x-4 space-y-2"
              v-if="adminUserStore.getNumberOfDepartment !== 0">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfDepartment }}
                </div>
                <div class="text-sm text-gray-400">Department</div>
              </div>
            </router-link>
            <div class="flex items-center space-x-4 space-y-2" v-if="adminUserStore.getNumberOfDepartment === 0">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfDepartment }}
                </div>
                <div class="text-gray-400">Department</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberVisitationSent }}
                </div>
                <div class="text-gray-400">Visitation Sent</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Layer_1" style="enable-background: new 0 0 50 50" version="1.1"
                    viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Layer_1_1_">
                      <path
                        d="M11,49h4h8h4h8h4h8h2v-2h-2V1h-8v46h-4V11h-8v36h-4V21h-8v26h-4V31H3v16H1v2h2H11z M41,3h4v44h-4V3z M29,13h4v34h-4V13z    M17,23h4v24h-4V23z M5,33h4v14H5V33z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberVisitationDone }}
                </div>
                <div class="text-gray-400">Visitation Done</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Interns -->
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Interns</h1>
        </header>
        <div class="grid grid-cols-2 gap-7 lg:grid-cols-3">
          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <router-link v-if="adminUserStore.getNumberOfInterns !== 0" :to="{ name: 'InternsList' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="8.4666mm" style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    " version="1.1" viewBox="0 0 846.66 846.66" width="8.4666mm" xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfInterns }}
                </div>
                <div class="text-gray-400">Total Interns</div>
              </div>
            </router-link>
            <div v-if="adminUserStore.getNumberOfInterns === 0" :to="{ name: 'InternsList' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="8.4666mm" style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    " version="1.1" viewBox="0 0 846.66 846.66" width="8.4666mm" xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfInterns }}
                </div>
                <div class="text-gray-400">Total Interns</div>
              </div>
            </div>
          </div>
          <div class="p-5 transition-all bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <router-link v-if="adminUserStore.getNumberInternDeployed > 0" :to="{ name: 'InternsList' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberInternDeployed }}
                </div>
                <div class="text-gray-400">Deployed</div>
              </div>
            </router-link>
            <div v-if="adminUserStore.getNumberInternDeployed === 0" :to="{ name: 'InternsList' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberInternDeployed }}
                </div>
                <div class="text-gray-400">Deployed</div>
              </div>
            </div>
          </div>

          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Layer_1" style="enable-background: new 0 0 50 50" version="1.1"
                    viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Layer_1_1_">
                      <path
                        d="M11,49h4h8h4h8h4h8h2v-2h-2V1h-8v46h-4V11h-8v36h-4V21h-8v26h-4V31H3v16H1v2h2H11z M41,3h4v44h-4V3z M29,13h4v34h-4V13z    M17,23h4v24h-4V23z M5,33h4v14H5V33z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberInternFinished }}
                </div>
                <div class="text-gray-400">Evaluated</div>
              </div>
            </div>
          </div>
        </div>
        <!-- HTE -->
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">
            Host Training Establisments
          </h1>
        </header>
        <div class="grid grid-cols-2 gap-7 lg:grid-cols-3">
          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <router-link v-if="adminUserStore.getNumberOfHTE !== 0" :to="{ name: 'hteLists' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="8.4666mm" style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    " version="1.1" viewBox="0 0 846.66 846.66" width="8.4666mm" xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfHTE }}
                </div>
                <div class="text-gray-400">Registerd HTE</div>
              </div>
            </router-link>
            <div v-if="adminUserStore.getNumberOfHTE === 0" class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="8.4666mm" style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    " version="1.1" viewBox="0 0 846.66 846.66" width="8.4666mm" xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfHTE }}
                </div>
                <div class="text-gray-400">Registerd HTE</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm cursor-pointer hover:bg-gray-200">
            <router-link v-if="adminUserStore.getNumberOfDepartment > 0" :to="{ name: 'Hte_Listing' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfVacancy }}
                </div>
                <div class="text-gray-400">Internships</div>
              </div>
            </router-link>
            <div v-if="adminUserStore.getNumberOfDepartment == 0" class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-6 h-6 rounded-full md:w-12 md:h-12 bg-cyan-50 text-cyan-400">
                  <svg height="32px" id="Capa_1" style="enable-background: new 0 0 100 88" version="1.1"
                    viewBox="0 0 100 88" width="100px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                      <path
                        d="M100,88c0,0-0.197-18.934-1.354-20.896c-1.721-2.923-5.729-4.932-13.17-8.041c-7.416-3.101-9.787-5.716-9.787-11.316   c0-3.364,2.264-2.264,3.26-8.419c0.412-2.555,2.412-0.043,2.795-5.872c0-2.324-1.092-2.903-1.092-2.903s0.555-3.437,0.771-6.084   c0.27-3.298-1.662-11.815-11.955-11.815c-10.295,0-12.225,8.518-11.955,11.815c0.217,2.647,0.77,6.084,0.77,6.084   s-1.09,0.579-1.09,2.903c0.383,5.829,2.381,3.317,2.795,5.872c0.994,6.155,3.26,5.056,3.26,8.419c0,3.807-1.102,6.235-4.137,8.375   c16.203,8.111,18.375,9.764,18.375,17.015V88H100z M51.117,61.877c-9.891-4.134-13.051-7.621-13.051-15.086   c0-4.483,3.02-3.019,4.346-11.228c0.549-3.404,3.217-0.056,3.727-7.829c0-3.098-1.455-3.868-1.455-3.868s0.74-4.583,1.029-8.112   C46.072,11.357,43.498,0,29.771,0C16.047,0,13.471,11.357,13.832,15.754c0.289,3.529,1.027,8.112,1.027,8.112   s-1.455,0.77-1.455,3.868c0.512,7.773,3.178,4.425,3.729,7.829c1.326,8.208,4.346,6.744,4.346,11.228   c0,7.465-3.162,10.952-13.051,15.086C5.414,63.137,0,65.088,0,69.783V88h69.469c0,0,0-10.776,0-13.659   C69.469,70.059,61.037,66.025,51.117,61.877z" />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfDepartment }}
                </div>
                <div class="text-gray-400">Internships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 md:w-3/6">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Announcements</h1>
        </header>
        <section>
          <ul class="flex flex-col h-screen gap-3 p-2 overflow-auto rounded shadow-sm">
            <p v-if="adminUserStore.announcementList.length === 0">No announcement yet</p>

            <AnnouncementItem v-for="data in adminUserStore.announcementList" :key="data.id" :title="data.title"
              :description="data.description" :author="data.author" :date="data.date" :role="data.role" />
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>

import AnnouncementItem from "../AnnouncementItem.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useAdminUserStore } from "@/stores/AdminUserStore";
const authStore = useAuthStore();
const adminUserStore = useAdminUserStore();
onMounted(async () => {
  await authStore.checkAuth();
  await adminUserStore.fetchUsers();
  await adminUserStore.fetchAllUsers();
  await adminUserStore.fetchDepartmentList();
  await adminUserStore.fetchAnnouncement();
  await adminUserStore.fetchApplicationList();
  await adminUserStore.fetchRequestList();
  await adminUserStore.fetchHTEListing();
});
</script>
