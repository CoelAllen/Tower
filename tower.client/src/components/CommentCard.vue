<template>
  <div class="row comment-card comment-bg d-flex m-5">
    <h4 class="ms-5">{{comment.creator.name}}</h4>
    <div class="col-md-10 d-flex ms-5 comment-body">
      <img class="comment-img" :src="comment.creator.picture" :title="comment.creator.name" alt="">

      <div class="w-100 border border-dark comment-body bg-light text-dark ms-2 p-3">

        <p>{{comment.body}}</p>
        <div class="text-end" v-if="comment.creatorId==account.id">
          <i @click="removeComment(comment.id)" class="mdi mdi-delete-forever selectable" title="Remove Comment"
            aria-label="Delete Comment"></i>
        </div>
      </div>

    </div>


  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { TicketHolder } from '../models/TicketHolder.js'
import { Comment } from '../models/Comment.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';

export default {
  props: {
    comment: {
      type: Object,
      required: true
    },
    //   ticketHolder: {
    //     type: TicketHolder
    //   }

  },
  setup() {
    return {
      account: computed(() => AppState.account),
      // ticketHolders: computed(() => AppState.ticketHolders)
      async removeComment(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete your comment?')
          if (!yes) { return }
          await eventsService.removeComment(id)
        } catch (error) {
          Pop.error(error, '[removingComment]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-img {
  border-radius: 50%;
  height: 8vh;
  width: 8vh;
}

.comment-body {
  border-radius: 3px;
}

.comment-bg {
  background-color: #474C61;
  border-radius: 3px;
}

h5 {
  color: aqua
}
</style>