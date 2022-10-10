import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addCommentToEvent)
      .delete('/:id', this.removeComment)
  }
  async removeComment(req, res, next) {
    try {
      const comment = await commentsService.removeComment(req.params.id, req.userInfo)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async addCommentToEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.addCommentToEvent(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}