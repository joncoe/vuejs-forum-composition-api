<script setup >
import {defineEmits} from 'vue';
import { arrayRandom } from '@/helpers'

const emit = defineEmits(['hit'])

const getRandomImage = async () => {
  const searchTerms = [
    'cats',
    'dogs',
    'abstract',
    'cars',
    'mountains',
    'beach',
    'landscape',
    'object',
    'food',
    'flowers',
    'architecture',
    'yellow',
    'green',
    'blue',
    'orange',
    'black',
    'white',
    'brown',
    'red',
    'patterns',
    'animal',
    'code',
    'space'
  ]
  const randomWord = arrayRandom(searchTerms)
  const res = await fetch(`https://pixabay.com/api/?key=36880629-bb7e2f05b3c94afeb224feea1&q=${randomWord}`)
  const data = await res.json()
  const randomImage = arrayRandom(data.hits)
  emit('hit', randomImage.webformatURL)
}
</script>


<template>
  <div class="text-center" style="margin-bottom:15px;">
    <button class="btn-green btn-xsmall" @click.prevent="getRandomImage">
      Random Avatar
    </button>
    <br>
    <small style="opacity: .5">Powered by <a href="https://pixabay.com">Pixabay</a></small>
  </div>
</template>
