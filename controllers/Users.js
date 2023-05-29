import User from "../models/User.js";

class Users{
    index(request, response) {   
        if(request.session.user_id) {
            response.redirect('/wall');
            return;
        }

        let error_message = null;
        let success_message = null;
        let prev_reg_data = null;

        if(request.session.errors || request.session.success) {
            error_message = request.session.errors; 
            prev_reg_data = request.session.register_input;
            success_message = request.session.success;

            delete request.session.errors;
            delete request.session.success;
            delete request.session.register_input;
        }

        response.render('login_register\\index', { errors: error_message, success: success_message, reg_data: prev_reg_data });
    }

    async loginProcess(request, response) {
        let is_valid = User.validateLoginForm(request.body);

        if(!is_valid) {
            request.session.errors = ['All fields must be filled!'];
            response.redirect('/');
        } 
        else {
            let user = await User.getUserByEmail(request.body.email);
            let result = await User.validateLoginMatch(user.data, request.body.password);
            if(result == 'success') {
                request.session.user_id = user.data[0].id;
                response.redirect('/wall');
            } 
            else {
                request.session.errors = result;
                response.redirect('/');
            }
        }
    }

    async registerProcess(request, response) {
        let validation = await User.validateRegisterForm(request.body);
        
        if(validation.length > 0) {
            request.session.errors = validation;
            request.session.register_input = request.body;
            response.redirect('/');
        } 
        else {
            let registration_result = await User.addUser(request.body);
            
            if(registration_result.status) {
                request.session.success = registration_result.message;
            } 
            else {
                request.session.errors = [registration_result.message];
            }

            response.redirect('/');
        }
    }

    logoff(request, response) {
        request.session.destroy();
        response.redirect('/');
    }
}

export default new Users;
