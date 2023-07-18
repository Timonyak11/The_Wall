class FormChecker {
    checkForm(form_data) {
        let response_data = { status: true, error_message: [] };

        for(const key in form_data) {
            let trimmed = `${form_data[key]}`.trim();
            if(trimmed == '') {
                response_data.error_message.push('All fields must be filled!');
                response_data.status = false;
                return response_data;
            }
        } 

        return response_data;
    }
}

export default new FormChecker;