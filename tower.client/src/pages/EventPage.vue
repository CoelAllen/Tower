<template>
  <div class="event-page bg-dark" v-if="event">
    <div class="row">
      <div class="container-fluid">
        <EventDetail :event="event" />
        <div class="mt-2 text-end" v-if="event.creatorId == account.id && event?.isCanceled == false">
          <button @click="cancelEvent" class="btn btn-danger mt-3 me-3">Cancel Event</button>
        </div>
        <div class="text-end my-2" v-if="isTicketHolder && event?.isCanceled == false">
          <button @click="removeTicket()" class="btn btn-primary m-3">Cancel Ticket</button>
        </div>
        <div class="text-end my-2" v-else-if="!isTicketHolder && event?.isCanceled == false">
          <button @click="addTicket()" class="btn btn-primary m-3">Buy Ticket</button>
        </div>

      </div>
    </div>
    <div>
      <h5 class="ms-5 mb-3">See who's attending...</h5>
      <div class="col-10 m-auto d-flex bg-primary h-50">
        <TicketHolderCard v-for="t in ticketHolders" :key="t.id" :ticketHolder="t" />
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-10 comment-bg">

        <div v-if="account.id">
          <CommentForm />
        </div>
        <div>
          <CommentCard v-for="c in comments" :key="c.id" :comment="c" />
        </div>
      </div>
    </div>


  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted, popScopeId } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import EventCard from '../components/EventCard.vue';
import CommentCard from '../components/CommentCard.vue';
import EventDetail from '../components/EventDetail.vue';
import { AuthService } from '../services/AuthService.js';
import TicketHolderCard from '../components/TicketHolderCard.vue';
import { Comment } from '../models/Comment.js';
import CommentForm from '../components/CommentForm.vue';
export default {
  props: {
    comment: {
      type: Object,

    }
  },

  setup() {
    const route = useRoute()
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id)
      } catch (error) {
        Pop.error(error, '[getEventOnEventPage]')
      }
    }
    async function getTicketHoldersByEventId() {
      try {
        await eventsService.getTicketHoldersByEventId(route.params.id)
      } catch (error) {
        Pop.error(error, '[gettingTicketHoldersById]')
      }
    }
    async function getCommentsByEventId() {
      try {
        await eventsService.getCommentsByEventId(route.params.id)
      } catch (error) {
        Pop.error(error, '[gettingComments]')
      }
    }
    onMounted(() => {
      getEventById()
      getCommentsByEventId()
      getTicketHoldersByEventId()
    })
    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      ticketHolders: computed(() => AppState.ticketHolders),
      isTicketHolder: computed(() => AppState.ticketHolders.find(t => t.accountId == AppState.account.id)),
      async cancelEvent() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel the event?')
          if (!yes) { return }

          const event = AppState.activeEvent
          // const event = AppState.events.find(e => e.creatorId == AppState.account.id && e.id == AppState.activeEvent.id)
          // if (event.isCanceled != false) {
          //   Pop.error('This Event is already canceled')
          //   return
          // }
          await eventsService.cancelEvent(event.id)
        } catch (error) {
          Pop.error(error, '[cancelEvent]')
        }
      },
      async removeTicket() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel your ticket?')
          if (!yes) { return }
          const ticketHolder = AppState.ticketHolders.find(t => t.accountId == AppState.account.id && t.eventId == AppState.activeEvent.id)
          await eventsService.removeTicket(ticketHolder.id)
          Pop.success('Your ticket has been partially refunded')
        } catch (error) {
          Pop.error(error, '[removeTicket]')
        }
      },
      async addTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await eventsService.addTicket({
            eventId: AppState.activeEvent.id
          })
          Pop.success("We'll see you there!")
        } catch (error) {
          Pop.error(error, '[addingTicket]')
        }
      }
    };
  },
  components: { Event, EventCard, CommentCard, EventDetail, TicketHolderCard, CommentForm }
}
</script>


<style lang="scss" scoped>
.comment-bg {
  background-color: #474C61;
  border-radius: 5px;
}
</style>