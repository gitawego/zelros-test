import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { updatedAtPlugin } from './plugins/updatedAtPlugin';

export interface User {
  username: string;
  email: string;
  name?: {
    first?: string;
    last?: string;
  };
  password: string;
  status: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IUserDocument extends User, mongoose.Document { }

const options = {
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true }
};

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    first: String,
    last: String
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: 'kellydeli'
  },
  status: {
    type: String,
    enum: ['disabled', 'deleted', 'enabled']
  },
  roles: [String]
}, options);

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: 'username',
  foreignField: 'createdBy'
});


UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(isMatch);
    });
  });
};

UserSchema.plugin(updatedAtPlugin, { index: true });

export interface IUserModel extends mongoose.Model<IUserDocument> { };

export const UserModel: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

