import * as bcrypt from 'bcrypt';
import HttpException from '../../../exceptions/HttpException';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from '../../../interfaces/dataStoredInToken';
import TokenData from '../../../interfaces/tokenData.interface';
import CreateUserDto from '../dtos/register.dto';
import User from '../interfaces/user.interface';
import userModel from '../models/user.model';

class AuthenticationService {
  public user = userModel;

  public async register(userData: CreateUserDto) {
    if (
      await this.user.findOne({ email: userData.username })
    ) {
      throw new HttpException(400, 'Username has been taken before!');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
