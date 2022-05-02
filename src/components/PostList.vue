<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.id">
      <SinglePost
        :post="post"
        :showSnippet="showSnippet"
        :showButtons="showButtons"
        @delete-post="deletePost"
      />
    </div>
  </div>
</template>
<script>
import SinglePost from '@/components/SinglePost'
export default {
  props: ['posts', 'showSnippet', 'showButtons'],
  components: {SinglePost},

  setup(props, context) {
    const deletePost = (id) => {
      context.emit('delete-post', id)
    }
    return {
      deletePost,
    }
  },
}
</script>

<style>
</style>