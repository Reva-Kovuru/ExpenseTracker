import express from 'express';

import { 
    getExpenseDetails,
    getPaymentMethods,
    postNewExpenseDetails,
    postNewPaymentMethod
} from '../controllers/expenseTrackerController.js';
import userAuth from '../middleware/userAuth.js';

const expenseTrackerRouter = express.Router();

expenseTrackerRouter.get('/expense-details', userAuth, getExpenseDetails);
expenseTrackerRouter.get('/payment-methods', userAuth, getPaymentMethods);

expenseTrackerRouter.post('/add-expense', userAuth, postNewExpenseDetails);
expenseTrackerRouter.post('/add-payment-method', userAuth, postNewPaymentMethod);


export default expenseTrackerRouter;