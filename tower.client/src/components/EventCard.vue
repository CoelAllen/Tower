<template>

  <div class="m-3">

    <div class="event">
      <router-link :to="{name: 'Event', params: {id: event.id}}">
        <div class="body-band p-2">
          <div>
            <h4 :title="event.name" class="light">{{event.name}}</h4>
            <h5 :title="event.location" class="texty">{{event.location}}</h5>
            <h5 :title="event.startDate" class="texty">{{event.startDate}}</h5>
          </div>
          <div v-if="event.isCanceled == true">
            <div class="text-center cancel">Canceled</div>
          </div>
          <div v-else-if="event.capacity == 0">
            <div class="text-center cancel">At Capacity</div>
          </div>
          <div v-else>
            <div class="capacity text-end pe-2">{{event.capacity}} <span class="light">spots left</span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';


export default {
  props: {
    event: {
      type: Event,
      required: true
    }
  },
  setup(props) {
    return {
      events: computed(() => AppState.events),
      coverImg: computed(() => `url(${props.event.coverImg})`)
    }
  }
}
</script>


<style lang="scss" scoped>
.event {
  height: 30vh;
  width: 30vh;
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  border: solid 3px #474C61;
  border-radius: 5px;
}

.light {
  color: #FFFFFF;
  text-shadow: 4px 1px 4px rgba(14, 13, 13, 0.5);
}

.texty {
  color: #CCF3FD;
  text-shadow: 4px 1px 4px rgba(14, 13, 13, 0.5);
}

.capacity {
  color: #56C7FB;
}

.cancel {
  background-color: #FF5977;
  color: #25262b;
  border-radius: 3px;
}

.body-band {
  background-color: rgba(0, 0, 0, 0.195);
  margin-top: 12.2vh;
  backdrop-filter: blur(10px);
}
</style>