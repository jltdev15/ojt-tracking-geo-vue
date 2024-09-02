<script setup>
import { ref } from 'vue';
import { useForm } from '@/stores/HteEvaluationStore';

const { IsFormShow,result, nextForm, backForm, resultForm, submitForm } = useForm()


const Question1 = ref(null);
const Question2 = ref(null);
const Question3 = ref(null);
const Question4 = ref(null);
const Question5 = ref(null);
const Question6 = ref(null);
const Question7 = ref(null);
const Question8 = ref(null);
const Question9 = ref(null);
const Question10 = ref(null);
const Question11 = ref(null);
const Question12 = ref(null);
const Question13 = ref(null);
const Question14 = ref(null);
const Question15 = ref(null);
const Question16 = ref(null);
const Question17 = ref(null);
const Question18 = ref(null);
const Question19 = ref(null);
const Question20 = ref(null);
const comment = ref(null);

const resultBtn = async () => {
    await resultForm(Question1.value,Question2.value,Question3.value,Question4.value,Question5.value,
        Question6.value,Question7.value,Question8.value,Question9.value,Question10.value,Question11.value,
        Question12.value,Question13.value,Question14.value,Question15.value,Question16.value,Question17.value,
        Question18.value,Question19.value,Question20.value,comment.value
    );
}
</script>

