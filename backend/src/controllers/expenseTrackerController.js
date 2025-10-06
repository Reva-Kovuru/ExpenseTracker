// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

import ExpenseDetails from "../models/expenseDetails.js";
import PaymentMethods from "../models/paymentMethods.js";

export const getExpenseDetails = async (req, res) => {
    const userID = req.user.id;
    try {
        const expensesData = await ExpenseDetails.find({user: userID}).sort({spendDate: -1});
        return res.status(200).json(expensesData);
    } catch (error) {
        console.log("----------- ERROR [getExpenseDetails] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const getPaymentMethods = async (req, res) => {
    const userID = req.user.id;
    try{
        const paymentMethodsData = await PaymentMethods.find({user: userID}).sort({methodName: 1});
        return res.status(200).json(paymentMethodsData);
    } catch(error){
        console.log("----------- ERROR [getPaymentMethods] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

export const postNewPaymentMethod = async (req, res) => {
    const userID = req.user.id;

    const { methodName, methodType, billDay } = req.body;
    if(!methodName || !methodType || !billDay){
        return res.status(400).json({"message": "Few Required details are missing!"});
    }
    try {
        const paymentMethodDataEntry = new PaymentMethods({user: userID, methodName, methodType, billDay});
        await paymentMethodDataEntry.save();
        return res.status(201).json({"message": "Payment Method Added!"});
    } catch (error) {
        console.log("----------- ERROR [postNewPaymentMethod] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}

// The ExpenseDetails object requires the objectID of the PaymentMethod.
// This is achieved by using <Select> component in the fronend
// and populating its contents (i.e. <MenuItem>) using the response of getPaymentMethods().
// So, finally the ObjectID of PaymentMethod is directly sent in the request.
export const postNewExpenseDetails = async (req, res) => {
    const userID = req.user.id;

    const { amount, payMethod, category, remarks, spendDate } = req.body;
    if(!amount || !payMethod || !category || !remarks || !spendDate){
        return res.status(400).json({"message": "Few Required details are missing!"});
    }
    try {
        const expenseDetailsEntry = new ExpenseDetails({user: userID, amount, paymentMethod: payMethod, category, remarks, spendDate});
        await expenseDetailsEntry.save();
        return res.status(201).json({"message": "New Expense Entry Added!"});
    } catch (error) {
        console.log("----------- ERROR [postNewExpenseDetails] ---------------", error);
        return res.status(500).json({"message": "Server Got Stumped!!! Sorry..."});
    }
}