<script setup>
import { defineProps, computed } from 'vue'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const props = defineProps({
  timestamp: {
    type: [String, Object],
    required: true
  }
})

const normalizedTimestamp = computed(() => {
  console.log(props.timestamp)
  return props.timestamp?.seconds || props.timestamp
})

const diffForHumans = computed(() => {
  return dayjs.unix(normalizedTimestamp.value).fromNow();
})

const humanFriendlyDate = computed(() => {
  return dayjs.unix(normalizedTimestamp.value).format('llll');
})



</script>

<template>
  <span :title="humanFriendlyDate">{{ diffForHumans }} 🗓️</span>
</template>



<style lang="scss" scoped>

</style>
