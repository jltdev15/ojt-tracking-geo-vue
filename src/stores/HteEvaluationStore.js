import { reactive, toRefs } from "vue";


const formStore = reactive({
    IsFormShow: 1,
    result: [{
        score: null,
        rating: null,
        comment: null,
    }],
})

export function useForm() {

    const nextForm = async () => {
        if (formStore.IsFormShow < 7) {
            formStore.IsFormShow++
        }
        else {
            console.log("limit reach");
        }

    }
    const backForm = async () => {
        if (formStore.IsFormShow > 1) {
            formStore.IsFormShow--
        }
        else {
            console.log('too low');
        }
    }

    const resultForm = async (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, comment) => {

        const score = Number(q1) + Number(q2) + Number(q3) + Number(q4) + Number(q5) +
            Number(q6) + Number(q7) + Number(q8) + Number(q9) + Number(q10) +
            Number(q11) + Number(q12) + Number(q13) + Number(q14) + Number(q15) +
            Number(q16) + Number(q17) + Number(q18) + Number(q19) + Number(q20);

        if (score <= 100 && score >= 90) {
            formStore.result[0].score = score;
            formStore.result[0].rating = "Outstanding";
            return formStore.result[0].comment = comment;
        }
        if (score <= 89 && score >= 80) {
            formStore.result[0].score = score;
            formStore.result[0].rating = "Very Satisfactory";
            return formStore.result[0].comment = comment;
        }
        if (score <= 79 && score >= 70) {
            formStore.result[0].score = score;
            formStore.result[0].rating = "Satisfactory";
            return formStore.result[0].comment = comment;
        }
        if (score <= 69 && score >= 60) {
            formStore.result[0].score = score;
            formStore.result[0].rating = "Fair";
            return formStore.result[0].comment = comment;
        }
        if (score <= 59 || score >= 50) {
            formStore.result[0].score = score;
            formStore.result[0].rating = "Needs Improvement";
            return formStore.result[0].comment = comment;
        }

    }

    return {
        ...toRefs(formStore),
        nextForm,
        backForm,
        resultForm,
    }
}