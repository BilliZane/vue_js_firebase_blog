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
        <div
          title="Click to delete"
          v-for="tag in tags"
          :key="tag"
          class="pill"
          @click="deleteTag(tag)"
        >
          #{{ tag }}
          <span v-if="closeBtn"> &#215; </span>
        </div>
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
import {projectFirestore, timestamp} from '@/firebase/config'
import Spinner from '@/components/Spinner'
export default {
  components: {Spinner},
  setup() {
    const router = useRouter()
    const showSpinner = ref(false)

    const closeBtn = true
    const title = ref('')
    const body = ref('')
    const tags = ref([])
    const tag = ref('')

    const handleKeydown = () => {
      if (tag.value.length < 3) {
        alert('Minimum 3 characters.')
        return
      }
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g, '') // remove all whitespace
        tags.value.push(tag.value.toLowerCase())
      }
      tag.value = ''
    }

    const handleSubmit = () => {
      if (!tags.value.length) {
        alert('Please enter at least one tag.')
        return
      }
      const uploadPost = async () => {
        const post = {
          title: title.value,
          body: body.value,
          tags: tags.value,
          createdAt: timestamp(),
        }

        await projectFirestore.collection('posts').add(post)
      }
      showSpinner.value = true
      uploadPost()
      setTimeout(() => {
        router.push({name: 'Home'})
      }, 500)
    }

    const deleteTag = (tag) => {
      tags.value.splice(tags.value.indexOf(tag), 1)
    }

    return {
      closeBtn,
      showSpinner,
      body,
      title,
      tags,
      tag,
      handleKeydown,
      handleSubmit,
      deleteTag,
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
  &:hover {
    cursor: pointer;
  }
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
</style>