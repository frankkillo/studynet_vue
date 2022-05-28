<template>
    <article class="media box">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{ comment.created_by }}</strong> , {{ getTime(comment.created_at) }}<br>
                        {{ comment.content }}
                </p>
            </div>
        </div>
    </article>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        initializeComment: Object
    },
    data () {
        return {
            comment: this.initializeComment
        }
    },
    methods: {
        getTime (time) {
            return moment(time).fromNow()
        }
    }
}
</script>