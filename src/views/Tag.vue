<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="posts.length">
    <TagCloud :posts="posts" />
    <PostList :posts="postsWithTag" :showSnippet="true" :showButtons="false" />
  </div>
  <div v-else>
    <Spinner />
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import getPosts from '@/composables/getPosts'
import PostList from '@/components/PostList'
import Spinner from '@/components/Spinner'
import TagCloud from '@/components/TagCloud'

export default {
  props: ['tag'],
  components: {PostList, Spinner, TagCloud},
  setup() {
    const {posts, error, load} = getPosts()
    const route = useRoute()

    load()

    const postsWithTag = computed(() =>
      posts.value.filter((x) => x.tags.includes(route.params.tag))
    )

    return {
      posts,
      error,
      load,
      postsWithTag,
    }
  },
}
</script>

<style>
</style>