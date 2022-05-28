<template>
        <form @submit.prevent="submitComment">
            <hr>
            <div class="field mt-3">
                <label>Comment</label>
                <div class="control">
                    <textarea class="textarea" v-model="comment.content"></textarea>
                </div>
            </div>
            <div class="notification is-danger" v-if="validError">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-dark">Sumbit</button>
                </div>
            </div>
        </form>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
    props: {
        course: Object,
        activeLesson: Object,
    },
    data () {
        return {
            comment: {
                content: ''
            },
            errors: [],
            lesson: {}
        }
    },
    methods: {
        submitComment () {
            this.lesson = this.activeLesson
            this.errors = []

            if (this.comment.content !== '') {
            axios
                .post(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/`, this.comment)
                .then(response => {    
                    this.comment.content = ''
                    
                    this.$emit('submitComment', response.data)
                    toast({
                        message: 'The comment was added!',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                        })
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again.')
                    console.log(JSON.stringify(error))
                })
            } else {
                this.errors.push('The content is missing!')
            }
        }
    },
    computed: {
        validError () {
            return this.activeLesson === this.lesson && this.errors.length !== 0
        }
    }
}
</script>