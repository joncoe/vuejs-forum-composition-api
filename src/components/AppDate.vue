<script setup>
import { defineProps } from 'vue'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

defineProps({
  timestamp: {
    type: String,
    required: true
  }
})

const diffForHumans = (timestamp) => {
  return dayjs.unix(timestamp).fromNow();
}

const humanFriendlyDate = (timestamp) => {
  return dayjs.unix(timestamp).format('llll');
}

</script>

<template>
  <span :title="humanFriendlyDate(timestamp)">{{ diffForHumans(timestamp) }} 🗓️</span>
</template>



<style lang="scss" scoped>

</style>
