import User from "../models/User.js";
import Message from "../models/Message.js";
import Comment from "../models/Comment.js";

class Wall {
    async index(request, response) {
        if(!request.session.user_id) {
            response.redirect('/');
            return;
        }

        let user                  = await User.getUserbyID(request.session.user_id);
        let messages_and_comments = await Message.fetchAllMessagesAndComments();

        response.render('wall\\index', { user_info: user.result, posts: messages_and_comments.result });
    }

    async postMessage(request, response) {
        let is_valid = Message.validateMessageForm(request.body);

        if(is_valid) {
            let result = await Message.createMessage(request.session.user_id, request.body.message);
        }

        response.redirect('/wall');
    }

    async removeMessage(request, response) {
        let is_responsible = (request.session.user_id == request.body.poster_id)? true: false ;

        if(is_responsible) {
            let result = await Message.deleteMessage(request.body.message_id);
        }

        response.redirect('/wall');
    }

    async postComment(request, response) {
        let is_valid = Comment.validateCommentForm(request.body);

        if(is_valid) {
            let result = await Comment.createComment(request.session.user_id , request.body.message_id,request.body.comment);
        }

        response.redirect('/wall');
    }

    
    async removeComment(request, response) {
        let is_responsible = (request.session.user_id == request.body.commenter_id)? true: false ;

        console.log(request.body.comment_id);
        console.log(is_responsible);
        if(is_responsible) {
            let result = await Comment.deleteComment(request.body.comment_id);
        }


        response.redirect('/wall');
    }
}

export default new Wall;