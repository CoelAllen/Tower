<template>
  <div class="row">
    <div class="col-md-11 banner mx-2">
      <div class="m-4 mt-5">
        <h3 class="p-2 "> Get ahead of the scalpers.</h3>
        <h3 class="p-2 ">Reserve your seat now with</h3>
        <h3 class="p-2">real events for real people.</h3>
      </div>

    </div>
    <div class="d-flex m-3 col-md-11 rounded justify-content-around bg">
      <button title="All Events" class="btn btn-outline button-text" @click="getEventsByType('')">All</button>
      <button title="Concerts" class="btn btn-outline button-text" @click="getEventsByType('concert')">Concert</button>
      <button title="Conventions" class="btn btn-outline button-text"
        @click="getEventsByType('convention')">Convention</button>
      <button title="Sports" class="btn btn-outline button-text" @click="getEventsByType('sport')">Sport</button>
      <button title="Digital" class="btn btn-outline button-text" @click="getEventsByType('digital')">Digital</button>

    </div>
    <div class="d-flex flex-wrap">

      <EventCard v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';

export default {

  setup() {

    const route = useRoute();
    async function getEvents() {
      try {
        await eventsService.getEvents();
        logger.log("[gettingEventsLogger]");
      }
      catch (error) {
        Pop.error(error, "[gettingEvents]");
      }
    }
    onMounted(() => {
      getEvents();
    });

    return {

      events: computed(() => AppState.events.filter(e => e.type)),
      async getEventsByType(type) {
        try {
          await eventsService.getEvents(type)
          console.log(type);
        } catch (error) {
          Pop.error(error, '[getEventsByType]')
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.banner {
  background-image: url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8&w=1000&q=80');
  background-size: cover;
  background-position: 0% 15%;
  height: 30vh;
  overflow: hidden;
  max-height: 30vh;
  border: solid 2px #56C7FB;
  border-radius: 5px;
}

h3 {
  color: #CCF3FD;
  font-weight: lighter;
  text-shadow: 1px 1px 1px rgb(11, 11, 11);
}

.button-text {
  color: #FFFFFF;
}

.bg {
  background-color: #474C61;
}
</style>
