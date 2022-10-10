<template>
  <div class="ticketHolder-card m-3">
    <img :title="ticketHolder.profile.name" class="ticketHolder" :src="ticketHolder.profile.picture"
      :alt="ticketHolder.profile.name">

  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { TicketHolder } from '../models/TicketHolder.js';

export default {
  props: {
    ticketHolder: {
      type: Object,
      required: true

    }
  },
  setup() {
    return {
      // ticketHolder: computed(() => AppState.ticketHolders)
    }
  }
}
</script>


<style lang="scss" scoped>
.ticketHolder-card {

  height: 10vh;
}

.ticketHolder {
  border-radius: 50%;
  height: 8vh;
}
</style>