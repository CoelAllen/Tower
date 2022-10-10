import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService{
  async removeTicket(id, userId) {
    const ticket = await dbContext.TicketHolders.findById(id)
    if(!ticket){
      throw new BadRequest('Invalid Ticket')
    }
    const event = await eventsService.getEventById(ticket.eventId)
    // @ts-ignore
    // const eventOwner = userId == event.creatorId.toString()
    // @ts-ignore
    
    if(ticket.accountId.toString() != userId){
      throw new Forbidden("You cannot remove this ticket")
    }
    await ticket.remove()
    // @ts-ignore
    event.capacity += 1
    await event.save()
    return ticket
    

  }
  async getTicketHoldersByEventId(eventId) {
    const ticketHolders = await dbContext.TicketHolders.find({ eventId }).populate('profile', 'name picture')
    return ticketHolders
  }
  async getTicketsByAccountId(accountId){
    const tickets = await dbContext.TicketHolders.find({ accountId }).populate('event', 'name coverImg location startDate')
    return tickets
  }
 
  async getTicketForEvent(eventId, accountId) {
   await eventsService.getEventIfNotCanceled(eventId)
   const event = await dbContext.Events.findById(eventId)
  //  NOTE this question mark may be wrong
  //@ts-ignore
   if(event.capacity == 0){
     throw new BadRequest('Its Sold out! Too late bro!')
   }
    const hasTicket = await this.getTicketHolderForEvent(eventId, accountId)
    if(hasTicket){
      return hasTicket
    }
    const ticket = await dbContext.TicketHolders.create({eventId, accountId})
    await ticket.populate('profile', 'name picture')
  
    if(!event){
      throw new BadRequest('Invalid Event Id')
    }
    // @ts-ignore
    event.capacity -= 1
    await event.save()
    
    return ticket
  }
  async getTicketHolderForEvent(eventId, accountId) {
  const ticketHolder = await dbContext.TicketHolders.findOne({eventId, accountId})
  .populate('profile', 'name picture')
  .populate('event', 'name coverImg')
  return ticketHolder
}

}
export const ticketsService = new TicketsService()