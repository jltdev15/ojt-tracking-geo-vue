<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </header>
    <div class="flex min-h-screen bg-gray-100">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Hours Required</h1>
        </header>
        <div
          class="grid items-end gap-7 sm:grid-cols-2 justify-self-right lg:grid-cols-3"
        >
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Target Hours</div>
                <div class="text-2xl font-bold text-gray-900">720</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Rendered Hours</div>
                <div class="text-2xl font-bold text-gray-900">0</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Remaining Hours</div>
                <div class="text-2xl font-bold text-gray-900">720</div>
              </div>
            </div>
          </div>
        </div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">
            Internship Application
          </h1>
        </header>
        <div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Applied</div>
                <div class="text-2xl font-bold text-gray-900">3</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Declined</div>
                <div class="text-2xl font-bold text-gray-900">0</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Accepted</div>
                <div class="text-2xl font-bold text-gray-900">1</div>
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
<script setup></script>
