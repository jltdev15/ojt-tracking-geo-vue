<template>
  <div class="p-3">
    <main class="w-5/6 bg-gray-50">
      <section class="px-6 pt-6">
        <h1 class="pb-2 text-xl font-bold">Evaluation Summary</h1>
        <div class="grid grid-cols-2 gap-6 ">
          <div class="flex flex-col gap-2 text-sm ">
            <p class="font-bold">Intern Name : {{ evaluationResults.internName }}</p>
            <p>HTE : {{ evaluationResults.hteName }}</p>
            <p>Address: {{ evaluationResults.address }}</p>
            <p>HTE Evaluator: {{ evaluationResults.hteEvaluator }}</p>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <p>Position : {{ evaluationResults.position }}</p>
            <p>
              Training Period: {{ evaluationResults.startDate }} -
              {{ evaluationResults.endDate }}
            </p>
            <p>Rendered Hours: {{ evaluationResults.numberOfHoursRendered }}</p>
          </div>
        </div>
      </section>
      <section class="grid grid-cols-2 gap-6 px-6 pt-1 pb-6">
        <div class="">
          <p class="p-2 font-bold bg-gray-50">Team Work</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>1. Consistently works with others to finish the tasks and goals.</p>
                <p class="font-bold">{{ evaluationResults.Q1 }}</p>
              </li>
              <li class="flex justify-between">
                <p>2. Treat team members with proper respect and demeanor.</p>
                <p class="font-bold">{{ evaluationResults.Q2 }}</p>
              </li>
              <li class="flex justify-between">
                <p>3. Participates actively in activities and assignments</p>
                <p class="font-bold">{{ evaluationResults.Q3 }}</p>
              </li>
              <li class="flex justify-between">
                <p>
                  4. Willingly works with team members to continuously improve teamwork
                </p>
                <p class="font-bold">{{ evaluationResults.Q4 }}</p>
              </li>
              <li class="flex justify-between">
                <p>
                  5. Considers feedback and views of members when completing the tasks
                </p>
                <p class="font-bold">{{ evaluationResults.Q5 }}</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Communication</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>6. Attentively listens to HTE supervisor and coordinator(s)</p>
                <p class="font-bold">{{ evaluationResults.Q6 }}</p>
              </li>
              <li class="flex justify-between">
                <p>7. Comprehends oral and written information</p>
                <p class="font-bold">{{ evaluationResults.Q7 }}</p>
              </li>
              <li class="flex justify-between">
                <p>8. Consistently delivers information accurately</p>
                <p class="font-bold">{{ evaluationResults.Q8 }}</p>
              </li>
              <li class="flex justify-between">
                <p>
                  9. Reliably provides feedback as required, externally and internally
                </p>
                <p class="font-bold">{{ evaluationResults.Q9 }}</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Attendance and Punctuality</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>10. Maintains participation and good attendance</p>
                <p class="font-bold">{{ evaluationResults.Q10 }}</p>
              </li>
              <li class="flex justify-between">
                <p>11. Informs supervisor ahead of time if absent or late</p>
                <p class="font-bold">{{ evaluationResults.Q11 }}</p>
              </li>
            </ul>
          </section>
        </div>
        <div>
          <p class="p-2 font-bold bg-gray-50">Productivity Resilience</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>12. Consistently delivers quality results</p>
                <p class="font-bold">{{ evaluationResults.Q12 }}</p>
              </li>
              <li class="flex justify-between">
                <p>13. Meets deadlines and and manages time well</p>
                <p class="font-bold">{{ evaluationResults.Q13 }}</p>
              </li>
              <li class="flex justify-between">
                <p>
                  14. Works under pressure and conflicts to accomplish the task at hand
                </p>
                <p class="font-bold">{{ evaluationResults.Q14 }}</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Initiative/Proactivity</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>15. Completes tasks with minimal supervision</p>
                <p class="font-bold">{{ evaluationResults.Q15 }}</p>
              </li>
              <li class="flex justify-between">
                <p>16. Completes tasks successively and independently</p>
                <p class="font-bold">{{ evaluationResults.Q16 }}</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Dependability/Reliability</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex justify-between">
                <p>17. Ably follows through and meet deadlines</p>
                <p class="font-bold">{{ evaluationResults.Q17 }}</p>
              </li>
              <li class="flex justify-between">
                <p>18. Takes accountability to his/her actions</p>
                <p class="font-bold">{{ evaluationResults.Q18 }}</p>
              </li>
              <li class="flex justify-between">
                <p>19. Adapts effectively to change in the work from home OJT</p>
                <p class="font-bold">{{ evaluationResults.Q19 }}</p>
              </li>
              <li class="flex justify-between">
                <p>20.Shows consistent level of good performance</p>
                <p class="font-bold">{{ evaluationResults.Q20 }}</p>
              </li>
            </ul>
          </section>
          <p class="p-2 font-bold bg-gray-50">Results</p>
          <section class="grid text-sm">
            <ul class="flex flex-col gap-2">
              <li class="flex items-center justify-between">
                <p>Total Score</p>
                <p class="text-xl font-bold">{{ evaluationResults.totalScore }}</p>
              </li>
              <li class="flex items-center justify-between">
                <p>Verbal Interpretation</p>
                <p class="text-xl font-bold">
                  {{ evaluationResults.verbalInterpretation }}
                </p>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { storeToRefs } from "pinia";
const route = useRoute();
const hteStore = useHteStore();
const { evaluationResults } = storeToRefs(hteStore);

onMounted(async () => {
  await hteStore.getEvaluationItemResults(route.params.id);
});
</script>

<style scoped></style>
