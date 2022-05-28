<template>
  <div class="home">
    <div class="hero is-dark is-medium">
      <div class="hero-body has-text-centered">
        <h1 class="title">Welcome to StudyNet</h1>
        <p class="subtitle">An online place for learning what you want</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-dark"><i class="far fa-clock"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Study at your own place</h2>
              <p>This is just some random placeholder text</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-dark"><i class="far fa-comments"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Study with others</h2>
              <p>This is just some random placeholder text</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-dark"><i class="far fa-home"></i></span>
              <h2 class="is-size-4 mt-4 mb-4">Study from your home</h2>
              <p>This is just some random placeholder text</p>
            </div>
          </div>
          <div class="column is-12 has-text-centered" v-if="!$store.state.isAuthenticated">
            <router-link to="/sign-up" class="button is-dark is-size-4 mt-4 mb-4">Click to get started</router-link>
          </div>
          <div 
            class="column is-3 mt-5"
            v-for="course in courses"
            v-bind:key="course.id"
          >
            <CourseItem v-bind:course="course" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import CourseItem from '@/components/CourseItem'

export default {
  name: 'HomeView',
  data () {
    return {
      courses: []
    }
  },
  components: {
    CourseItem
  },
  mounted () {
    this.getFrontCourses()
    document.title = 'Home | StudyNet'    
  },
  methods: {
    getFrontCourses () {
      axios
        .get('api/v1/courses/front-courses/')
        .then(response => {
          this.courses = response.data
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
    }
  }
}
</script>
