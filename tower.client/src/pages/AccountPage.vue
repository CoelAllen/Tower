<template>

  <div class="my-5 container-fluid">
    <h3>Upcoming Events</h3>
    <!-- NOTE This is the tickets -->
    <div class="mt-5">

      <TicketCard v-for="m in myTickets" :key="m.id" :event="m.event" />
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import TicketCard from '../components/TicketCard.vue'
import { Event } from '../models/Event.js'
import EventCard from '../components/EventCard.vue'
import { eventsService } from '../services/EventsService.js'
import { useRoute } from 'vue-router'
export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },
  setup() {
    // NOTE figure me out!!
    const route = useRoute()
    // async function getMyEvents() {
    //   try {
    //     await eventsService.getEventsByCreatorId()
    //   } catch (error) {
    //     Pop.error(error, '[gettingMyEvents]')
    //   }
    // }
    async function getMyTickets() {
      try {
        await accountService.getMyTickets();
      }
      catch (error) {
        Pop.error(error, "[gettingMyTickets]");
      }
    }
    onMounted(() => {
      getMyTickets()
      // getMyEvents()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myEvents)
    };
  },
  components: { TicketCard, EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

h3 {
  color: #79E7AB
}
</style>
