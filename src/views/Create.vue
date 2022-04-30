<template>
  <div class="create" v-if="!showSpinner">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required />
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <label>Tags (hit enter to add a tag):</label>
      <input @keydown.enter.prevent="handleKeydown" v-model="tag" type="text" />
      <div class="tags">
        <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      </div>
      <button class="create__btn">Add Post</button>
    </form>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import Spinner from '@/components/Spinner'
export default {
  components: {Spinner},
  setup() {
    const router = useRouter()
    console.log(router)
    const showSpinner = ref(false)

    const title = ref('')
    const body = ref('')
    const tags = ref([])
    const tag = ref('')
    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, '') // remove all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleSubmit = () => {
      const uploadPost = async () => {
        const post = {
          title: title.value,
          body: body.value,
          tags: tags.value,
        }

        await fetch('http://localhost:3000/posts', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
      showSpinner.value = true
      uploadPost()
      setTimeout(() => {
        router.push({name: 'Home'})
      }, 500)
    }

    return {
      showSpinner,
      body,
      title,
      tags,
      tag,
      handleKeydown,
      handleSubmit,
    }
  },
}
</script>

<style lang="scss">
.create {
  width: 100%;
  &__btn {
    text-decoration: none;
    outline: none;
    background: #15857b;
    color: #fff;
    padding: 6px 10px;
    border-radius: 3px;
    transition: background 400ms;
    &:hover {
      cursor: pointer;
      background: rgb(55, 158, 112);
    }
  }
}
form {
  margin: 0 auto;
  text-align: left;
  min-width: 100%;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  min-width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid rgb(211, 211, 211);
  border-radius: 3px;
  outline: none;
}
textarea {
  height: 160px;
}
label {
  display: inline-block;
  margin-top: 30px;
  position: relative;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}
label::before {
  content: '';
  display: block;
  width: 100%;
  height: 120%;
  background: #0c495f;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -15px;
  top: -3px;
  transform: rotateZ(-1.1deg);
}
button {
  display: block;
  margin-top: 30px;
  background: #0c495f;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 18px;
}
.pill {
  background: #0c495f;
  color: #fff;
  padding: 5px 10px;
  margin: 2px 0;
  border-radius: 3px;
  margin-right: 6px;
  transition: background 400ms;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>