<template>
    <div class="page-courses">
        <div class="hero is-dark">
            <div class="hero-body has-text-centered">
                <h1 class="title">Courses</h1>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-2">
                        <aside class="menu">
                            <p class="menu-label">Categories</p>
                            <ul class="menu-list">
                                <li>
                                    <a 
                                        v-bind:class="{'is-active': activeCategory.id === 0}"
                                        @click="setActiveCategory({id: 0})"
                                    >
                                        All courses
                                    </a>
                                </li>
                                <li
                                    v-for="category in categories"
                                    v-bind:key="category.id"
                                >
                                    <a
                                        v-bind:class="{'is-active': activeCategory.id === category.id }"
                                        @click="setActiveCategory(category)"
                                    >
                                        {{ category.title }}
                                    </a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div class="column is-10">
                        <div class="columns is-multiline">
                            <div class="column is-4"
                                v-for="course in courses"
                                v-bind:key="course.id"
                            >
                                <CourseItem v-bind:course="course" />
                            </div>
                        </div>
                        <div class="column is-12">
                            <nav class="pagination">
                                <router-link to="#" class="pagination-previous">Previous</router-link>
                                <router-link to="#" class="pagination-next">Next page</router-link>
                                <ul class="pagination-list">
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import CourseItem from '@/components/CourseItem'

export default {
    name: 'Courses',
    data () {
        return {
            courses: [],
            categories: [],
            activeCategory: {
                id: 0
            },
        }
    },
    components: {
        CourseItem
    },
    mounted () {
        document.title = 'Courses | StudyNet'
        this.getCourses()
        this.getCategories()
    },
    methods: {
        getCourses () {
            let url = '/api/v1/courses/'

            if (this.activeCategory.id !== 0) {
                url += '?category_id=' + this.activeCategory.id
            }

            axios
                .get(url)
                .then(response => {
                    this.courses = response.data
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })
        },
        getCategories () {
            axios
                .get('/api/v1/courses/categories/')
                .then(response => {
                    this.categories = response.data
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })
        },
        setActiveCategory (item) {
            this.activeCategory = item

            this.getCourses()
        }
    }
}
</script>

<style scoped>
    .menu-list a.is-active {
        background-color: rgb(43, 37, 37);
    }
</style>