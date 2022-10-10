<template>
  <div class="ticket-card d-flex mb-4 container-fluid">
    <img class="img-fluid ticket-img" :src="event.coverImg" :alt="event.name">
    <div class="flex-column w-50 p-3">

      <h5 class="py-1">{{event.name}}</h5>
      <p class="py-1">{{event.location}}</p>
      <div class="d-flex justify-content-between">
        <p class="py-1">{{event.startDate}}</p>
        <button aria-label="Cancel ticket" class="btn btn-secondary" @click="removeTicket">not going</button>
      </div>
    </div>

    <div class="circle"></div>

  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    event: {
      type: Object,
      required: true
    },

  },
  setup() {
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      async removeTicket() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel your ticket?')
          if (!yes) { return }
          debugger
          const ticketHolder = AppState.myTickets.find(m => m.accountId == AppState.account.id)
          await eventsService.removeTicket(ticketHolder.id)
          Pop.success('Your ticket has been partially refunded')
        } catch (error) {
          Pop.error(error, '[removeTicket]')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket-card {
  background-color: #474C61;
  height: 20vh;
  width: 70vh;
  position: relative;
  border-radius: 5px;
}

.ticket-img {
  max-width: 20vh
}

p {
  color: #CCF3FD;
}

h5 {
  color: #FFFFFF
}


.circle {
  border-radius: 50%;
  background-color: #2A2D3A;
  width: 15vh;
  height: 15vh;
  position: absolute;
  right: -11%;
  top: 13%
}
</style>