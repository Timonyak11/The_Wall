import Database from "../system/Database.js";

class Message extends Database {
    async fetchAllMessagesAndComments() {
        let response_data = { status: true, result: null, message: 'Successfuly retrived all messages and comments', error: null }
        let query = `SELECT 
                     CONCAT(first_name, ' ', last_name) AS poster_name,
                     messages.*,
                     (
                         SELECT 
                             JSON_ARRAYAGG(
                                 JSON_OBJECT(
                                     'commenter_name',CONCAT(first_name, ' ', last_name),
                                     'id', comments.id,
                                     'commenter_id', comments.user_id,
                                     'comment', comments.comment,
                                     'created_at', comments.created_at
                                 )
                             )
                         FROM comments
                         INNER JOIN users ON users.id = comments.user_id
                         WHERE comments.message_id = messages.id
                     ) AS message_comments
                     FROM messages
                     INNER JOIN users ON users.id = messages.user_id
                     ORDER BY messages.id DESC;`;

        try {
            response_data.result = await this.execQuery(query);
        }
        catch(err) { 
            response_data.status = false;
            response_data.message = 'Unable to fetch messages and comments';
            response_data.error = err;
        }

        return response_data;
    }

    validateMessageForm(form_data) {
        return (form_data.message !== '')? true: false ;
    }

    async createMessage(user_id, message) {
        let response_data = { status: true, result: null, message: 'Message successfuly posted', error: null }
        let query = `INSERT INTO messages (user_id, message, created_at, updated_at) VALUES (?, ?, NOW(), NOW());`;
        let values = [user_id, message];

        try {
            response_data.result = await this.execQuery(query, values);
        }
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry, Can\'t post message';
            response_data.error = err;
        }

        return response_data;
    }

    async deleteMessage(message_id) {
        let response_data = { status: true, result: null, message: 'Message successfuly deleted', error: null }
        let query = `DELETE FROM messages WHERE id = ?;`;
        let values = [message_id];

        try {
            response_data.result = await this.execQuery(query, values);
        }
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry, Unable to delete message';
            response_data.error = err;
        }

        return response_data;
    }
}

export default new Message;