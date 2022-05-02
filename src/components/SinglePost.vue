<template>
  <div class="post">
    <div class="post__title">{{ post.title }}</div>
    <div class="post__body">{{ showSnippet ? snippet : post.body }}</div>
    <div class="post__bottom">
      <div class="post__tags">
        <router-link
          v-for="tag in post.tags"
          :key="tag"
          class="post__tag"
          :to="{name: 'Tag', params: {tag: tag}}"
          >{{ tag }}</router-link
        >
      </div>
      <div class="post__btn-wrap" v-if="showButtons">
        <router-link
          class="post__btn"
          :to="{name: 'Details', params: {id: post.id}}"
          >Read
        </router-link>
        <a class="post__btn" @click="deletePost(post.id)">Delete</a>
      </div>
    </div>
  </div>
</template>
<script>
import {computed} from 'vue'
export default {
  props: ['post','showSnippet','showButtons'],
  emits: ['delete-post'],
  setup(props, context) {
    const snippet = computed(() => props.post.body.substring(0, 100) + '...')

    const deletePost = (id) => {
      context.emit('delete-post', id)
    }

    return {
      snippet,
      deletePost,
    }
  },
}
</script>

<style lang="scss">
.post {
  margin-bottom: 10px;
  padding: 15px;
  background: #cfe8f1;
  border-radius: 5px;
  letter-spacing: 1px;
  line-height: 20px;
  &__title {
    font-weight: 600;
    padding-bottom: 15px;
  }
  &__body {
    text-align: left;
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 0 0;
  }
  &__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    max-width: 500px;
    padding: 10px;
  }
  &__tag {
    background: #0c495f;
    color: #fff;
    padding: 5px 10px;
    margin: 2px 0;
    border-radius: 3px;
    margin-right: 6px;
    text-decoration: none;
    transition: background 400ms;
    &:hover {
      cursor: pointer;
      background: #115f7c;
    }
  }
  &__btn {
    display: inline-block;
    text-decoration: none;
    outline: none;
    background: #15857b;
    color: #fff;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 2px;
    border-radius: 3px;
    transition: background 400ms;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
      background: rgb(55, 158, 112);
    }
  }
  &__btn-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-wrap: wrap;
  }
}
</style>