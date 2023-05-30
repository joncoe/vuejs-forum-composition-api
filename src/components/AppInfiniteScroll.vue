<script setup>
import {defineProps, onMounted, onBeforeUnmount, reactive, ref, watch, defineEmits} from 'vue';

const props = defineProps({
  done: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load'])

const observerElement = ref(null);
const scrollObserver = reactive({
  theEye: null
});


onMounted(() => {
  scrollObserver.theEye = new IntersectionObserver((entries, observe) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) emit('load')
    })
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  })
  scrollObserver.theEye.observe(observerElement.value)
})

onBeforeUnmount(() => {
  scrollObserver.theEye.unobserve(observerElement.value)
})

watch(props.done, ()=> {
  if (props.done) scrollObserver.theEye.unobserve(observerElement.value)
})


</script>

<template>
  <div class="intersection-observer" ref="observerElement"></div>
</template>

<style scoped>
  div{
    position:relative;
    z-index:-1;
    pointer-events:none;
    bottom: 200px;
  }
</style>
