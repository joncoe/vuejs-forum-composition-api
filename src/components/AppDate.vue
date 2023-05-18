<script setup>
import { defineProps, computed } from 'vue'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const props = defineProps({
  timestamp: {
    type: String,
    required: true
  }
})

const diffForHumans = computed(() => {
  return dayjs.unix(props.timestamp).fromNow();
})

const humanFriendlyDate = computed(() => {
  return dayjs.unix(props.timestamp).format('llll');
})

</script>

<template>
  <span :title="humanFriendlyDate">{{ diffForHumans }} 🗓️</span>
</template>



<style lang="scss" scoped>

</style>
