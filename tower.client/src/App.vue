<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid app-bg">
    <div class="row">
      <div class="col-md-10 main-content">
        <router-view />
      </div>
      <div class="col-md-2 sidebar">
        <div class="mt-3 d-flex justify-content-center">
          <Login />
        </div>
        <div class="mt-3 text-center">
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
            Home
          </router-link>
        </div>
        <!-- <div v-if="account.id"> -->

        <div class="mt-3 text-center">
          <router-link :to="{ name: 'Account' }" class="btn text-success lighten-30 selectable text-uppercase">
            Account
          </router-link>
        </div>
        <div class="mt-3 text-center">
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"
            title="Create New Event">
            Create Event
          </button>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </main>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="CreateEvent" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <EventForm />
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'
import EventForm from './components/EventForm.vue'
import Navbar from './components/Navbar.vue'

export default {
  props: {
    event: {
      type: Event,
    }
  },
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  },
  components: { Login, EventForm, Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.sidebar {
  min-height: 100%;
  height: auto !important;
  height: 100%;
  background: linear-gradient(180deg, #474c61 0%, rgba(71, 76, 97, 0) 100%)
}

.app-bg {
  background-color: #2A2D3A;
}
</style>
