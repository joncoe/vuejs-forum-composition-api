<script setup>
import {defineProps, defineOptions, useAttrs} from 'vue';
const attrs = useAttrs()

defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' }
})

defineOptions({
  inheritAttrs: false,
})


</script>

<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <VeeField
      :name="name"
      :label="label"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :id="name"
      class="form-input"
      v-bind="attrs"
    />
    <VeeErrorMessage :name="name" class="form-error" />
  </div>
</template>
