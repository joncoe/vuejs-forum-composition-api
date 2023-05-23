<script setup>
import {defineEmits, reactive, defineProps, computed} from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

const form = reactive({
  title: props.title,
  text: props.text
})

const emit = defineEmits(['save', 'cancel']);

const save = () => {
  emit('save', {...form})
}
const cancel = () => {
  emit('cancel')
}

const existing = computed(() => {
  return !!props.title;
})

</script>
<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title">
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea v-model="form.text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{existing ? 'Update' : 'Publish'}}</button>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
