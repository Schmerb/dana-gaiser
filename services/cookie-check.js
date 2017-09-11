// To check if 'visited' session cookie exists
const checkSessionCookieVisited = (req, res, next) => {
    let visited  = req.cookies.visited;

    // console.log('cookies VISITED', req.cookies);


    if(!visited || visited !== 'true') {
        res.cookie('visited', 'true');
        res.redirect('/welcome');
    }

    next();
}

// To check if 'loggedIn' session cookie exists
const checkSessionCookieLoggedIn = req => {
    let loggedIn = false;

    let username = req.cookies.loggedIn;

    console.log('username: ', username);

    console.log('cookies LOGGED IN', req.cookies);

    if (username !== undefined && username !== '') {
        loggedIn = true;
    }


    return {loggedIn, username};
}


module.exports = {checkSessionCookieVisited, checkSessionCookieLoggedIn};