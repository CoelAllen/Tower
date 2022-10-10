<template>
  <div class="mt-2 mx-3 ms-.5 comment-bg">
    <form @submit.prevent="handleSubmit">
      <div class="px-3 comment-bg">
        <div class="form-group mt-3">
          <label for="comment-body">Make comment:</label>
          <textarea class="form-control" v-model="editable.body" id="comment-body" rows="3"></textarea>
        </div>
      </div>
      <div class="my-3 text-end comment-bg">
        <button aria-label="Post Comment" style="width:100px" type="submit"
          class="form-control btn btn-primary me-2">Post</button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  setup() {
    const editable = ref({})
    return {
      event: computed(() => AppState.activeEvent),
      editable,
      async handleSubmit() {
        try {
          // debugger
          editable.value.eventId = AppState.activeEvent.id
          console.log(editable.value);
          await eventsService.createComment(editable.value, editable.value.eventId)
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[submittingCommentForm]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-bg {
  background-color: #474C61;
}
</style>