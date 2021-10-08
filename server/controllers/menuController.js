/* eslint-disable no-unused-vars */
import Model from '../models';

const { Menu, Meal } = Model;

export default class MenuController {
	//POST Menu
	static setMenu(req, res){
		const { ids } = req.body;
		const { userId } = req;

		Menu.create({
			available: true
		}).then(menu => {
			menu.setMeals(ids);
		}).then(() => {
			res.status(201).json({
				status: 'success',
				message: 'Menu set for the day'
			})
		}).catch(err => {
			res.status(500).json({
				message: 'Something went wrong'
			});
		});
	}

	static getMenu(req, res){
		Menu.findOne({
			where : {available: true},
			include: [Meal]
		})
		.then((menu) => {
			res.status(200).json({
				status: 'success',
				menu
			})
		})
	}
}