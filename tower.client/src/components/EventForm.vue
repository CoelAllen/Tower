<template>
  <form class="card account-form" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" required name="name">
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea type="text" class="form-control" v-model="editable.description" name="description" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" class="form-control" v-model="editable.location" name="location">
      </div>
      <div>
        <label for="capacity">Capacity:</label>
        <input type="number" class="form-control" v-model="editable.capacity" name="capacity">
      </div>
      <div>
        <label for="startDate">Date:</label>
        <input type="text" class="form-control" v-model="editable.startDate" name="startDate">
      </div>
      <div class="input-group my-3">
        <label class="input-group-text" for="inputGroupSelect01">Type</label>
        <select v-model="editable.type" class="form-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>

        </select>
      </div>
      <!-- <div class="form-check">
        <input class="form-check-input" v-model="editable.type" type="radio" name="concert" id="concert-radio">
        <label class="form-check-label" for="concert-radio">
          Concert
        </label>
        <div class="form-check">
          <input class="form-check-input" v-model="editable.type" type="radio" name="convention" id="convention">
          <label class="form-check-label" for="convention">
            Convention
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" v-model="editable.type" type="radio" name="sport" id="sport">
          <label class="form-check-label" for="sport">
            Sport
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" v-model="editable.type" type="radio" name="digital" id="digital">
          <label class="form-check-label" for="digital">
            Digital
          </label>
        </div>
      </div> -->

      <div class="modal-footer">
        <button aria-label="Close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button aria-label="Save Changes" type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save
          changes</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    // watchEffect(() => {
    //   editable.value = { ...AppState.events }
    // })
    return {
      editable,
      async handleSubmit() {
        try {
          await eventsService.createEvent(editable.value)
        } catch (error) {
          Pop.error(error, '[createEvent]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>