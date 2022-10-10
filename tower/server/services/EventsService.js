import { Logger } from "sass"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
async getEventIfNotCanceled(eventId) {
const event = await this.getEventById(eventId)
if(event.isCanceled == true){
  throw new BadRequest('This event is canceled')
}
return event
}
async cancelEvent(id, userInfo) {
const event = await this.getEventById(id)

// @ts-ignore
 if(event.creatorId.toString() != userInfo.id){
  throw new Forbidden('Only creator can cancel event.')
}
event.isCanceled = true
await event.save()
return event
}
async editEvent(eventData, userInfo) {
  // const event = await dbContext.Events.findByIdAndUpdate(id, eventData).populate('creator', 'name picture')
 const event = await this.getEventById(eventData.id)
 // @ts-ignore
 if(event.creatorId.toString() != userInfo.id){
  throw new Forbidden('This is not your Event')
 }
if(event.isCanceled == true) {
  throw new BadRequest('Event was canceled')
}
//  TODO one more sanity check don't let me edit the event if it is canceled
 

 event.name = eventData.name || event.name
 event.description = eventData.description || event.description
 event.location = eventData.location || event.location
 event.capacity = eventData.capacity || event.capacity
 event.type = eventData.type || event.type

  await event.save()
  return event
  
}
async getEventById(id) {
  const event = await dbContext.Events.findById(id).populate('creator', 'coverImg picture')
  if(!event){
    throw new BadRequest('Invalid or Bad Event Id')
  }
  return event
}
async getAllEvents(query = {}) {
  const events = await dbContext.Events.find(query).populate('creator', 'name picture')
  return events
}
async createEvent(eventData){
  const event = await dbContext.Events.create(eventData)
  await event.populate('creator', 'name picture')
  return event
}

}
export const eventsService = new EventsService()