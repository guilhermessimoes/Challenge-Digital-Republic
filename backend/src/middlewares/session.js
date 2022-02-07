function requiredAuthentication(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Você precisa fazer o login.' });
    }

    next();
}

module.exports = requiredAuthentication;
