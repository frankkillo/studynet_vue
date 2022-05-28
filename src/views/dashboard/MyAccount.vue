<template>
    <div class="page-my-account">
        <div class="hero is-dark">
            <div class="hero-body has-text-centered">
                <h1 class="title">My account</h1>
            </div>
        </div>
        <section class="section">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h2 class="subtitle is-size-3">My active courses</h2>
                </div>
                <div
                    class="column is-4"
                    v-for="course in courses"
                    v-bind:key="course.id"
                >
                    <CourseItem
                        v-bind:course="course" 
                    />
                </div>
            </div>
            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import CourseItem from '@/components/CourseItem'

export default {
    name: 'MyAccount',
    data () {
        return {
            courses: []
        }
    },
    components: {
        CourseItem
    },
    mounted () {
        document.title = 'MyAccount | StudyNet'

        axios
            .get('/api/v1/activities/get-active-courses/')
            .then(response => {
                this.courses = response.data
            })
            .catch(error => {
                console.log(JSON.stringify(error))
            })
    },
    methods: {
        async logout () {
            const token = this.$store.state.token

            await axios
                .post('/api/v1/token/logout/', token)

            axios.defaults.headers.common["Authorization"] = ""
            this.$store.commit('removeToken')
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('user_id')

            this.$router.push('/')
        }
    }
}
</script>