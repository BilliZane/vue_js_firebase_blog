<template>
  <div class="tag-cloud">
    <div v-for="tag in filteredTags" :key="tag">
      <router-link :to="{name: 'Tag', params: {tag: tag}}">{{
        tag
      }}</router-link>
    </div>
  </div>
</template>
<script>
import {computed} from 'vue'
export default {
  props: ['posts'],

  setup(props) {
    const tags = computed(() =>
      props.posts
        .map((x) => x.tags)
        .join(',')
        .split(',')
    )

    const filteredTags = computed(() =>
      tags.value.filter((item, index) => tags.value.indexOf(item) === index)
    )

    return {
      tags,
      filteredTags,
    }
  },
}
</script>

<style>
.tag-cloud h3 {
  border-bottom: 1px solid #eee;
  padding: 16px 8px;
  color: #444;
}
.tag-cloud div {
  display: inline-block;
  padding: 10px;
}
.tag-cloud a {
  color: #ccc;
  text-decoration: none;
}
.tag-cloud a.router-link-active {
  color: #ff8800;
  font-weight: bold;
}
</style>