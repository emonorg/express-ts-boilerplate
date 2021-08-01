import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Roles } from '../utils/roles.enum';
import AuthenticationTokenMissingException from '../modules/user/authentication/exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../modules/user/authentication/exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../modules/user/models/user.model';

function authMiddleware(role: Roles) {
  return async (request: RequestWithUser, response: Response, next: NextFunction) => {
    
    // Get the header
    let xUserToken = request.headers['x-user-token'];

    // Check if the token is not missing
    if (!xUserToken) {
      return next(new AuthenticationTokenMissingException());
    }

    // If the token exists, parse it as string
    xUserToken = xUserToken.toString();

    /*
    * Check if the role is admin
    * If true, compare with the token in env
    */
    if (role === Roles.Admin) {
      const { ADMIN_TOKEN } = process.env;
      if (request.headers['x-user-token'] !== ADMIN_TOKEN) {
        return next(new WrongAuthenticationTokenException());
      }
      return next();
    }

    /*
    * Check if role is user
    * Verify jwt token and attach user in request
    */
    if (role === Roles.User) {
      const secret = process.env.JWT_SECRET;
      try {
        const verificationResponse = jwt.verify(xUserToken, secret) as DataStoredInToken;
        const id = verificationResponse._id;
        const user = await userModel.findById(id);
        if (!user) {
          return next(new WrongAuthenticationTokenException()); 
        }
        request.user = user;
        return next();
      } catch (error) {
        return next(new WrongAuthenticationTokenException());
      }
    }
  };
}

export default authMiddleware;
