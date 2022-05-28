<template>
    <div>
        <h3>{{ quiz.question }}</h3>
        <div class="control">
            <label class="radio">
                <input type="radio" :value="quiz.ops_1" v-model="selectedAnswer"> {{ quiz.ops_1 }}
            </label>
        </div>
        <div class="control mt-2">
            <label class="radio">
                <input type="radio" :value="quiz.ops_2" v-model="selectedAnswer"> {{ quiz.ops_2 }}
            </label>
        </div>
        <div class="control mt-2">
            <label class="radio">
                <input type="radio" :value="quiz.ops_3" v-model="selectedAnswer"> {{ quiz.ops_3 }}
            </label>
        </div>
        <div class="control mt-5" v-if="quizResult != 'correct'">
            <button class="button is-dark" @click="submitQuiz">Submit</button>                                 
        </div>
        <template v-if="quizResult == 'correct'">
            <div class="notification is-success mt-4">Correct !</div>
        </template>
        <template v-if="quizResult == 'incorrect'">
            <div class="notification is-danger mt-4">Wrong :( Please try again.</div>
        </template>
    </div>
</template>

<script>
import {toast} from 'bulma-toast'

export default {
    props: ['quiz'],
    data () {
        return {
            selectedAnswer: null,
            quizResult: null
        }
    },
    methods: {
        submitQuiz () {
            this.quizResult = null

            if (this.selectedAnswer) {
                if (this.selectedAnswer === this.quiz.answer) {
                    this.quizResult = 'correct'
                } else {
                    this.quizResult = 'incorrect'
                }
            } else {
                toast({
                    message: 'Select answer first',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            }
        }
    }
}
</script>