import * as mongoose from 'mongoose';
import { updatedAtPlugin } from './plugins/updatedAtPlugin';
export interface ToDoList {
	createdAt: Date;
	updatedAt: Date;
	name: string;
	items: string[];
}

export interface ToDoListDocument extends ToDoList, mongoose.Document { }

const options = {
	toObject: { getters: true, virtuals: true },
	toJSON: { getters: true, virtuals: true }
};

export const ToDoListSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	items: {
		type: [String]
	}
}, options);

ToDoListSchema.virtual('author', {
	ref: 'User',
	localField: 'createdBy',
	foreignField: 'username',
	justOne: true
});

ToDoListSchema.plugin(updatedAtPlugin, { index: true });

export interface IToDoListModel extends mongoose.Model<ToDoListDocument> { };

export const ToDoListModel: IToDoListModel = mongoose.model<ToDoListDocument, IToDoListModel>('ToDoList', ToDoListSchema);

