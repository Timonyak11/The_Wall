class SessionIDChecker {
    loggedIn(request, response, next) {
        if(request.session.user_id) {
            response.redirect('/wall');
            return;
        } 

        next();
    }

    notLoggedIn(request, response, next){
        if(!request.session.user_id) {
            response.redirect('/');
            return;
        } 

        next();
    }
}

export default new SessionIDChecker;