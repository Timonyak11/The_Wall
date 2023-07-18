import User from "../models/User.js";
import FormChecker from "../helpers/FormChecker.js";

class Users{
    index(request, response) {   
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

        response.render('login_register/index', { errors: error_message, success: success_message, reg_data: prev_reg_data });
    }

    async loginProcess(request, response) {
        let login_input_result = FormChecker.checkForm({ email: request.body.email, password: request.body.password });
        
        if(!login_input_result.status) {
            request.session.errors = login_input_result.error_message;
            response.redirect('/');
        }   
        else {
            let user = await User.getUserByEmail(request.body.email);
            let result = await User.validateLoginMatch(user.result, request.body.password);
            
            if(result == 'success') {
                request.session.user_id = user.result[0].id;
                response.redirect('/wall');
            } 
            else {
                request.session.errors = result;
                response.redirect('/');
            }
        }
    }

    async registerProcess(request, response) {
        let register_input_result = FormChecker.checkForm(request.body);

        if(!register_input_result.status) {
            request.session.errors = register_input_result.error_message;
            request.session.register_input = request.body;
            response.redirect('/');
        } 
        else {
            let registration_result = await User.addUser({ first_name: request.body.first_name, last_name: request.body.last_name, email: request.body.email, password: request.body.password });
            
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