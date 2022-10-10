import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {

  constructor(){
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/tickets', this.getTicketHoldersByEventId)
      .get('/:id/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.deleteEvent)
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getTicketHoldersByEventId(req, res, next) {
    try {
  const ticketHolders = await ticketsService.getTicketHoldersByEventId(req.params.id)
  res.send(ticketHolders)
} catch (error) {
  next(error)
}  }
  async deleteEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.params.id, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      req.body.id = req.params.id
      const event = await eventsService.editEvent(req.body, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }  
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }
}