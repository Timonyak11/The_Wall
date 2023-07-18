import User from "../models/User.js";
import Message from "../models/Message.js";
import Comment from "../models/Comment.js";
import FormChecker from "../helpers/FormChecker.js";

class Wall {
    async index(request, response) {
        let user                  = await User.getUserbyID(request.session.user_id);
        let messages_and_comments = await Message.fetchAllMessagesAndComments();

        response.render('wall/index', { user_info: user.result, posts: messages_and_comments.result });
    }

    async postMessage(request, response) {
        let message_form_result = FormChecker.checkForm(request.body);

        if(message_form_result.status) {
            let result = await Message.createMessage(request.session.user_id, request.body.message);
        }

        response.redirect('/wall');
    }

    async removeMessage(request, response) {
        let is_the_poster = await Message.checkDeletionValidity({ user_id: request.session.user_id, message_id: request.body.message_id });

        if(is_the_poster.status) {
            let result = await Message.deleteMessage(request.body.message_id);
        }

        response.redirect('/wall');
    }

    async postComment(request, response) {
        let comment_form_result = FormChecker.checkForm(request.body);

        if(comment_form_result.status) {
            let result = await Comment.createComment(request.session.user_id , request.body.message_id,request.body.comment);
        }

        response.redirect('/wall');
    }

    
    async removeComment(request, response) {
        let is_the_poster = await Comment.checkDeletionValidity({ user_id: request.session.user_id, comment_id: request.body.comment_id });

        if(is_the_poster.status) {
            let result = await Comment.deleteComment(request.body.comment_id);
        }


        response.redirect('/wall');
    }
}

export default new Wall;