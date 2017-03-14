import { ModuleBase } from '../../core/ModuleBase';
import { Request, Response } from 'express';
import { ToDoListModel } from '../../models';

export class ToDoList extends ModuleBase {
	constructor() {
		super('ToDoList');
	}
	async addToDoList(req: Request, res: Response) {
		try {
			this.log.debug('req', req.body);
			const payload = req.body;
			const doc = await new ToDoListModel({
				name: req.body.name
			}).save();
			res.status(200).send({
				_id: doc._id
			});
		} catch (err) {
			console.log('error', err);
			res.status(409).send({
				error: 'DUPLICATED_ID'
			});
		}
	}
	async addItem(req, res) {
		try {
			const payload = req.body;
			const list = await ToDoListModel.findOne({
				name: payload.name
			}).exec();
			if (!list) {
				res.status(404).send({
					error: 'LIST_NOT_FOUND'
				});
				return;
			}
			list.items = list.items || [];
			const index = list.items.push(payload.todo) - 1;
			await list.save();
			res.status(200).send({
				_id: list._id,
				index
			});
		} catch (err) {
			res.status(500).send({
				error: 'INTERNAL_ERROR',
				message: err.message
			});
		}
	}
	removeItem(req, res) {

	}
	getToDoList(req, res) {

	}
}
