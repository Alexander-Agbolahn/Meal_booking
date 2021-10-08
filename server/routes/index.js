/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import express from 'express';
import Middleware from '../middlewares';
import UserController from '../controllers/userController';
import MealController from '../controllers/mealController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/orderController';


const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
  	status: 'success',
    message: 'Welcome to Book-A-Meal App'
  });
});


//Users
router.post('/user/signup', Middleware.validateSignup, UserController.signUp);
router.post('/user/signin', Middleware.validateSignin, UserController.signin);
 
//Meals
router.get('/meals',  Middleware.isLoggedIn, Middleware.checkRole, MealController.getMeals);
router.post('/meals', Middleware.isLoggedIn, Middleware.checkRole, Middleware.validateAddMeal, MealController.addMeal);
router.delete('/meals/:id', Middleware.isLoggedIn, Middleware.validParam, Middleware.checkRole, MealController.deleteMeal);
router.put('/meals/:id', Middleware.isLoggedIn, Middleware.validParam, Middleware.checkRole, Middleware.validateUpdateMeal, MealController.updateMeal);

//Menu
router.post('/menu', MenuController.setMenu);
router.get('/menu', MenuController.getMenu);


/*order*/
router.post('/orders', Middleware.isLoggedIn, Middleware.checkTime, Middleware.validateOrder, OrderController.placeOrder);
router.put('/orders/:id', Middleware.isLoggedIn, Middleware.validParam, Middleware.validateOrderUpdate, OrderController.modifyOrder);
router.get('/orders', Middleware.isLoggedIn, Middleware.checkRole, OrderController.getAllOrders);

// 404
router.get('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found'
  });
});

module.exports = router;


