import * as mongoose from 'mongoose';
import { updatedAtPlugin } from './plugins/updatedAtPlugin';
export interface Comment {
  post: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export interface CommentDocument extends Comment, mongoose.Document { }

const options = {
  toObject: { getters: true, virtuals: true },
  toJSON: { getters: true, virtuals: true }
};

export const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  createdBy: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, options);

CommentSchema.virtual('author', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: 'username',
  justOne: true
});

CommentSchema.plugin(updatedAtPlugin, { index: true });

export interface ICommentModel extends mongoose.Model<CommentDocument> { };

export const CommentModel: ICommentModel = mongoose.model<CommentDocument, ICommentModel>('Comment', CommentSchema);

