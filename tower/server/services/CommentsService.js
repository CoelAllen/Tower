import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventsService } from "./EventsService.js";

class CommentsService{
  async removeComment(id, userInfo) {
    const comment = await dbContext.Comments.findByIdAndDelete(id)
    // @ts-ignore
    if(comment.creatorId.toString() != userInfo.id){
      throw new Forbidden('This is not your comment')
    }
    return comment
  }
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async addCommentToEvent(commentData){
    const event = await eventsService.getEventById(commentData.eventId)
    if(event.isCanceled){
      throw new BadRequest('This event has been canceled...Sorry!')
    }

    const hasTicket = await dbContext.TicketHolders.findOne({
      eventId: commentData.eventId, 
      accountId: commentData.creatorId}).lean

    if(!hasTicket){
      throw new Forbidden('You do not have a ticket')
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}

export const commentsService = new CommentsService()