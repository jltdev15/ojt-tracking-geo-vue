<template>
  <div class="px-6">
    <div class="px-0 py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ApplicantsList' }">Summary</router-link>
        </li>
      </ul>
    </div>
    <main class="w-4/6 bg-gray-50">
      <section class="pt-6 px-6">
        <h1 class="font-bold text-xl pb-2">Evaluation Summary</h1>
        <div class="grid grid-cols-2">
          <div class="flex flex-col gap-2 text-sm">
            <p>Intern Name</p>
            <p>HTE</p>
            <p>Address</p>
            <p>HTE Evaluator</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p>Position</p>
            <p>Training Period</p>
            <p>Rendered Hours</p>
          </div>
        </div>
      </section>
      <section class="grid grid-cols-2 pt-1 gap-6 px-6 pb-6">
        <div class="">
          <p class="p-2 font-bold bg-gray-50">Team Work</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>1. Consistently works with others to finish the tasks and goals.</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>2. Treat team members with proper respect and demeanor.</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>3. Participates actively in activities and assignments</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>
                  4. Willingly works with team members to continuously improve teamwork
                </p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>
                  5. Considers feedback and views of members when completing the tasks
                </p>
                <p>5</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Communication</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>6. Attentively listens to HTE supervisor and coordinator(s)</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>7. Comprehends oral and written information</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>8. Consistently delivers information accurately</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>
                  9. Reliably provides feedback as required, externally and internally
                </p>
                <p>5</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Attendance and Punctuality</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>10. Maintains participation and good attendance</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>11. Informs supervisor ahead of time if absent or late</p>
                <p>5</p>
              </li>
            </ul>
          </section>
        </div>
        <div>
          <p class="p-2 font-bold bg-gray-50">Productivity Resilience</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>12. Consistently delivers quality results</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>13. Meets deadlines and and manages time well</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>
                  14. Works under pressure and conflicts to accomplish the task at hand
                </p>
                <p>5</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Initiative/Proactivity</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>15. Completes tasks with minimal supervision</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>16. Completes tasks successively and independently</p>
                <p>5</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Dependability/Reliability</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>17. Ably follows through and meet deadlines</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>18. Takes accountability to his/her actions</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>19. Adapts effectively to change in the work from home OJT</p>
                <p>5</p>
              </li>
              <li class="flex justify-between">
                <p>20.Shows consistent level of good performance</p>
                <p>5</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Results</p>
          <section class="text-sm px-6 grid">
            <ul class="flex flex-col gap-2">
              <li class="flex items-center justify-between">
                <p>Total Score</p>
                <p class="text-xl font-bold">5</p>
              </li>
              <li class="flex items-center justify-between">
                <p>Verbal Interpretation</p>
                <p class="text-xl font-bold">Outstanding</p>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup></script>

<style scoped></style>
