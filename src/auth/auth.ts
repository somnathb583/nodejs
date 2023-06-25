import { UserRegistrationBLL } from '../bll/user-registration';
import { UserDetails } from '../index';


export const authMiddleware = (req, res, next) => {
    const skipAuth = req.query.skipAuth;
    const token = req.headers.authorization;
    if (skipAuth) {
        return next();
    }
    const isTokenValid = new UserRegistrationBLL().validateToken(UserDetails,token);
    if (isTokenValid) {
        next();
    } else {
        res.status(401).send ('You are not Authorized');
    }
}