<template>
  <div class="home">
    <h1 class="home__title">Home</h1>
    <div class="home__error" v-if="error">{{ error }}</div>
    <div class="home__posts-wrap layout" v-if="posts.length">
      <TagCloud :posts="posts" />
      <PostList :posts="posts" @delete-post="deletePost" />
    </div>
    <div class="home__loading" v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import getPosts from '@/composables/getPosts'
import Spinner from '@/components/Spinner'
import TagCloud from '@/components/TagCloud'

export default {
  components: {PostList, Spinner, TagCloud},
  setup() {
    const {posts, error, load} = getPosts()

    load()

    const deletePost = (id) => {
      const message = confirm('Do you really want to delete this post?')

      if (message) {
        const target = posts.value.find((x) => x.id === id)
        posts.value.splice(posts.value.indexOf(target), 1)
        const deleteFromServer = async () => {
          const url = 'http://localhost:3000/posts/' + id

          await fetch(url, {
            method: 'DELETE',
          })
        }
        deleteFromServer()
      }
    }

    return {
      posts,
      error,
      load,
      deletePost,
    }
  },
}
</script>
 <style lang="scss">
.home {
  &__title {
    text-align: center;
  }
  &__loading {
    text-align: center;
  }
}
</style>

