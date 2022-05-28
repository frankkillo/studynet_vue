<template>
  <div class="about">
    <div class="hero is-dark">
      <div class="hero-body has-text-centered">
        <h1 class="title">About</h1>
      </div>
    </div>
    <section class="section">
      <p>This is an about page</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  mounted () {
    document.title = 'About | StudyNet'
  },
}
</script>
