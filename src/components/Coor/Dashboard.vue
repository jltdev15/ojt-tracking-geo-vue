<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </header>
    <div class="flex min-h-screen bg-gray-100">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Internships</h1>
        </header>
        <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    enable-background="new 0 0 24 24"
                    id="Layer_1"
                    version="1.0"
                    viewBox="0 0 24 24"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        d="M9,9c0-1.7,1.3-3,3-3s3,1.3,3,3c0,1.7-1.3,3-3,3S9,10.7,9,9z M12,14c-4.6,0-6,3.3-6,3.3V19h12v-1.7C18,17.3,16.6,14,12,14z   "
                      />
                    </g>
                    <g>
                      <g><circle cx="18.5" cy="8.5" r="2.5" /></g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g><circle cx="18.5" cy="8.5" r="2.5" /></g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g><circle cx="5.5" cy="8.5" r="2.5" /></g>
                      <g>
                        <path
                          d="M5.5,13c1.2,0,2.1,0.3,2.8,0.8c-2.3,1.1-3.2,3-3.2,3.2l0,0.1H1v-1.3C1,15.7,2.1,13,5.5,13z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfInterns }}
                </div>
                <div class="text-gray-400">Interns</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="8.4666mm"
                    style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    "
                    version="1.1"
                    viewBox="0 0 846.66 846.66"
                    width="8.4666mm"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path
                        class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfHTE }}
                </div>
                <div class="text-gray-400">HTE's</div>
              </div>
            </div>
          </div>

          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="32px"
                    id="Layer_1"
                    style="enable-background: new 0 0 50 50"
                    version="1.1"
                    viewBox="0 0 50 50"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Layer_1_1_">
                      <path
                        d="M11,49h4h8h4h8h4h8h2v-2h-2V1h-8v46h-4V11h-8v36h-4V21h-8v26h-4V31H3v16H1v2h2H11z M41,3h4v44h-4V3z M29,13h4v34h-4V13z    M17,23h4v24h-4V23z M5,33h4v14H5V33z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfUsers }}
                </div>
                <div class="text-gray-400">Deployed</div>
              </div>
            </div>
          </div>
        </div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">
            HOST TRAINING ESTABLISHMENT
          </h1>
        </header>
        <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="8.4666mm"
                    style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    "
                    version="1.1"
                    viewBox="0 0 846.66 846.66"
                    width="8.4666mm"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path
                        class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfHTE }}
                </div>
                <div class="text-gray-400">with MOA</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="8.4666mm"
                    style="
                      shape-rendering: geometricPrecision;
                      text-rendering: geometricPrecision;
                      image-rendering: optimizeQuality;
                      fill-rule: evenodd;
                      clip-rule: evenodd;
                    "
                    version="1.1"
                    viewBox="0 0 846.66 846.66"
                    width="8.4666mm"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs></defs>
                    <g id="Layer_x0020_1">
                      <path
                        class="fil0"
                        d="M460.89 284.91l157.98 0 0 -214.83 -569.87 0 0 706.5 391.08 0 0 -470.86c0,-11.49 9.32,-20.81 20.81,-20.81zm-334.7 187.54l221.99 0c11.49,0 20.81,9.32 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.48 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.49 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm-201.19 -208.6l221.99 0c11.49,0 20.81,9.31 20.81,20.8l0 76c0,11.48 -9.32,20.8 -20.81,20.8l-221.99 0c-11.49,0 -20.8,-9.32 -20.8,-20.8l0 -76c0,-11.49 9.31,-20.8 20.8,-20.8zm201.19 41.61l-180.38 0 0 34.38 180.38 0 0 -34.38zm333.1 104.83l157.98 0c11.49,0 20.81,9.32 20.81,20.81l0 491.67c0,11.49 -9.32,20.8 -20.81,20.8 -263.42,0 -526.84,0 -790.26,0 -11.49,0 -20.81,-9.31 -20.81,-20.8l0 -748.12c0,-11.48 9.32,-20.8 20.81,-20.8l611.48 0c11.48,0 20.8,9.32 20.8,20.8l0 235.64zm8.67 491.67l0 -86.89 -58.95 0 0 86.89 58.95 0zm-100.56 0l0 -107.7c0,-11.49 9.31,-20.8 20.8,-20.8l100.57 0c11.49,0 20.8,9.31 20.8,20.8l0 107.7 86.9 0 0 -450.06 -157.98 0 -157.99 0 0 450.06 86.9 0zm-27.62 -283.08l61.46 0c11.49,0 20.8,9.31 20.8,20.8l0 61.46c0,11.49 -9.31,20.81 -20.8,20.81l-61.46 0c-11.49,0 -20.81,-9.32 -20.81,-20.81l0 -61.46c0,-11.49 9.32,-20.8 20.81,-20.8zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.31 20.81,20.8l0 61.46c0,11.49 -9.32,20.81 -20.81,20.81l-61.46 0c-11.49,0 -20.8,-9.32 -20.8,-20.81l0 -61.46c0,-11.49 9.31,-20.8 20.8,-20.8zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm-176.61 -162.67l61.46 0c11.49,0 20.8,9.32 20.8,20.81l0 61.46c0,11.49 -9.31,20.8 -20.8,20.8l-61.46 0c-11.49,0 -20.81,-9.31 -20.81,-20.8l0 -61.46c0,-11.49 9.32,-20.81 20.81,-20.81zm40.65 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85zm95.3 -41.61l61.46 0c11.49,0 20.81,9.32 20.81,20.81l0 61.46c0,11.49 -9.32,20.8 -20.81,20.8l-61.46 0c-11.49,0 -20.8,-9.31 -20.8,-20.8l0 -61.46c0,-11.49 9.31,-20.81 20.8,-20.81zm40.66 41.61l-19.85 0 0 19.85 19.85 0 0 -19.85z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfHTE }}
                </div>
                <div class="text-gray-400">without MOA</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 1)"
                  >
                    <path
                      d="M19.071 4.929c-3.899-3.898-10.243-3.898-14.143 0-3.898 3.899-3.898 10.244 0 14.143 3.899 3.898 10.243 3.898 14.143 0 3.899-3.9 3.899-10.244 0-14.143zm-3.536 10.607-2.828-2.829-3.535 3.536-1.414-1.414 3.535-3.536-2.828-2.829h7.07v7.072z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfAdmin }}
                </div>
                <div class="text-gray-400">For visitation</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3.414 13.778 2 15.192l4.949 2.121 2.122 4.95 1.414-1.414-.707-3.536L13.091 14l3.61 7.704 1.339-1.339-1.19-10.123 2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903L3.824 6.297 2.559 7.563l7.644 3.67-3.253 3.253-3.536-.708z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ adminUserStore.getNumberOfUsers }}
                </div>
                <div class="text-gray-400">Visited</div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="w-2/6 p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Announcements</h1>
        </header>
        <section>
          <div class="p-5 bg-white rounded shadow-sm">
            <header>date</header>
            <p>Title</p>
            <p>Content</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useCoorStore } from "@/stores/CoorStore";
const coorStore = useCoorStore();
const adminUserStore = useAdminUserStore();
onMounted(async () => {
  document.title = "OJT Tracker | Dashboard";
  await coorStore.fetchInternLists();
  // await authStore.checkAuth();
  // await adminUserStore.fetchUsers();
  // await adminUserStore.fetchAllUsers();
});
</script>
