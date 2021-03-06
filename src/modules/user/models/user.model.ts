import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema, 'Users');

export default userModel;
