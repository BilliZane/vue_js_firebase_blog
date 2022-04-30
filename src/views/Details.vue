<template>
  <div class="post" v-if="post">
    <div class="post__title">{{ post.id }}. {{ post.title }}</div>
    <div class="post__body">{{ post.body }}</div>
    <div class="post__tags">
      <span class="post__tag" v-for="tag in post.tags" :key="tag"
        >#{{ tag }}
      </span>
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>
<script>
import getPost from '@/composables/getPost'
import Spinner from '@/components/Spinner'
import {useRoute} from 'vue-router'
export default {
  props: ['id'],
  components: {Spinner},

  setup(props) {
    const route = useRoute()
    const {post, error, load} = getPost(route.params.id)
    load()

    return {
      post,
      error,
      load,
    }
  },
}
</script>

<style lang="css">
</style> 