export const authorization = (role) => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).render('messages&error', { user: null, error: 'Sin autorización para acceder' });
        if(req.user.user.role != role) 
        return res.status(401).render('messages&error', { user: null, error: 'Sin permisos para acceder' });
        next();
    }
};