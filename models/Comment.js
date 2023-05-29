import Database from "../system/Database.js";

class Comment extends Database {
    validateCommentForm(form_data){
        return (form_data.comment !== '')? true: false ;
    }

    async createComment(user_id ,message_id, comment) {
        let response_data = { status: true, result: null, message: 'Comment successfuly posted', error: null }
        let query = `INSERT INTO comments (user_id, message_id, comment, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());`;
        let values = [user_id, message_id, comment];

        try {
            response_data.result = await this.execQuery(query, values);
        }
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry, Can\'t post comment';
            response_data.error = err;
        }

        return response_data;
    }

    async deleteComment(comment_id){
        let response_data = { status: true, result: null, message: 'Comment successfuly deleted', error: null }
        let query = `DELETE FROM comments WHERE id = ?`;
        let values = [comment_id]

        try { 
            response_data.result = this.execQuery(query, values);
        }
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry, Cannot Delete Comment';
            response_data.error = err;
        }

        return response_data;
    }
}

export default new Comment; 