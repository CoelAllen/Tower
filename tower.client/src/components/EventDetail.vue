<template>
  <div class="event-detail col-md-12"></div>
  <div class="d-flex moveable">
    <img class="event-image" :src="event.coverImg" :alt="event.name">
    <div v-if="event.isCanceled == true">
      <div class="canceled p-3 text-center m-5">
        The event has been Canceled
      </div>
    </div>


    <div class="col-md-6 event-text">
      <div class="d-flex justify-content-between px-5 pt-5">
        <h3 class="text" :title="event.name">{{event.name}}</h3>
        <h4 :title="event.startDate" class="text me-5">{{event.startDate}}</h4>
      </div>
      <h4 :title="event.location" class="ps-5 text text-success">{{event.location}}</h4>
      <div v-if="event.capacity>0">

        <p class="p-5 text me-3">{{event.description}}</p>
      </div>
      <div v-else>
        <p class="text-dark bg-danger">Its Sold Out!</p>
      </div>

      <div class="ps-5 d-flex text align-items-end"> {{event.capacity}} spots left</div>
    </div>

  </div>







</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      events: computed(() => AppState.events),
      coverImg: computed(() => `url(${props.event.coverImg}`)
    }
  }
}
</script>


<style lang="scss" scoped>
.event-detail {
  background-image: v-bind(coverImg);
  background-size: cover;
  background-position: center;
  min-height: 60vh;
  width: auto;
  filter: blur(8px);
  border-radius: 5px;
}

.text {
  text-shadow: 1px 1px 4px rgb(0, 0, 0)
}

.event-image {
  height: 55vh;
  width: 60vh;
  z-index: 2;
  border-radius: 5px;
}

.moveable {
  position: absolute;
  top: 10%;
  left: 5%;
}

.canceled {
  color: rgba(226, 43, 43, 0.797);
  transform: rotateY(0deg) rotate(45deg);
  font-size: xx-large;
  font-weight: bolder;
  position: absolute;
  top: 30%;
  left: -3%;
  z-index: 10;
  background-color: rgba(27, 25, 25, 0.611);
  text-shadow: 1px 1px 4px black;
}
</style>