<template>
    <div class="p-3">
        <header class="flex items-center justify-between p-3 bg-gray-50">
            <h1 class="text-3xl font-bold">Evaluation</h1>
        </header>
        <div class="w-full mt-2">
            <div v-if="IsFormShow !== 7" class="w-11/12 m-auto">
                <table class="w-10/12 m-auto bg-white border border-gray text-xs">
                    <tr class="border border-gray00">
                        <td class="px-4 py-2 border border-gray-300">5</td>
                        <td class="px-4 py-2 border border-gray-300">Outstanding (O)</td>
                        <td class="px-4 py-2 border border-gray-300">Performance exceeds the standard.</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 border border-gray-300">4</td>
                        <td class="px-4 py-2 border border-gray-300">Very Satisfactory (VS)</td>
                        <td class="px-4 py-2 border border-gray-300">Performance fully met the training standards. The
                            intern performed what was expected of him/her.</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 border border-gray-300">3</td>
                        <td class="px-4 py-2 border border-gray-300">Satisfactory (S)</td>
                        <td class="px-4 py-2 border border-gray-300">Performance has met the required standards, the
                            intern performed duties with minimal observation.</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 border border-gray-300">2</td>
                        <td class="px-4 py-2 border border-gray-300">Fair (F)</td>
                        <td class="px-4 py-2 border border-gray-300">Performance has minimally met the required
                            standards, less than satisfactory, a lot could be done better by the intern.</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 border border-gray-300">1</td>
                        <td class="px-4 py-2 border border-gray-300">Needs Improvement (NI)</td>
                        <td class="px-4 py-2 border border-gray-300">Major improvement needs to be done by the intern.
                        </td>
                    </tr>
                </table>
            </div>

            <div class="w-11/12 m-auto mt-2">
                <div v-if="IsFormShow === 1">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">TEAMWORK</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>1. Consistently works with others to finish the tasks and goals.</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question1-5"> 5</label>
                                        <input v-model="Question1" type="radio" name="Question1" id="Question1-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question1-4">4</label>
                                        <input v-model="Question1" type="radio" name="Question1" id="Question1-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question1-3">3</label>
                                        <input v-model="Question1" type="radio" name="Question1" id="Question1-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question1-2">2</label>
                                        <input v-model="Question1" type="radio" name="Question1" id="Question1-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question1-1">1</label>
                                        <input v-model="Question1" type="radio" name="Question1" id="Question1-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>2. Treat team members with proper respect and demeanor.</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question2-5">5</label>
                                        <input v-model="Question2" type="radio" name="Question2" id="Question2-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question2-4">4</label>
                                        <input v-model="Question2" type="radio" name="Question2" id="Question2-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question2-3">3</label>
                                        <input v-model="Question2" type="radio" name="Question2" id="Question2-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question2-2">2</label>
                                        <input v-model="Question2" type="radio" name="Question2" id="Question2-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question2-1">1</label>
                                        <input v-model="Question2" type="radio" name="Question2" id="Question2-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>3. Participates actively in activities and assignments</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question3-5">5</label>
                                        <input v-model="Question3" type="radio" name="Question3" id="Question3-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question3-4">4</label>
                                        <input v-model="Question3" type="radio" name="Question3" id="Question3-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question3-3">3</label>
                                        <input v-model="Question3" type="radio" name="Question3" id="Question3-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question3-2">2</label>
                                        <input v-model="Question3" type="radio" name="Question3" id="Question3-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question3-1">1</label>
                                        <input v-model="Question3" type="radio" name="Question3" id="Question3-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>4. Willingly works with team members to continuously improve teamwork </p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question4-5">5</label>
                                        <input v-model="Question4" type="radio" name="Question4" id="Question4-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question4-4">4</label>
                                        <input v-model="Question4" type="radio" name="Question4" id="Question4-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question4-3">3</label>
                                        <input v-model="Question4" type="radio" name="Question4" id="Question4-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question4-2">2</label>
                                        <input v-model="Question4" type="radio" name="Question4" id="Question4-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question4-1">1</label>
                                        <input v-model="Question4" type="radio" name="Question4" id="Question4-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>5. Considers feedback and views of members when completing the tasks </p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question5-5">5</label>
                                        <input v-model="Question5" type="radio" name="Question5" id="Question5-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question5-4">4</label>
                                        <input v-model="Question5" type="radio" name="Question5" id="Question5-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question5-3">3</label>
                                        <input v-model="Question5" type="radio" name="Question5" id="Question5-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question5-2">2</label>
                                        <input v-model="Question5" type="radio" name="Question5" id="Question5-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question5-1">1</label>
                                        <input v-model="Question5" type="radio" name="Question5" id="Question5-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-7/12 m-auto flex justify-center mt-8">
                                    <button
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div v-if="IsFormShow === 2">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">COMMUNICATION</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>6. Attentively listens to HTE supervisor and coordinator(s)</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question6-5">5</label>
                                        <input v-model="Question6" type="radio" name="Question6" id="Question6-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question6-4">4</label>
                                        <input v-model="Question6" type="radio" name="Question6" id="Question6-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question6-3">3</label>
                                        <input v-model="Question6" type="radio" name="Question6" id="Question6-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question6-2">2</label>
                                        <input v-model="Question6" type="radio" name="Question6" id="Question6-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question6-1">1</label>
                                        <input v-model="Question6" type="radio" name="Question6" id="Question6-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>7. Comprehends oral and written information</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question7-5">5</label>
                                        <input v-model="Question7" type="radio" name="Question7" id="Question7-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question7-4">4</label>
                                        <input v-model="Question7" type="radio" name="Question7" id="Question7-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question7-3">3</label>
                                        <input v-model="Question7" type="radio" name="Question7" id="Question7-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question7-2">2</label>
                                        <input v-model="Question7" type="radio" name="Question7" id="Question7-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question7-1">1</label>
                                        <input v-model="Question7" type="radio" name="Question7" id="Question7-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>8. Consistently delivers information accurately</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question8-5">5</label>
                                        <input v-model="Question8" type="radio" name="Question8" id="Question8-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question8-4">4</label>
                                        <input v-model="Question8" type="radio" name="Question8" id="Question8-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question8-3">3</label>
                                        <input v-model="Question8" type="radio" name="Question8" id="Question8-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question8-2">2</label>
                                        <input v-model="Question8" type="radio" name="Question8" id="Question8-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question8-1">1</label>
                                        <input v-model="Question8" type="radio" name="Question8" id="Question8-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>9. Reliably provides feedback as required, externally and internally </p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question9-5">5</label>
                                        <input v-model="Question9" type="radio" name="Question9" id="Question9-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question9-4">4</label>
                                        <input v-model="Question9" type="radio" name="Question9" id="Question9-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question9-3">3</label>
                                        <input v-model="Question9" type="radio" name="Question9" id="Question9-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question9-2">2</label>
                                        <input v-model="Question9" type="radio" name="Question9" id="Question9-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question9-1">1</label>
                                        <input v-model="Question9" type="radio" name="Question9" id="Question9-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-5/12 m-auto flex justify-around mt-8">
                                    <button type="button" @click="backForm()"
                                        class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                    <button
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>


                <div v-if="IsFormShow === 3">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">ATTENDANCE AND PUNCTUALITY</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>10. Maintains participation and good attendance</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question10-5">5</label>
                                        <input v-model="Question10" type="radio" name="Question10" id="Question10-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question10-4">4</label>
                                        <input v-model="Question10" type="radio" name="Question10" id="Question10-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question10-3">3</label>
                                        <input v-model="Question10" type="radio" name="Question10" id="Question10-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question10-2">2</label>
                                        <input v-model="Question10" type="radio" name="Question10" id="Question10-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question10-1">1</label>
                                        <input v-model="Question10" type="radio" name="Question10" id="Question10-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>11. Informs supervisor ahead of time if absent or late</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question11-5">5</label>
                                        <input v-model="Question11" type="radio" name="Question11" id="Question11-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question11-4">4</label>
                                        <input v-model="Question11" type="radio" name="Question11" id="Question11-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question11-3">3</label>
                                        <input v-model="Question11" type="radio" name="Question11" id="Question11-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question11-2">2</label>
                                        <input v-model="Question11" type="radio" name="Question11" id="Question11-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question11-1">1</label>
                                        <input v-model="Question11" type="radio" name="Question11" id="Question11-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-5/12 m-auto flex justify-around mt-8">
                                    <button type="button" @click="backForm()"
                                        class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                    <button
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div v-if="IsFormShow === 4">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">PRODUCTIVITY RESILIENCE</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>12. Consistently delivers quality results</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question12-5">5</label>
                                        <input v-model="Question12" type="radio" name="Question12" id="Question12-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question12-4">4</label>
                                        <input v-model="Question12" type="radio" name="Question12" id="Question12-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question12-3">3</label>
                                        <input v-model="Question12" type="radio" name="Question12" id="Question12-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question12-2">2</label>
                                        <input v-model="Question12" type="radio" name="Question12" id="Question12-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question12-1">1</label>
                                        <input v-model="Question12" type="radio" name="Question12" id="Question12-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>13. Meets deadlines and and manages time well</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question13-5">5</label>
                                        <input v-model="Question13" type="radio" name="Question13" id="Question13-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question13-4">4</label>
                                        <input v-model="Question13" type="radio" name="Question13" id="Question13-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question13-3">3</label>
                                        <input v-model="Question13" type="radio" name="Question13" id="Question13-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question13-2">2</label>
                                        <input v-model="Question13" type="radio" name="Question13" id="Question13-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question13-1">1</label>
                                        <input v-model="Question13" type="radio" name="Question13" id="Question13-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>14. Works under pressure and conflicts to accomplish the task at hand</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question14-5">5</label>
                                        <input v-model="Question14" type="radio" name="Question14" id="Question14-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question14-4">4</label>
                                        <input v-model="Question14" type="radio" name="Question14" id="Question14-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question14-3">3</label>
                                        <input v-model="Question14" type="radio" name="Question14" id="Question14-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question14-2">2</label>
                                        <input v-model="Question14" type="radio" name="Question14" id="Question14-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question14-1">1</label>
                                        <input v-model="Question14" type="radio" name="Question14" id="Question14-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-5/12 m-auto flex justify-around mt-8">
                                    <button type="button" @click="backForm()"
                                        class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                    <button
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div v-if="IsFormShow === 5">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">INITIATIVE/PROACTIVITY</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>15. Completes tasks with minimal supervision</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question15-5">5</label>
                                        <input v-model="Question15" type="radio" name="Question15" id="Question15-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question15-4">4</label>
                                        <input v-model="Question15" type="radio" name="Question15" id="Question15-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question15-3">3</label>
                                        <input v-model="Question15" type="radio" name="Question15" id="Question15-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question15-2">2</label>
                                        <input v-model="Question15" type="radio" name="Question15" id="Question15-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question15-1">1</label>
                                        <input v-model="Question15" type="radio" name="Question15" id="Question15-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>16. Completes tasks successively and independently</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question16-5">5</label>
                                        <input v-model="Question16" type="radio" name="Question16" id="Question16-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question16-4">4</label>
                                        <input v-model="Question16" type="radio" name="Question16" id="Question16-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question16-3">3</label>
                                        <input v-model="Question16" type="radio" name="Question16" id="Question16-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question16-2">2</label>
                                        <input v-model="Question16" type="radio" name="Question16" id="Question16-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question16-1">1</label>
                                        <input v-model="Question16" type="radio" name="Question16" id="Question16-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-5/12 m-auto flex justify-around mt-8">
                                    <button type="button" @click="backForm()"
                                        class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                    <button
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>

                <div v-if="IsFormShow === 6">
                    <div class="flex items-center justify-between p-2 border border-gray-300 bg-gray-50">
                        <h3 class="text-md font-bold">DEPENDABILITY/RELIABILITY</h3>
                    </div>
                    <form @submit.prevent="nextForm()">
                        <table class="w-full bg-white border border-gray-300">
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>17. Ably follows through and meet deadlines</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question17-5">5</label>
                                        <input v-model="Question17" type="radio" name="Question17" id="Question17-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question17-4">4</label>
                                        <input v-model="Question17" type="radio" name="Question17" id="Question17-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question17-3">3</label>
                                        <input v-model="Question17" type="radio" name="Question17" id="Question17-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question17-2">2</label>
                                        <input v-model="Question17" type="radio" name="Question17" id="Question17-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question17-1">1</label>
                                        <input v-model="Question17" type="radio" name="Question17" id="Question17-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>18. Takes accountability to his/her actions</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question18-5">5</label>
                                        <input v-model="Question18" type="radio" name="Question18" id="Question18-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question18-4">4</label>
                                        <input v-model="Question18" type="radio" name="Question18" id="Question18-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question18-3">3</label>
                                        <input v-model="Question18" type="radio" name="Question18" id="Question18-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question18-2">2</label>
                                        <input v-model="Question18" type="radio" name="Question18" id="Question18-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question18-1">1</label>
                                        <input v-model="Question18" type="radio" name="Question18" id="Question18-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>19. Adapts effectively to change in the work from home OJT</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question19-5">5</label>
                                        <input v-model="Question19" type="radio" name="Question19" id="Question19-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question19-4">4</label>
                                        <input v-model="Question19" type="radio" name="Question19" id="Question19-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question19-3">3</label>
                                        <input v-model="Question19" type="radio" name="Question19" id="Question19-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question19-2">2</label>
                                        <input v-model="Question19" type="radio" name="Question19" id="Question19-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question19-1">1</label>
                                        <input v-model="Question19" type="radio" name="Question19" id="Question19-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-2 border">
                                    <p>20. Shows consistent level of good performance</p>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question20-5">5</label>
                                        <input v-model="Question20" type="radio" name="Question20" id="Question20-5"
                                            value="5" required>
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question20-4">4</label>
                                        <input v-model="Question20" type="radio" name="Question20" id="Question20-4"
                                            value="4">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question20-3">3</label>
                                        <input v-model="Question20" type="radio" name="Question20" id="Question20-3"
                                            value="3">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question20-2">2</label>
                                        <input v-model="Question20" type="radio" name="Question20" id="Question20-2"
                                            value="2">
                                    </div>
                                </td>
                                <td class="px-2 py-2">
                                    <div class="flex flex-col text-center items-center">
                                        <label for="Question20-1">1</label>
                                        <input v-model="Question20" type="radio" name="Question20" id="Question20-1"
                                            value="1">
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <div class="w-12/12 m-auto flex justify-between">
                            <div class="w-9/12 m-auto pt-2 flex flex-col items-center">
                                <h1 class="font-semibold p-1">Remarks/Comments:</h1>
                                <textarea v-model="comment"
                                    class=" border border-gray-300 w-8/12 p-2 bg-zinc-100 rounded-md" rows="5" cols="32"
                                    name="comment" id="comment" placeholder="Enter your comment here..."></textarea>
                            </div>
                        </div>

                        <section>
                            <div class="w-12/12 m-auto flex justify-between mt-2 mb-5">
                                <div class="w-5/12 m-auto flex justify-around mt-8">
                                    <button type="button" @click="backForm()"
                                        class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                    <button
                                    @click="resultBtn()"
                                        class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Next</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
            <div v-if="IsFormShow === 7">
                    <div class="w-full m-auto">
                        <table class="w-full m-auto bg-white border border-gray text-xs">
                            <tr class="border border-gray00">
                                <th class="px-4 py-2 border border-gray-300">Raw Score</th>
                                <th class="px-4 py-2 border border-gray-300">Equivalent Rating</th>
                                <th class="px-4 py-2 border border-gray-300">Verbal Interpretation</th>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 border border-gray-300">90-100</td>
                                <td class="px-4 py-2 border border-gray-300">96-100</td>
                                <td class="px-4 py-2 border border-gray-300">Outstanding</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 border border-gray-300">80-89</td>
                                <td class="px-4 py-2 border border-gray-300">91-95</td>
                                <td class="px-4 py-2 border border-gray-300">Very Satisfactory</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 border border-gray-300">70-79</td>
                                <td class="px-4 py-2 border border-gray-300">86-90</td>
                                <td class="px-4 py-2 border border-gray-300">Satisfactory</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 border border-gray-300">60-69</td>
                                <td class="px-4 py-2 border border-gray-300">71-85</td>
                                <td class="px-4 py-2 border border-gray-300">Fair</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 border border-gray-300">50-59</td>
                                <td class="px-4 py-2 border border-gray-300">50-70</td>
                                <td class="px-4 py-2 border border-gray-300">Needs Improvement</td>
                            </tr>
                        </table>
                    </div>

                    <div class="w-full flex justify-end mt-5">
                        <div class="w-2/12 text-center bg-gray-50 border border-gray-300 p-4 mr-5">
                            <p>Total Score: {{ result[0].score }}</p>
                        </div>
                        <div class="w-2/12 text-center bg-gray-50 border border-gray-300 p-4 mr-5">
                            <p> {{ result[0].rating }}</p>
                        </div>
                    </div>

                    <section>
                        <div class="w-full flex justify-end mt-4 mb-5">
                            <div class="w-3/12 flex justify-between mt-8 mr-5">
                                <button type="button" @click="backForm()"
                                    class="p-3 bg-red-400 rounded-md px-6 font-semibold text-white">Back</button>
                                <button class="p-3 bg-green-400 rounded-md px-6 font-semibold text-white">Submit</button>
                            </div>
                        </div>
                    </section>
                </div>

        </div>
    </div>
</template>