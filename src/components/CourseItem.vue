<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <template v-if="course.image.full_size">
                    <img v-bind:src="course.image.full_size" alt="Placeholder image">
                </template>
                <template v-else>
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </template>
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="is-size-5">{{course.title}}</p>
                </div>
            </div>
            <div class="content">
                <p>{{ course.short_description }}</p>
                <router-link :to="{ name: 'Course', params: { slug: course.slug } }">More</router-link>
                <br>
                <p class="is-left has-text-grey">{{ course.get_formatted_data }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseItem',
    props: {
        course: Object
    }
}
</script>