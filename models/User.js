import Database from "../system/Database.js";
import bcrypt from "bcryptjs";

class User extends Database {

    async addUser(user_data) {
        let response_data = { status: true, result: null, message: 'User Addedd Successfully!', error: null };
        let query = 'INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
        user_data.password = bcrypt.hashSync(user_data.password, 10);
        let values = [user_data.first_name, user_data.last_name, user_data.email, user_data.password];

        try {
            response_data.result = await this.execQuery(query, values);        
        }
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry! Cannot Add User.';
            response_data.error = err;
        }

        return response_data;
    }

    async validateRegisterForm(input_info) {
        let message = [];
        
        if(input_info.first_name == '' || input_info.last_name == '' || input_info.email == '' || input_info.password == '' || input_info.confirm_password == '') {
            message.push('All fields must be filled!');
        } 
        else if(!input_info.email.includes('@')) {
            message.push('Invalid Email Format!');
        } 
        else if(input_info.password.length < 8) {
            message.push('Password must have atleast 8 characters!');
        }

        if(input_info.first_name.length < 2 || input_info.last_name.length < 2) {
            message.push('First Name and Last Name must have atleast 2 characters');
        }
        
        if(input_info.password != input_info.confirm_password) {
            message.push('Password and Confirm Password does not match!');
        } 
        
        let result = await this.getUserByEmail(input_info.email);
        if(result.status && result.is_taken) {
            message.push( result.message );
        }

        return message;
    }

    validateLoginForm(input_info){
        return (input_info.email === '' || input_info.password === '') ? false : true;
    }

    async validateLoginMatch(user, password){
        if(user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
            return "success";
        }
        else { 
            return ["Incorrect email/password."];
        }
    }

    async getUserByEmail(user) {
        let response_data = { status: true, message: 'Email is available', is_taken: false, result: null, error: null };
        let query = 'SELECT * FROM users WHERE email = ?';

        try {
            response_data.data = await this.execQuery(query, [user]);
  
            if(response_data.data.length > 0) {
                response_data.message = 'Email Already Taken!';
                response_data.is_taken = true;
            }
        }
        catch(err) {
            response_data.status = false;
            response_data.error = err;
        }

        return response_data;
    }

    async getUserbyID(user_id) {
        let response_data = { status: true, message: 'User retrived Successfuly', result: null, error: null };
        let query = `SELECT CONCAT(first_name, ' ', last_name) AS user_name, email FROM users WHERE id = ?;`;
        let values = [user_id];

        try {
            response_data.result = await this.execQuery(query, values);
        }   
        catch(err) {
            response_data.status = false;
            response_data.message = 'Sorry, Can\'t retrive User';
            response_data.error = err;
        }

        return response_data;
    }
}

export default new User;
