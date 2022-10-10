import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { Event } from "../models/Event.js";
import { router } from "../router.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"

class EventsService {
  async createComment(commentData){
    console.log(commentData, "reaching service");
    const res = await api.post('api/comments', commentData)
    AppState.comments = [res.data, ...AppState.comments]
    
    // AppState.comments.push(res.data)
    // this.getCommentsByEventId(commentData.eventId)
    return res.data
   
   

  }
  async cancelEvent(id){
    
   
    const res = await api.delete('api/events/' + id)
    AppState.activeEvent = res.data
    // const event = res.data
    // const event = res.data
    // console.log(res.data, 'hitting the service')
    // event.isCanceled === true
    // console.log(event, 'after flip')
    // AppState.activeEvents.push(res.data)

  }
  async removeTicket(ticketId){
    await api.delete('api/tickets/' + ticketId)
    AppState.ticketHolders = AppState.ticketHolders.filter(t=> t.id != ticketId)
    AppState.myTickets = AppState.myTickets.filter(t=> t.id !=ticketId)

  }
  async addTicket(eventData){
    const res = await api.post('/api/tickets', eventData)
    const ticketHolder = res.data
    AppState.ticketHolders.push(ticketHolder)
    console.log(ticketHolder);
  }
  async getTicketHoldersByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.ticketHolders = res.data
  }
  async createEvent(formData){
    const res = await api.post('api/events', formData)
    await AppState.events.push(new Event(res.data))
    router.push({ path: '/event/' + res.data.id})
  }
  async getEventById(id){
    const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = new Event(res.data)
  }
  async getEventsByCreatorId(){
      const res = await api.get(`api/events/`)
    AppState.myEvents = res.data.map((m)=> new Event(m))
    console.log(res.data);


  }

  async getCommentsByEventId(eventId){
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data
  }
  async removeComment(commentId){
    const res = await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c=> c.id !=commentId)
  }
  async getEvents(type = ''){
    let res
    if(type){
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map((e)=> new Event(e))
    console.log(res.data);
  }
}
export const eventsService = new EventsService()