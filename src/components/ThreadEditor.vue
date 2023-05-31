<script setup>
import {defineEmits, reactive, defineProps, computed, watch} from 'vue'

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

const emit = defineEmits(['save', 'cancel', 'dirty', 'clean']);

const save = () => {
  emit('clean');
  emit('save', {...form})
}
const cancel = () => {
  emit('cancel')
}

const existing = computed(() => {
  return !!props.title;
})

watch( () =>
  form,
  () => {
    if (form.title !== props.title || form.text !== props.text) {
      emit('dirty')
    } else {
      emit('clean')
    }
  },
  {deep: true}
)

</script>
<template>
  <VeeForm @submit="save">
    <AppFormField label="Title" name="title" v-model="form.title" rules="required" />
    <AppFormField as="textarea" label="Content" name="text" v-model="form.text" rules="required" rows="8" cols="140" />

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{existing ? 'Update' : 'Publish'}}</button>
    </div>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
