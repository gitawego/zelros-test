import * as mongoose from 'mongoose';
import { updatedAtPlugin } from './plugins/updatedAtPlugin';
export interface Post {
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export interface PostDocument extends Post, mongoose.Document { }

const options = {
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true }
};

export const PostSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, options);

PostSchema.virtual('author', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: 'username',
  justOne: true
});

PostSchema.plugin(updatedAtPlugin, { index: true });

export interface IPostModel extends mongoose.Model<PostDocument> { };

export const PostModel: IPostModel = mongoose.model<PostDocument, IPostModel>('Post', PostSchema);

