<template>
    <div class="page-courses">
        <div class="hero is-dark">
            <div class="hero-body has-text-centered">
                <h1 class="title">{{ course.title }}</h1>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div class="columns content">
                    <div class="column is-2">
                        <h2>Tables of content</h2>
                        <ul>
                            <li
                                v-for="lesson in lessons"
                                v-bind:key="lesson.title"
                            >
                                <a @click="setActiveLesson(lesson)">
                                    {{ lesson.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="column is-10">
                        <template v-if="$store.state.isAuthenticated">
                            <template v-if="activeLesson">
                                <h2>{{ activeLesson.title }}</h2>
                                <span class="tag is-warning" v-if="activity.status == 'started'" @click="markAsDone">Started (click to mark as done)</span>
                                <span class="tag is-success" v-else>Done</span>
                                <hr>
                                {{ activeLesson.long_description }}
                                <hr>
                                <template v-if="activeLesson.type == 'video'">
                                    <Video
                                        v-bind:youtube_id="activeLesson.youtube_id" />
                                </template>
                                <template v-if="activeLesson.type == 'quiz'">
                                    <QuizItem
                                        v-bind:quiz="quiz"
                                        v-on:submitQuiz="markAsDone"
                                    />
                                </template>
                                <template v-else>
                                    <CommentItem
                                        class="media box"
                                        v-for="comment in comments"
                                        v-bind:key="comment.id"
                                        v-bind:initializeComment="comment" />
                                    <AddComment
                                        v-bind:course="course"
                                        v-bind:activeLesson="activeLesson"
                                        v-on:submitComment="newComment" />
                                </template>
                            </template>
                            <template v-else>
                                {{ course.long_description }}
                            </template>
                        </template>
                        <template v-else>
                            <h2>Restricted access</h2>

                            <p>You need to have an account to be continue!</p>
                        </template>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import CommentItem from '@/components/CommentItem'
import AddComment from '@/components/AddComment'
import QuizItem from '@/components/QuizItem'
import Video from '@/components/Video'

export default {
    name: 'Course',
    data () {
        return {
            course: {},
            lessons: [],
            comments: [],
            quiz: {},
            activeLesson: null,
            activity: {}
        }
    },
    components: {
        CommentItem,
        AddComment,
        QuizItem,
        Video
    },
    mounted () {
        this.getCourse()
    },
    methods: {
        getCourse () {
            const slug = this.$route.params.slug

            axios
                .get(`/api/v1/courses/${slug}`)
                .then(response => {
                    this.course = response.data.course
                    this.lessons = response.data.lessons
                    document.title = response.data.course.title + ' | StudyNet'
                })
                .catch(error => {
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                    console.log(JSON.stringify(error))
                })
        },
        newComment (comment) {
            this.comments.splice(0, 0, comment)
        },
        setActiveLesson (lesson) {
            this.activeLesson = lesson
            if (this.$store.state.token) {
                if (this.activeLesson.type === 'quiz') {
                    this.getQuiz()
                    this.comments = []
                } else {
                    this.getComments()
                }
                this.activityStarted()
            }   
        },
        activityStarted () {
            const activityData = {
                course_slug: this.course.slug,
                lesson_slug: this.activeLesson.slug
            }

            axios
                .post('/api/v1/activities/activity-started/', activityData)
                .then(response => {
                    this.activity = response.data
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        markAsDone () {
            const activityData = {
                course_slug: this.course.slug,
                lesson_slug: this.activeLesson.slug
            }

            axios
                .post('/api/v1/activities/mark-as-done/', activityData)
                .then(response => {
                    this.activity = response.data
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        getQuiz () {
            axios
                .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/quiz/`)
                .then(response => {
                    this.quiz = response.data
                })
                .catch(error => {
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                    console.log(JSON.stringify(error))
                })
        },
        getComments () {
            axios
                .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/comments/`)
                .then(response => {
                    this.comments = response.data
                })
                .catch(error => {
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>