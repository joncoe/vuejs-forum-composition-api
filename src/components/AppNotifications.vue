<script setup>
import useNotifications from '@/composables/useNotifications'
const { notifications, removeNotification } = useNotifications()

</script>

<template>
  <div class="notifications">
    <div
      class="notification"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <span>{{ notification.message }}</span>
      <button @click="removeNotification(notification.id)">✖️</button>
    </div>
  </div>
</template>

<style scoped>
  .notifications {
  position: fixed;
  bottom: 20px;
  right: 0;
}
.notification {
  background: white;
  display: flex;
  justify-content: space-between;
  width: 350px;
  filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.32));
  padding: 10px 20px;
  margin-bottom: 5px;
  border-left: 5px solid #263959;
}
button:hover {
  transform: scale(1.5);
  transition: all .2s linear;

}
</style>
