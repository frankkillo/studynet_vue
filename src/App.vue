<template>
  <div class="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main naviation" style="min-height: 5rem;">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-4" to="/">StudyNet</router-link>
        </div>
        <div id="navbar-item" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/about" class="navbar-item is-size-6">About</router-link>
            <router-link to="/courses" class="navbar-item is-size-6">Courses</router-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <template v-if="!$store.state.isAuthenticated">
                  <router-link to="/sign-up" class="button is-white"><strong>Sign up</strong></router-link>
                  <router-link to="/log-in" class="button is-light">Log in</router-link>
                </template>
                <template v-else>
                  <router-link to="/dashboard/my-account" class="button is-dark">My account</router-link>
                </template>
              </div>
            </div>
          </div>
        </div>
    </nav>

    <router-view/>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2022</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';
</style>
